import fs from 'fs'
import fse from 'fs-extra'

var path = require("path")


const load = name => fs.readFileSync(`${__dirname}/test-data/${name}`, 'utf8')

const saveJSON = (data, name) => {
    if (!data) throw new Error('data required!')
    if (!name) throw new Error('name required!')
    const dir = path.resolve(__dirname, 'test-data')
    fse.ensureDirSync(dir)
    const filePath = path.resolve(dir, `${name}.json`)
    fse.writeJsonSync(filePath, data, {spaces: 2})
}

const loadJSON = name => fse.readJSON(`${__dirname}/test-data/${name}.json`)

export {
    load,
    saveJSON,
    loadJSON
}