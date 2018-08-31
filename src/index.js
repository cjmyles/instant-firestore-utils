import { asyncForEach, asyncMap } from 'instant-utils';

/**
 * Get document data and assign an id (prevents overriding the `id` field in the data if one exists)
 * @param {object} doc Firestore document
 */
export function getDocumentData(doc) {
  try {
    if (doc && doc.exists) {
      // Serialize the document
      let data = doc.data();

      // Assign an id
      if (data.id) {
        data._id = doc.id;
      } else {
        data.id = doc.id;
      }

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
export async function serializeDocumentReferences(data, options = {}) {
  try {
    let populate;
    let rest;
    if (options.populate) {
      const split = options.populate.split('.');
      populate = split.shift();
      rest = split.length > 0 ? split.join('.') : null;
    }

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
export async function serializeDocument(doc, options = {}) {
  try {
    if (doc && doc.exists) {
      let data = getDocumentData(doc);

      // Serialize document references
      data = serializeDocumentReferences(data, options);

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
    throw error;
  }
}
