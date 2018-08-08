#!/usr/bin/env node

const path = require('path')
const cp = require('child_process')

const [execPath, , ...args] = process.argv
const name = args[0] // app name

const rootDir = path.join(__dirname, '..')

// call yeoman with the paragons generator
cp.execSync(`yo paragons ${process.env.PWD} ${name}`,
  {
    cwd: rootDir,
    stdio: 'inherit',
  },
)

process.exit()
