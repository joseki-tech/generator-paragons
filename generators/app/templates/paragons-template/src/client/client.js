/**
 * This is the entry point on the client side.
 * @member client
 * @memberof Client
 */

import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducers from '../shared/redux/reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addLocaleData, IntlProvider } from 'react-intl'
import App from '../shared/App'
import Loadable from 'react-loadable'
import newPageSupport from '../shared/newPageSupport'
import ErrorBoundary from '../shared/ErrorBoundary'

const initialState = window.__INITIAL_STATE__
delete window.__INITIAL_STATE__

// create redux store
const allReducers = Object.assign({}, reducers) // , additional reducers...
const combinedReducers = combineReducers(allReducers)
const store = createStore(combinedReducers, initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)))

const preloads = [

  // load the react-intl locale data (https://github.com/yahoo/react-intl/wiki#loading-locale-data)
  // NOTE: adjust the webpackInclude to include your supported languages
  import(`react-intl/locale-data/${store.getState().language}`
    /* webpackChunkName: "react-intl-locale-data" */
    /* webpackInclude: /(en|pt).js$/ */
    ),

  // load our i18n translations
  import(
    /* webpackChunkName: "i18n-translations" */
    /* webpackInclude: /\.json$/ */
    `../shared/i18n/${store.getState().locale}.json`),

  Loadable.preloadReady(),
]

Promise.all(preloads).then(values => {

  const [localeData, translationsForUsersLocale] = values

  addLocaleData([...localeData.default])

  // page support
  const pageSupport = newPageSupport()

  // now hydrate the app
  hydrate(
    <Provider store={store}>
      <IntlProvider
        locale={store.getState().language}
        messages={translationsForUsersLocale.default}>
        <BrowserRouter>
          <ErrorBoundary>
            <App/>
          </ErrorBoundary>
        </BrowserRouter>
      </IntlProvider>
    </Provider>,
    document.querySelector('#app'),
  )
})



