const path = require('path')
const utils = require('./utils')
const filterFiles = utils.filterFiles
const appendFileSize = utils.appendFileSize
const removeFileSize = utils.removeFileSize

const mockAB = path.join(process.cwd(), 'mocks', 'a', 'b')
const mockABB = path.join(process.cwd(), 'mocks', 'a', 'b', 'b')
const mockB = path.join(process.cwd(), 'mocks', 'b')
const mockBBA = path.join(process.cwd(), 'mocks', 'bb', 'a')
const mockBBB = path.join(process.cwd(), 'mocks', 'bb', 'b')

test('filterFiles', () => {
  expect(filterFiles([
    mockAB,
    mockABB,
    mockB,
    mockBBA,
    mockBBB,
  ], 'b'))
  .toStrictEqual([
    mockAB,
    mockB,
    mockBBB,
  ])
})

test('appendFileSize', () => {
  expect(appendFileSize([
    mockAB,
    mockB,
  ]))
  .toMatchObject([
    expect.stringMatching(/.+\(.+\)/),
    expect.stringMatching(/.+\(.+\)/),
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
