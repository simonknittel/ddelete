const path = require('path')
const utils = require('./utils')
const filterFiles = utils.filterFiles
const appendFileSize = utils.appendFileSize
const removeFileSize = utils.removeFileSize

const mockAB = path.join(process.cwd(), 'mocks', 'a', 'b')
const mockABB = path.join(process.cwd(), 'mocks', 'a', 'b', 'b')
const mockB = path.join(process.cwd(), 'mocks', 'b')

test('filterFiles', () => {
  expect(filterFiles([
    mockAB,
    mockABB,
    mockB,
  ], 'b'))
  .toStrictEqual([
    mockAB,
    mockB,
  ])
})

test('appendFileSize', () => {
  expect(appendFileSize([
    mockAB,
    mockB,
  ]))
  .toStrictEqual([
    mockAB + ' (0 B)',
    mockB + ' (0 B)',
  ])
})

test('removeFileSize', () => {
  expect(removeFileSize([
    mockAB + ' (10 B)',
    mockB + ' (100.4 MB)',
  ]))
  .toStrictEqual([
    mockAB,
    mockB,
  ])
})
