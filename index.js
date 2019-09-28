#! /usr/bin/env node

const inquirer = require('inquirer')
const globby = require('globby')
const fs = require('fs')
const filesize = require('filesize')
const trash = require('trash')
const del = require('del')

inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'))

inquirer
  .prompt([
    {
      type: 'suggest',
      message: 'Enter the name of the file or directory you want to delete:',
      name: 'filename',
      suggestions: ['.DS_Store', 'node_modules', 'Thumbs.db', 'desktop.ini'],
    }
  ])
  .then(async ({filename}) => {
    // TODO: Display loady

    let files = await findFiles(filename)
    files = filterFiles(files, filename)
    files = appendFileSize(files)

    // TODO: Hide loady

    inquirer
      .prompt([
        {
          type: 'checkbox',
          message: 'Select the files you want to delete:',
          name: 'filesToDelete',
          choices: files,
        }
      ])
      .then(({filesToDelete}) => {
        const cleanedPaths = removeFileSize(filesToDelete)

        inquirer
          .prompt([
            {
              type: 'list',
              message: 'Move files to trash or delete permanently?',
              name: 'method',
              choices: [
                'Move to trash',
                'Delete permanently',
              ],
            }
          ])
          .then(async ({method}) => {
            // TODO: Show loady

            await deleteFiles(cleanedPaths, method)

            // TODO: Hide loady
            console.log('Done!')
          })
      })
  })

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
