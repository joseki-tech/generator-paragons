// allows you to have configurations by environment. NODE_ENV is not always
// unique enough so we first respect CFG
let environment = !!process.env.CFG ? process.env.CFG : process.env.NODE_ENV
let CFG_FILE = `./${environment}.json`
const CFG = require(CFG_FILE)
console.log(`Loaded configuration file :[${CFG_FILE}].`)

module.exports = CFG
