
# fs-from-object

[![npm version][version-image]][version-url]
[![build status][travis-image]][travis-url]
[![dependency status][david-image]][david-url]
[![license][license-image]][license-url]
[![js standard style][standard-image]][standard-url]
[![downloads per month][downloads-image]][downloads-url]

> ​:zap:​ Create files and folders in the filesystem directly from an object.

```js
const tree = [
  { name: 'index.txt', mtime: new Date('07/07/2016), contents: 'Hello World!' },

  {
    name: 'folder',
    contents: [
      { name: 'one.txt', contents: 'Hello World!' },
      { name: 'two.txt', contents: 'Hello World!' }
    ]
  }
]

fsFromObject(process.cwd(), tree)
```

## Installation

```bash
> npm install fs-from-object
```

## API

### `fsFromObject(path: string, tree: object)`

Creates the given `tree` representation at `path`.

#### Nodes

Each node can have the following properties:

* **name:**  Name of the file or folder
* **contents:** File or folder contents
* **mtime:** Modified time of a file or directory

## License

[MIT][license-url]

[travis-image]: https://img.shields.io/travis/queckezz/fs-from-object.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/fs-from-object

[version-image]: https://img.shields.io/npm/v/fs-from-object.svg?style=flat-square
[version-url]: https://npmjs.org/package/fs-from-object

[downloads-image]: https://img.shields.io/npm/dm/fs-from-object.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/fs-from-object

[david-image]: http://img.shields.io/david/queckezz/fs-from-object.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/fs-from-object

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/fs-from-object.svg?style=flat-square
[license-url]: ./license