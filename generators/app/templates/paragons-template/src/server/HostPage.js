  import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import SPASessionID from './SPASessionID'
import App from '../shared/App'
import PageSupport from '../shared/PageSupport'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import fse from 'fs-extra'
import { IntlProvider } from 'react-intl'
import newPageSupport from '../shared/newPageSupport'

const IS_NODE = require('is-node')
const stats = fse.readJsonSync('./dist/react-loadable.json')

/**
 * Renders the host page for the SPA. Traditionally you would see this tackled with something like
 * {@link https://github.com/jantimon/html-webpack-plugin#|html-webpack-plugin}. However this approach uses React as
 * the templating mechanism and has direct access to the store!
 *
 * Special thanks to {@link https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux/commits?author=Alex-ray|Alex-ray} after which this is heavily modeled after {@link https://github.com/Alex-ray/v2-universal-js-hmr-ssr-react-redux/blob/master/src/server/Html.js}
 *
 * @memberof Server
 */
class HostPage extends React.Component {

  render () {

    const {
      clientStats,
      url,
      usersLocale,
      usersLanguage,
      translationsForUsersLocale,
      context,
      store,
      css,
      entryChunks,
    } = this.props

    let state = store.getState()

    // WARNING: See the following for security issues around embedding JSON in HTML:
    // http://redux.js.org/recipes/ServerRendering.html#security-considerations
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(state).
      replace(/</g, '\\u003c')}`

    // page support
    const pageSupport = newPageSupport()

    // so we can collect any preload(s)
    let modules = []

    // perform the actual server side render
    const root = IS_NODE && ReactDOMServer.renderToString(
        <Provider store={store}>
          <IntlProvider
            locale={usersLanguage}
            messages={translationsForUsersLocale}>
            <StaticRouter location={url} context={context}>
                <Loadable.Capture
                  report={moduleName => modules.push(moduleName)}>
                  <App/>
                </Loadable.Capture>
            </StaticRouter>
          </IntlProvider>
        </Provider>
    )

    // which chunks do we need to load up-front?
    modules = modules.reduce((accumulator, module) => {
      accumulator.push(`${module}.js`)
      return accumulator
    }, [])
    let preLoadedLoadables = getBundles(stats, modules)

    // console.log(`modules:[${modules}]`)
    // console.log(`preLoadedLoadables:[${JSON.stringify(preLoadedLoadables, null, 2)}]`)

    return (
      <html>
      <head className="at-element-marker">
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        {pageSupport.buildMetaDescription()}
        {pageSupport.buildMetaKeywords()}
        {pageSupport.buildMetaRobotDirectives()}
        {pageSupport.buildTitle()}
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></link>
        {css.map((css, idx) => <link key={idx} rel="stylesheet" type="text/css"
                                     href={`${clientStats.publicPath}${css}`}></link>)}
        <SPASessionID/>

        <link rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
              integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
              crossOrigin="anonymous"/>

      </head>
      <body>
      <script dangerouslySetInnerHTML={{__html: initialState}}/>
      {IS_NODE ? <div id="app" dangerouslySetInnerHTML={{__html: root}}></div> :
        <div id="app"></div>}
      {preLoadedLoadables.map(
        (bundle, idx) => <script key={idx} type="text/javascript"
                                 src={`${bundle.publicPath}`}></script>)}
      {entryChunks.map((asset, idx) => <script key={idx} type="text/javascript"
                                               src={`${clientStats.publicPath}${asset}`}></script>)}
      </body>
      </html>
    )
  }

}
export default HostPage
