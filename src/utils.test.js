const utils = require('./utils')
const filterFiles = utils.filterFiles
const removeFileSize = utils.removeFileSize

test('filterFiles', () => {
  expect(filterFiles([
    'C:/projectA/node_modules',
    'C:/projectA/node_modules/packageA/node_modules',
    'C:/projectB/node_modules',
  ], 'node_modules'))
  .toStrictEqual([
    'C:/projectA/node_modules',
    'C:/projectB/node_modules',
  ])
})

test('removeFileSize', () => {
  expect(removeFileSize([
    'C:/projectA/node_modules (10 B)',
    'C:/projectA/node_modules/packageA/node_modules (10.4 KB)',
    'C:/projectB/node_modules (100.4 MB)',
  ], 'node_modules'))
  .toStrictEqual([
    'C:/projectA/node_modules',
    'C:/projectA/node_modules/packageA/node_modules',
    'C:/projectB/node_modules',
  ])
})
