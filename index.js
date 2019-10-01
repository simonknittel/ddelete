#! /usr/bin/env node

const inquirer = require('inquirer')
const cli = require('./src/cli')

inquirer.registerPrompt('suggest', require('inquirer-prompt-suggest'))

cli.requestFilename()
