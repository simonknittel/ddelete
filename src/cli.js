const inquirer = require('inquirer')
const utils = require('./utils')

function requestFilename() {
  inquirer
    .prompt([
      {
        type: 'suggest',
        message: 'Enter the name of the file or directory you want to delete:',
        name: 'filename',
        suggestions: ['.DS_Store', 'node_modules', 'Thumbs.db', 'desktop.ini'],
      }
    ])
    .then(requestWhichFilesToDelete)
}

async function requestWhichFilesToDelete({filename}) {
  // TODO: Display loady

  let files = await utils.findFiles(filename)

  if (files.length === 0) {
    console.log('No files found.')
    requestFilename()
    return
  }

  files = utils.filterFiles(files, filename)
  files = utils.appendFileSize(files)

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
    .then(requestMethod)
}

function requestMethod({filesToDelete}) {
  const cleanedPaths = utils.removeFileSize(filesToDelete)

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

      await utils.deleteFiles(cleanedPaths, method)

      // TODO: Hide loady
      console.log('Done!')
    })
}

module.exports = {
  requestFilename,
  requestWhichFilesToDelete,
  requestMethod,
}
