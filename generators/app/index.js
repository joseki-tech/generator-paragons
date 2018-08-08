'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

const success = chalk.bold.green.bold

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)
    this.argument('outputDir', {
      type: String,
      required: false,
      default: process.env.PWD
    })
    this.argument('appname', {type: String, required: false, default: this.appname})
  }

  prompting () {
    this.log(yosay(`Welcome to the ${chalk.blue('Paragons')} generator!`))

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name (spa-<name>)',
        default: this.options.appname
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Your project description',
        default: 'My project'
      },
      {
        type: 'confirm',
        name: 'includeDemo',
        message: 'Include Demos',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
      this.props.projectName = _.kebabCase(this.props.projectName)
      this.spaDir = `spa-${this.props.projectName}`
      this.fullyQualifiedSPADir = `${this.options.outputDir}/${this.spaDir}`
    })
  }

  writing () {
    // Template (excluding problematic binaries)
    this.fs.copyTpl(
      this.templatePath('./paragons-template'),
      this.destinationPath(this.fullyQualifiedSPADir),
      {
        projectName: this.props.projectName,
        projectDesc: this.props.projectDesc,
        includeDemo: this.props.includeDemo
      },
      {},
      {
        globOptions: {
          dot: true,
          ignore: ['**/*.{png,gif,jpg}']
        }
      }
    )

    // Now copy those problematic binaries
    this.fs.copy(
      this.templatePath('./paragons-template/**/*.{png,gif,jpg}'),
      this.destinationPath(this.fullyQualifiedSPADir)
    )
  }

  install () {
    this.log(success('Staged all files'))
    process.chdir(this.fullyQualifiedSPADir)
    this.log(success('Executing npm install ...'))
    this.spawnCommandSync('npm', ['--loglevel=error', 'install'])
    process.chdir('..')

    this.log(
      success(
`Success! 

  The app is located at ${this.fullyQualifiedSPADir}
  
  * Code Coverage:  file://${
    this.fullyQualifiedSPADir
    }/coverage/lcov-report/index.html
  * JSDoc:          file://${
    this.fullyQualifiedSPADir
    }/doc/jsdoc/index.html
  
  To start up the app:
  
    cd ${this.spaDir}
    npm start
  
  Then open your browser to http://localhost:3000 and enjoy!
`
      )
    )
  }
}
