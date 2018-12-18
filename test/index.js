import assert from 'assert';
import {
  removeUnpopulatedReferences,
  populateReference,
  populateSubcollection,
  deserializePath,
  deserialize,
  populatePath,
  populate,
  serializeDocument,
  serializeSnapshot,
  getDocument,
  getCollection,
  getSubcollection,
} from '../src/index';

describe('instant-firestore-utils', () => {
  it('function `removeUnpopulatedReferences` should exist', () => {
    assert.equal(typeof removeUnpopulatedReferences, 'function');
  });

  it('function `deserializePath` should exist', () => {
    assert.equal(typeof deserializePath, 'function');
  });

  it('function `deserialize` should exist', () => {
    assert.equal(typeof deserialize, 'function');
  });

  it('function `populateReference` should exist', () => {
    assert.equal(typeof populateReference, 'function');
  });

  it('function `populateSubcollection` should exist', () => {
    assert.equal(typeof populateSubcollection, 'function');
  });

  it('function `populatePath` should exist', () => {
    assert.equal(typeof populatePath, 'function');
  });

  it('function `populate` should exist', () => {
    assert.equal(typeof populate, 'function');
  });

  it('function `serializeDocument` should exist', () => {
    assert.equal(typeof serializeDocument, 'function');
  });

  it('function `serializeSnapshot` should exist', () => {
    assert.equal(typeof serializeSnapshot, 'function');
  });

  it('function `getDocument` should exist', () => {
    assert.equal(typeof getDocument, 'function');
  });

  it('function `getCollection` should exist', () => {
    assert.equal(typeof getCollection, 'function');
  });

  it('function `getSubcollection` should exist', () => {
    assert.equal(typeof getSubcollection, 'function');
  });
});
