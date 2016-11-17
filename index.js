
const { mkdir, utimes, writeFile } = require('mz/fs')
const mkdirp = require('mkdirp-then')
const { tmpdir } = require('os')
const { join } = require('path')
const rmfr = require('rmfr')
const uuid = require('uuid')

const isFile = ({ contents }) => typeof contents === 'string'

const createFile = async (filePath, data, mtime) => {
  await writeFile(filePath, data)
  if (mtime) await utimes(filePath, mtime, mtime)
  return null
}

const fsFromObject = (path, tree) => {
  return Promise.all(tree.map((node) => {
    const nodePath = join(path, node.name)

    return isFile(node)
      ? createFile(nodePath, node.contents, node.mtime)
      : mkdir(nodePath).then(() => fsFromObject(nodePath, node.contents))
  }))
}

const ephemeralFsFromObject = async (obj, cb) => {
  const path = join(tmpdir(), uuid.v4())

  await mkdirp(path)
  await fsFromObject(path, obj)
  await cb(path)
  await rmfr(path)
}

module.exports = {
  ephemeralFsFromObject,
  fsFromObject
}
