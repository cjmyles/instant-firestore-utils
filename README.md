# Instant Firestore Utils

Lightweight Firebase Firestore utility library.

_**Please note:** Although this package can be utilized with raw Firestore Documents and Collections, it may be easier to use the [`instant-firestore`](https://github.com/cjmyles/instant-firestore) ORM depending on your requirements._

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [getDocument](#getdocument)
  - [getCollection](#getcollection)
  - [getSubCollection](#getsubcollection)
  - [serializeDocument](#serializedocument)
  - [serializeSnapshot](#serializesnapshot)
  - [populate](#populate)
  - [populateReference](#populatereference)
  - [populatePath](#populatepath)
  - [populateSubcollection](#populatesubcollection)
  - [deserialize](#deserialize)
  - [deserializePath](#deserializepath)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this package using npm:

```bash
$ npm install instant-firestore-utils
```

## Usage

Here is a quick example to get you started:

**ES Modules**

```javascript
import { getDocument } from 'instant-firestore-utils';

const test = async () => {
  const doc = await getDocument(db.collection('countries')); // Assumes db is a Firebase Firestore reference
  console.log(doc);
};
```

**CommonJS Modules**

```javascript
var getDocument = require('instant-firestore-utils').getDocument;

getDocument(db.collection('countries')).then(function(doc) {
  console.log(doc);
});
```

## API

### getDocument

### getCollection

### getSubCollection

### serializeDocument

### serializeSnapshot

### populate

### populateReference

### populatePath

### populateSubcollection

### deserialize

### deserializePath

## Contributing

We'd greatly appreciate any [contribution](CONTRIBUTING.md) you make.

## License

[MIT](LICENSE)
