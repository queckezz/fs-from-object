
const { mkdir, utimes, writeFile } = require('mz/fs')
const { join } = require('path')

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

module.exports = fsFromObject
