import { asyncForEach, asyncMap } from 'instant-utils';

/**
 * Populate a reference (user specified)
 * Could be a Firestore Document Reference or a Subcollection (or might not exist)
 * @param {object} data Serialized document data
 * @param {string} key Key to populate
 * @param {string} path Future paths to populate
 * @param {object} references Firestore Document References (used to populate subcollections)
 */
export async function populateReference(data, key, path, references = {}) {
  try {
    if (typeof data[key] === 'object' && typeof data[key].get === 'function') {
      // Key is a Firestore Document Reference
      references[key] = references[key] || {
        DocumentReference: data[key],
      };
      const doc = await data[key].get();
      data[key] = await serializeDocument(
        doc,
        {
          populate: path,
        },
        references[key]
      );
    } else {
      // Key is not a Firestore Document Reference or has already been populated so defer
      await populatePath(data[key], path, references[key]);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Populate a subcollection
 * @param {object} data Serialized document data
 * @param {string} key Subcollection key
 * @param {string} paths Future paths to populate
 * @param {object} docRef Parent Firestore Document Reference
 */
export async function populateSubcollection(data, key, paths, docRef) {
  try {
    const snapshot = await docRef.collection(key).get();
    data[key] = await serializeSnapshot(snapshot);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Populate a path
 * @param {object} data Serialized document data
 * @param {string} path Path to populate
 */
export async function populatePath(data, path, references) {
  try {
    const split = path.split('.');
    const key = split.shift();
    path = split.join('.');

    if (data[key]) {
      await populateReference(data, key, path, references);
    } else {
      await populateSubcollection(
        data,
        key,
        path,
        references.DocumentReference
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Populate paths
 * @param {object} data Serialized document data
 * @param {string|array} paths Paths to populate
 * @param {object} references Firestore Document References (used to populate subcollections)
 */
export async function populate(data, paths, references) {
  try {
    if (Array.isArray(paths)) {
      await asyncForEach(paths, path => populatePath(data, path, references));
    } else {
      await populatePath(data, paths, references);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Serialize a Firestore document
 * @param {object} doc Firestore document
 * @param {object} options Options
 * @param {object} references Firestore Document References (used to populate subcollections)
 */
export async function serializeDocument(doc, options = {}, references) {
  try {
    if (doc && doc.exists) {
      // Serialize the document
      let data = doc.data();

      // Assign an id
      data.id = doc.id;

      // Populate references and subcollections
      if (options.populate) {
        await populate(data, options.populate, references);
      }

      return data;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Serialize a Firestore snapshot
 * @param {object} snapshot Firestore snapshot
 * @param {object} options Options
 */
export async function serializeSnapshot(snapshot, options = {}) {
  try {
    let data = [];
    if (snapshot && !snapshot.empty) {
      data = await asyncMap(snapshot.docs, doc =>
        serializeDocument(doc, options)
      );
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get a document from Firestore and serialize with options
 * @param {object} docRef Firestore Document Reference
 * @param {object} options Options
 */
export async function getDocument(docRef, options) {
  try {
    let references = {
      DocumentReference: docRef,
    };
    const doc = await docRef.get();
    return await serializeDocument(doc, options, references);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Get a collection from Firestore and serialize with options
 * @param {object} colRef Collection Reference
 * @param {*} options
 */
export async function getCollection(colRef, options) {
  try {
    const snapshot = colRef.get();
    return await serializeSnapshot(snapshot, options);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
