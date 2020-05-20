### 4.0.0 (UNRELEASED)
1. <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> (serverRender.js)
2. Freshened dependencies and addressed security warnings. (PAR-1,8)
3. Added missing uglify webpack plugin. (PAR-10)
4. Introduced ability to secure routes along with login/out and profile pages. (PAR-5)
5. Addressed build/production mode breakage. (PAR-3,11)
6. Introduced simple server side config support. (PAR-4)
7. Webpack output artifacts no longer copied to the public directory. (PAR-3)

#### 3.1.0
1. Dependency updates for generator and app. Biggest updates were:
  a) react 16.4.1 -> 16.6.3
  b) babel 6 -> 7
2. Now passing request int preloadData for route in serverRenderer.js in case the handler needs access to request 
  information such as the path.
3. generator-paragons version now recorded in package.json of generated app and shown at the bottom of the demo pages.

#### 3.0.1  
1. Added syntax highlighting to demo.
2. Updating demo for Sass Page.

#### 3.0
1. Updated npx install command.

#### 2.17
1. Sass now hot reloading as expected.
2. Added demo for auto prefixing.
3. Now on GitHub

#### 2.16.2
1. README polish

#### 2.16.1
1. Added demo for [Error Handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
2. More and better JSDoc
3. Enhanced installation instructions.

#### 2.15.0
1. Fixed bug with code coverage generation on post install.

#### 2.14.0
1. Refactored PageSupport to use Sets for keywords and robot directives.
2. Test suite is executed and documentation is produced on app generation.
3. JSDoc cleanup.

#### 2.13.0
1. Refactored PageSupport for SEO capabilities.
