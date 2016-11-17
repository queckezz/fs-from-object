
const mkdirp = require('mkdirp-then')
const fsFromObject = require('./')
const { stat } = require('mz/fs')
const { tmpdir } = require('os')
const { join } = require('path')
const rmfr = require('rmfr')
const uuid = require('uuid')
const test = require('ava')

const ephemeralFsFromObject = async (obj, cb) => {
  const path = join(tmpdir(), uuid.v4())

  await mkdirp(path)
  await fsFromObject(path, obj)
  await cb(path)
  await rmfr(path)
  return null
}

test('creates a file', async (t) => {
  const date = new Date('09/09/2016')

  const sandbox = async (path) => {
    try {
      const stats = await stat(join(path, 'index.txt'))
      t.deepEqual(stats.mtime, date)
      t.pass()
    } catch (e) {
      t.fail('file not created')
    }
  }

  const tree = [
    { name: 'index.txt', mtime: date, contents: 'Hello World!' }
  ]

  await ephemeralFsFromObject(tree, sandbox)
})

test('creates a folder', (t) => {
  const sandbox = async (path) => {
    const stats = await stat(join(path, 'folder'))
    t.true(stats.isDirectory())
  }

  const tree = [
    { name: 'folder', contents: [] }
  ]

  return ephemeralFsFromObject(tree, sandbox)
})

test('recursive', async (t) => {
  const sandbox = async (path) => {
    await stat(join(path, 'folder/index.txt'))
    await stat(join(path, 'folder/lib.txt'))
  }

  const tree = [
    {
      name: 'folder',
      contents: [
        { name: 'index.txt', contents: 'Hello World!' },
        { name: 'lib.txt', contents: 'Hello World!' }
      ]
    }
  ]

  return ephemeralFsFromObject(tree, sandbox)
})
