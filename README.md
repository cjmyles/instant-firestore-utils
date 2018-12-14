# Instant Utils

Lightweight utility library to assist other `instant` packages.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Async For Each](#async-for-each)
  - [Async Map](#async-map)
  - [Pick](#pick)
  - [Remove Undefineds](#removeUndefineds)
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
