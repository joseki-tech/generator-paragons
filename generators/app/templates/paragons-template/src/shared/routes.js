<% if (includeDemo) { %>
import createLoadable from './createLoadable'
import DemoHomePage from './demo/components/DemoHomePage'
import SassPage from './demo/components/SassPage'
import i18nPage from './demo/components/i18nPage'
import FooPage from './demo/components/FooPage'
import NestedPage from './demo/components/NestedPage'
import ColorPage from './demo/components/ColorPage'
import SEOPage from './demo/components/SEOPage'
import CounterPage from './demo/components/CounterPage'
import SwitchOnChildRoutes from './SwitchOnChildRoutes'
import DemoLayout from './demo/components/DemoLayout'
import DeferRenderPage from './demo/components/DeferRenderPage'
import PreloadDataPage, { fetchData as PreloadDataPageFetchData } from './demo/components/PreloadDataPage'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import LogoutPage from './LogoutPage'
import ProfilePage from './ProfilePage'
import ErrorPage from './demo/components/ErrorPage'
import AutoPrefixingPage from './demo/components/AutoprefixingPage'
import SecurePage from './demo/components/ProtectedPage'

export const CodeSplitPageLoadable = createLoadable(
  './demo/components/CodeSplitPage')

export default [
  {path: '/', component: HomePage, exact: true},
  {path: '/login', component: LoginPage},
  {path: '/logout', component: LogoutPage},
  {path: '/profile', component: ProfilePage, secure: true},
  {
    path: '/demo', component: SwitchOnChildRoutes,
    routes: [
      {
        path: '/demo',
        component: DemoLayout,
        routes: [
          {path: '/demo/counter', component: CounterPage},
          {path: '/demo/split', component: CodeSplitPageLoadable},
          {path: '/demo/sass', component: SassPage},
          {path: '/demo/autoprefixing', component: AutoPrefixingPage},
          {path: '/demo/i18n', component: i18nPage},
          {path: '/demo/seo', component: SEOPage},
          {path: '/demo/secure', component: SecurePage, secure: true},
          {path: '/demo/error', component: ErrorPage},
          {
            path: '/demo/preload',
            component: PreloadDataPage,
            preloadData: PreloadDataPageFetchData,
          },
          {path: '/demo/foo', component: FooPage},
          {path: '/demo/defer', component: DeferRenderPage},
          {
            path: '/demo/nested', component: NestedPage,
            routes: [
              {
                path: '/demo/nested/:color',
                component: ColorPage,
              },
            ],
          },
          {path: '/demo', component: DemoHomePage, exact: true},
        ],
      },
    ],
  },

]
  <% } else {%>
import { HomePage } from './HomePage'
import LoginPage from './LoginPage'
import LogoutPage from './LogoutPage'
import ProfilePage from './ProfilePage'

export default [
    {path: '/', component: HomePage, exact: true}
    {path: '/login', component: LoginPage},
    {path: '/logout', component: LogoutPage},
    {path: '/profile', component: ProfilePage, secure: true},
  ]
  <% } %>
