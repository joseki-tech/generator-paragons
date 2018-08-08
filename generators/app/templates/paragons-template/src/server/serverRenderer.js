import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducers from '../shared/redux/reducers'
import HostPage from './HostPage'
import thunk from 'redux-thunk'
import * as _ from 'lodash'
import routes from '../shared/routes'
import * as Loadable from 'react-loadable'
import matchNestedRoutes from './matchNestedRoutes'

const root = require('window-or-global')

/**
 * [Webpack Hot Server Middleware serverRenderer](https://www.npmjs.com/package/webpack-hot-server-middleware)
 *
 * @memberOf Server
 */
const serverRenderer = function ({clientStats}) {

  return (req, res, next) => {

    // actual route?
    const matchedRoutes = matchNestedRoutes(req.path, routes)
    // console.log(`req.path:[${req.path}] matchedRoutes:[${JSON.stringify(matchedRoutes, null, 2)}]`)
    if (!_.isEmpty(matchedRoutes)) {

      const context = {} // for react router v4

      // determine users locale and language
      const usersLocale = req.locale.toString()
      const usersLanguage = req.locale.language

      // create the redux store
      const allReducers = Object.assign({}, reducers) // , additional reducers...
      const combinedReducers = combineReducers(allReducers)
      const store = createStore(combinedReducers,
        {
          sessionId: root.SPA_SESSION_ID,
          locale: usersLocale,
          language: usersLanguage,
        },
        applyMiddleware(thunk))

      // load the i18n translations
      let translationsForUsersLocale
      try {
        translationsForUsersLocale = require(
          `../shared/i18n/${usersLocale}.json`)
      } catch (e) {
        console.error(e)
        res.status(406).send(`Unsupported locale: ${usersLocale}`)
      }

      // retrieve entry chunks & css from client stats
      const entrypointAppAssets = clientStats.entrypoints.app.assets
      const entryChunks = entrypointAppAssets.filter(
        (asset) => asset.endsWith('.js'))
      const css = entrypointAppAssets.filter((asset) => asset.endsWith('.css'))

      // trigger preloadData() from all the components in the render tree (Thanks Alex Moldovan -> https://medium.freecodecamp.org/demystifying-reacts-server-side-render-de335d408fe4)
      const preloads = matchedRoutes.filter(route => {
        // console.log(route)
        return route.preloadData
      }).map(route => {
        console.log(`pre-loading data for path:[${route.path}]`)
        return store.dispatch(route.preloadData())
      })

      // all task which need to be completed prior to performing the render
      const preRenderTasks = [
        ...preloads,
        // CodeSplitPageLoadable.preload() // preload individual loadables
        Loadable.preloadAll(), // preload all loadables
      ]

      // perform all pre render work and then do the SSR!
      Promise.all(preRenderTasks).then(() => {

        // console.log(store.getState()) // dump the store state

        // render the host page
        const html = ReactDOMServer.renderToStaticMarkup(
          <HostPage
            clientStats={clientStats}
            url={req.url}
            usersLocale={usersLocale}
            usersLanguage={usersLanguage}
            translationsForUsersLocale={translationsForUsersLocale}
            context={context}
            store={store}
            css={css}
            entryChunks={entryChunks}
          />)

        // context.url will contain the URL to redirect to if a <Redirect> was used
        if (context.url) {
          res.redirect(context.url)
        }
        else {
          res.send('<!DOCTYPE html>' + html)
        }

      })
    }
    else {
      res.status(404).
        send(
          `I\'m very sorry but, there was neither static content nor a matching route to serve you for [<b><font color="red">${req.path}</font></b>]!`)
    }

  }

}

module.exports = serverRenderer