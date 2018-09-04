import { asyncForEach, asyncMap } from 'instant-utils';

/**
 * Get document data and assign an id (override the `id` field in the data if one exists)
 * Note: overriding the `id` field if one exists is necessary for serializing subcollections
 * @param {object} doc Firestore document
 */
export function getDocumentData(doc) {
  try {
    if (doc && doc.exists) {
      // Serialize the document
      let data = doc.data();

      // Assign an id
      data.id = doc.id;

      return data;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Serialize document references
 * @param {object} data Document data
 * @param {object} options Options
 */
export async function serializeDocumentReferences(data, options = {}, colRef) {
  try {
    let populate;
    let rest;
    if (options.populate) {
      const split = options.populate.split('.');
      populate = split.shift();
      rest = split.length > 0 ? split.join('.') : null;
    }

    // Populate references
    await asyncForEach(Object.keys(data), async key => {
      if (
        typeof data[key] === 'object' &&
        typeof data[key].get === 'function'
      ) {
        if (key === populate) {
          const doc = await data[key].get();
          data[key] = await serializeDocument(doc, {
            ...options,
            populate: rest,
          });
        } else if (options.hideUnpopulatedReferences) {
          delete data[key];
        }
      }
    });

    // Populate subcollections
    if (populate && !data[populate] && colRef) {
      // Assume key is a subcollection (which won't appear in the serialized data set)
      const snapshot = await colRef
        .doc(data.id)
        .collection(populate)
        .get();
      data[populate] = await serializeSnapshot(snapshot, options);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Serialize a Firestore document
 * @param {object} doc Firestore document
 * @param {object} options Options
 */
export async function serializeDocument(doc, options = {}, colRef) {
  try {
    if (doc && doc.exists) {
      // Serialize the document
      let data = getDocumentData(doc);

      // Serialize Firestore Document references (e.g `/:collection/:id`)
      data = await serializeDocumentReferences(data, options, colRef);

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
export async function serializeSnapshot(snapshot, options = {}, colRef) {
  try {
    let data = [];
    if (snapshot && !snapshot.empty) {
      data = await asyncMap(snapshot.docs, doc =>
        serializeDocument(doc, options, colRef)
      );
    }
    return data;
  } catch (error) {
    throw error;
  }
}
