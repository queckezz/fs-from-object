
const { ephemeralFsFromObject, isFile } = require('./')
const { readFile, stat } = require('mz/fs')
const { join } = require('path')
const test = require('ava')

test('file patterns', (t) => {
 t.true(isFile({ name: 'test.txt' }))
 t.false(isFile({ name: 'test.txt', contents: [] }))
 t.true(isFile({ name: 'test.txt', contents: '' }))
}) 

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

test.only('creates an empty file when no contents given', (t) => {
  const sandbox = async (path) => {
    const filePath = join(path, 'index.txt')
    await stat(filePath)
    t.is(await readFile(filePath, 'utf-8'), '')
  }

  const tree = [{ name: 'index.txt' }]

  return ephemeralFsFromObject(tree, sandbox)
})
