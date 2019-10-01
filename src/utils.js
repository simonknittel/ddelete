const globby = require('globby')
const fs = require('fs')
const filesize = require('filesize')
const trash = require('trash')
const del = require('del')

async function findFiles(filename) {
  return await globby(['**/' + filename], {
    absolute: true,
    onlyFiles: false,
  })
}

function filterFiles(files, filename) {
  return files.filter(file => {
    return file.indexOf(filename) === file.length - filename.length
  })
}

function appendFileSize(files) {
  return files.map(path => {
    const stats = fs.statSync(path)
    return path + ` (${filesize(stats.size)})`
  })
}

function removeFileSize(files) {
  return files.map(path => {
    return path.replace(/ \(.*\)/, '')
  })
}

async function deleteFiles(files, method) {
  if (method === 'Move to trash') {
    await trash(files)
  } else if (method === 'Delete permanently') {
    await del(files)
  }
}

module.exports = {
  findFiles,
  filterFiles,
  appendFileSize,
  removeFileSize,
  deleteFiles,
}
