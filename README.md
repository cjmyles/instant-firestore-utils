# Instant Firestore Utils

Firestore helper methods.

_**Please note:** This is an unofficial Firestore package, designed to assist with common Firestore tasks_

## Features

- Assign document id
- Serialize Firestore Document references
- Serialize Firestore Document
- Serialize Firestore Snapshot

## Installation

You can install this wrapper by running the following in your project:

```bash
$ npm install instant-firestore-utils
```

## Usage

**ES Modules**

```javascript
import { serializeDocument } from 'instant-firestore-utils';

// Do stuff with serializeDocument or any of the other Utils you import
```

**CommonJS Modules**

```javascript
const utils = require('instant-firestore-utils');

// Do stuff with utils
```

## Functions

### `getDocumentData`

Returns a serialized version of a `Firestore Document` with an assigned `id`.

#### Arguments

`doc` (`Firestore Document`): The Firestore Document

#### Returns

`object` Serialized document data with id

## Running Tests

To run the tests, clone the repository and install the dependencies:

```bash
git clone https://github.com/JSJInvestments/instant-firestore-utils.git
cd instant-firestore-utils && npm i
npm run test
```

## License

[MIT](LICENSE)
