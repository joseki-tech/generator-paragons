![alt text][logo]

# Paragons

A generator for creating sophisticated enterprise level universal React SPAs. Have server side rendering, lightening 
fast pages, SEO support and much much more...

Are you exhausted by the exercise of stitching together all the essential pieces to constitute a comprehensive SPA? 
Are you frustrated by getting painted into corners with bloated _frameworks_ and mired in their black boxes? Whether 
you're looking to create a SPA application, jump-start your own enterprise framework, or simply want to see and learn 
how all the magic works, you're in the right place.

**Paragons** brings together some of the top tooling, modules, and approaches of modern SPA development and combines 
them into a simple elegant box.

Dislike a particular aspect or need to tack in something else? Begin by reading the **Walkthrough** below and then dig 
in. You will find valuable documentation on all major components.

## Features

* [React v16](https://reactjs.org/), [React Router v4](https://reacttraining.com/react-router/web/guides/philosophy), and [Redux](https://redux.js.org/) with [Thunk Middleware](https://redux.js.org/api-reference/applymiddleware#example-using-thunk-middleware-for-async-actions) and [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension)
* [Webpack v4](https://webpack.js.org/concepts/) with [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) and pre-configured [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
* [Express](https://expressjs.com/)
* **Server Side Rendering** (**SSR**) with pre-render task support
* **Code Splitting**
* Styling (CSS, **Sass**)
* Testing ([Jest](https://jestjs.io/) with [Enzyme](https://github.com/airbnb/enzyme)) and Code Coverage ([Istanbul](https://istanbul.js.org/))
* Internationalization (**i18n**)
* **SEO** Support
* Secure routes
* Deferred Rendering (aka Above the Fold Rendering)
* **Demos** Optionally install a collection demonstrations that show and explain the various features. This is an
excellent way to explore how things work.
* Docmentation ([JSDoc](http://usejsdoc.org/))

_For further information and discussion see corresponding sections below._

### Development

In development mode modifications are automatically detected and made available via HMR without restart. Neither the 
server bundle nor the client chunks are not emitted. Source maps are inlined.

```sh
npx -p yo -p generator-paragons generator-paragons my-app
cd spa-my-app
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

_**Note:** `npx` is available on `npm` 5.2+ and higher. If you are on a previous version see **Alternative Installations** 
below._

#### Production

In production mode the server bundle and the client chunks are emitted to the dist directory. In addition the client 
chunks are optimized(minification, tree shook, etc.). Source maps are emitted per chunk.

```sh
npm run build
npm run start-prod
```

##  [Webpack v4](https://webpack.js.org/concepts/) with [Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)

* Single simple **webpack.config.js** which handles both the client and the server side.


## Server Side Rendering (SSR)

Pages are built on the server side and can be immediately rendered in the clients browser. Not only can this
be a huge performance gain but, it is absolutely essential for SEO.

### Pre-render Task Support

There can be a number of operations which need to be performed prior to inducing the SSR. One of the main challenges is 
pre-loading  data in to the Redux store _before_ the SSR cycle is invoked. That can be easily accomplished by 
registering a `preloadData` thunk function whic returns a `Promise` on your component. **server.js** will 
automatically pick up all `preloadData` promises and add them to the pre-render tasks. This capability is demonstrated 
by **PreloadDataPage.js**

## Code Splitting

Code splitting allows you to beak up your application into chunks. In practice this is usually done per route so each 
page is served with only what it needs to render. Thanks to dynamic imports and [React Loadable](https://github.com/jamiebuilds/react-loadable) 
this becomes a simple game. This capability is demonstrated by  **CodeSplitPage.js**.

##### Key Concept

Webpack is a _static module bundler_. That is given an entry point it will walk the imports and requires bundling
everything in to JS file. The key is to break that static path by using [Dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports). 
Simply use Webpacks [import()](https://webpack.js.org/api/module-methods/#import-) function as opposed to the 
[import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) statement.

## Styling (CSS, Sass)

Out of the box CSS and [Sass](https://sass-lang.com/guide) support with autoprefixing.

## Testing and Code Coverage ([Jest](https://jestjs.io/) and [Enzyme](https://github.com/airbnb/enzyme))

Tests are located in the `tests` directory. _As a matter of practice it is recommended to mirror the `src` 
directory structure._ 
 
React components can be tested with [Enzyme](https://github.com/airbnb/enzyme)
 
**Note**: The `test` env of the root .babelrc ensures the code is transpiled._

## Internationalization (i18n)

Components can use the [React Intl API](https://github.com/yahoo/react-intl/wiki/API) 
right out of the box. All translations are maintained under `src/i18n/<locale>. This capability is demonstrated by 
**i18nPage.js**. 

The users locale is determined via the Express middleware [express-locale](https://www.npmjs.com/package/express-locale)
in **server.js** and both stored into the Redux store and feed to `<IntlProvider>` in **HostPage.js**.

The translations are loaded by Webpacks [import()](https://webpack.js.org/api/module-methods/#import-) function which 
is very cool because they are automatically encapsulated in a chunk and can be dynamically loaded. Plus they will be
cached via the standard browser caching and only downloaded initially or if they are updated!

## SEO Support

This SEO game is really only applicable to publicly available pages which can be sever side rendered. That is because 
the crawlers walk the site by following all the available links. As they request them, the titles, meta tags, keywords, 
etc. need to be appropriately set for the page / route.

These capabilities are embedded into **PurePage.js** which component pages can extend. 

**PageSupport.js** is a singleton per request/response cycle which centralizes critical page data points including 
the title and meta tags.

_**Note**: Although it is possible to update the the DOM on the client side; that is update the title, meta tags, 
keywords, etc. once the SPA is in effect, it's useless as the crawlers as they can't navigate the SPA. That being said 
the title is a special case as it is reflected in the browser and impacts the users experience. Therefore 
**PageSupport.js** does update it in real time._

## Secure Routes

For some routes/pages the user needs to be authenticated. This can be accomplished by setting `secure="true"` on the 
route. See the `/profile` route for example usage. When the user attempts to access a secure route, they are redirected 
to the login page for authentication. After successful authentication, the user is then redirected to the route 
they were initially trying to access...

_**Note**: The actual authentication implementation in `LoginPage.js.handleLogin` is stubbed for example purposes and 
will accept any password except "fail" which can be used to test drive a failed login scenario. That being said it 
does give you a solid starting point to work with including preparation of password hash, seeding profile information 
in the Redux store, a logout route, and a profile page. 

## Deferred Rendering (aka Above the Fold Rendering)

This is a technique for increasing the page render time. The idea is that you only take the cost of rendering the 
content which the user will see or what is considered to be above the fold.

This capability is demonstrated by **DeferRenderPage.js** which leverages the **DeferRender.js** component.

_**Note(1)**: In practice the cost is usually the the supporting service operations not the actual render._

_**Note(2)**: If you are truly concerned with the visible portion, see [react-loadable-visibility](https://github.com/stratiformltd/react-loadable-visibility)._

## Walkthrough

An inbound request is first handled by Express in **server.js**
which does some up front work like determining the users locale, setting the root directory from which to serve static 
assets, and configures middleware. If the mode is `development` then hot reloading is also setup.

Next **serverRenderer.js** checks to see if the requested path matches a configured route. If so it determine users 
locale and language, creates the Redux store, loads the international locale data and the translations, and performs all 
pre-render tasks like data loading. Finally it delegates to **HostPage.js** which performs the actual server side 
render and assembles the initial HTML is sent to and rendered immediately in the clients browser. In the background, 
the SPA is hydrated into a fully functional client side application by **client.js**.From there the SPA is in full 
effect.

## Alternative Installations

#### Local Installation (preferred)

Here you install `yo` and `generator-paragons` locally and then invoke `generator-paragons`. This approach is generally 
more acceptable because each time you do it your ensured to be working with the latest and greatest Paragons generator 
because you are starting fresh each time (`npx` is much fancier). 

```sh
mkdir spa-my-app
cd spa-my-app
npm i yo generator-paragons
./node_modules/.bin/yo paragons
```

#### Global Installation (use npx or local install; this is just here for educational purposes)

Here `generator-paragons` is installed globally but, that is not optimal because you could be out of sync
with the latest and greatest.

```sh
npm i -g yo yeoman-generator generator-paragons
mkdir my-app
cd my-app
yo paragons my-app
```

# License

Copyright (c) 2018-present, Joseki Technologies Inc.

Licensed under the [Apache License, Version 2.0].

[logo]: http://josekitech.com/wp-joseki/wp-content/uploads/2014/08/LOGO_Joseki-Tech3.jpg "Joseki Technologies Inc."
[apache license, version 2.0]: https://www.apache.org/licenses/LICENSE-2.0



