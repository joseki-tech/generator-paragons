## NPM Scripts

`clean` Deletes `doc` ,`dist`, `coverage`, and cleans up `public`

`build` Transpiles and packages the client bundles/chunks (minified) and creates a server bundle. All necessary RT 
resources such as JS, CSS, and the map files are copied to `public`.

`doc` Generate JSDoc

`start` Starts the application in _development_ mode.

`start-prod` Starts the application in _production_ mode.

`test` Executes the test suites.

## Files

`dist` The is where all the Webpack output is emitted.

`coverage` Generated on `npm test`. The report is at `coverage/lcov-report/index.html`.

`public` Static content.

### Client Bundle Analyzation

The [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) has been enabled and the client 
report is generated to `dist/client.report.html` Here is a [sample](doc/sample-client-report/sample-client-report.png).

You will notice that there are a few main chunks for Webpacks runtime support, 3rd party libs, react-intl locale data, 
i18n translations, and finally one for the application code. Additionally there will be chunks per code split points. 
In production mode, all have hashes which only change when the underlying content changes.

For a mature application, usually only the application code is changing. However maybe there are new 3rd party libs.
This setup caters to those scenarios and allows the client to cache effectively.

## SPA Session ID

The React component SPASessionID used in HostPage and the SPA_SESSION_ID block in src/server/index.js work together to
provide a simple client session id named SPA_SESSION_ID. SPA_SESSION_ID is available on both the client and the server 
as a global under `window` and `global` respectively. **Hint:** Use `root` to access it universally:

    import root from 'window-or-global'
    console.log(`SPA_SESSION_ID:[${root.SPA_SESSION_ID}]`)

It's also available in the Redux store under `sessionId`.

## Map Files

Map files are produced for the production build and copied into the public directory. Note that they are readily
available by default. You can protect them by enabling basic authentication in `src/server/index.js`. When you want to
use them, first right click and open one of the JS chunks from the network tab in a new tab. Then and add ".map" to the 
end of the URL and press return. At that point you should be challenged and upon successful authentication the Chrome
Development Tools will be able to resolve the source maps. Note you will need to either re-open the Deve Tools or 
refresh the app.

## Express

Please note that the following middleware is already setup for you!

* [body-parser](https://www.npmjs.com/package/body-parser)
* [cookie-parser](https://www.npmjs.com/package/cookie-parser)
* [express-locale](https://www.npmjs.com/package/express-locale)

## Q&As

1. **Why not use [React Intl Redux](https://www.npmjs.com/package/react-intl-redux)?** The primary reasons were so the 
translations could be parted out as chunks and dynamically loaded and so they could be cached by the browser. React 
Intl Redux is designed to store the translations in the Redux store and so they come down each time the app is
initiated.

