/**
 * This is the server side entry point.
 * @member server
 * @memberof Server
 */

const root = require('window-or-global')
const uuidv4 = require('uuid/v4')
const _ = require('lodash')

// server side configurations
const CFG = require('./conf/cfg')

const express = require('express')
const app = express()

const cache = require('express-cache-headers')
app.use(process.env.NODE_ENV === 'development' ? cache({nocache: true}) : cache(
  365 * 24 * 60 * 60))

app.use(require('body-parser').json())
app.use(require('cookie-parser')())

// handle locale
app.use(require('express-locale')({
  'priority': ['accept-language', 'default'],
  'default': 'en_US',
}))

// app.use((req, res, next) => {
//     console.log(`Request locale: ${req.locale}`)
//     next()
// })

// SPA_SESSION_ID

app.use('/*', (req, res, next) => {
  let spaSessionId = _.get(req, 'cookies.SPA_SESSION_ID')
  if (!spaSessionId) {
    spaSessionId = uuidv4() //.replace(/\-/gi, '')
    spaSessionId = spaSessionId.slice(0, 6) // short id like git
    res.cookie('SPA_SESSION_ID', spaSessionId) // session cookie
    console.log(
      `*** New SPA session id:[${spaSessionId}] for req.path:[${req.path}] ***`)
  }
  root.SPA_SESSION_ID = spaSessionId
  next()
})

// protect map files with basic auth
const basicAuth = require('express-basic-auth')
app.use('**/*.map', basicAuth({
  users: {[CFG.mapfiles.user]: `${CFG.mapfiles.password}`},
  challenge: true,
  realm: 'Support Realm',
}))

app.use(express.static('./dist'))
app.use(express.static('./public'))

// development
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
  const config = require('../../webpack.config.js')
  const compiler = webpack(config)
  const options = {
    serverSideRender: true,
    // writeToDisk: false,
    stats: {
      reasons: false,
      source: false,
      modules: false,
      chunkModules: false,
      chunks: false,
      cached: false,
      colors: true,
    },
    watchOptions: {
      'info-verbosity': 'verbose',
      // ignored: ['node_modules', './**/*.json'],
      // poll: false,
      // aggregateTimeout: 9000
    },
  }
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(
    compiler.compilers.find(compiler => compiler.name === 'client')))
  app.use(webpackHotServerMiddleware(compiler))
}

// production
else {
  const serverRenderer = require('../../dist/server.js').default
  const clientStats = require('../../dist/client.stats.json')
  app.use(serverRenderer({clientStats}))
}

app.listen(3000, () => console.log('SPA listening on port 3000!'))
