import * as React from 'react'
import { matchPath } from 'react-router-dom'
import * as _ from 'lodash'

/**
 * Digs through the specified routes and matches them against the specified
 * request path to find out which ones match.
 *
 * @param requestPath Express {@link https://expressjs.com/en/api.html#req.path|req.path}
 * @param routes An Array of react Routes
 * @param [accumulator] Where the matching routes will be accumulated.
 * @returns {Array} The accumulated routes (empty if no matches).
 *
 * @memberof Server
 */
const recursivelyMatchPath = (requestPath, routes, accumulator = []) => {
  for (let route of routes) {
    const path = route.path
    const match = matchPath(requestPath, path)
    // console.log(`requestPath:[${requestPath}] path:[${path}] match:[${JSON.stringify(match)}]`)
    if (!_.isEmpty(match)) {

      accumulator.push(route) // capture route

      // stop if we hit an exact match
      if (match.isExact && route.exact) {
        break
      }


      // stop if there are no more child routes
      if (_.isEmpty(route.routes)) {
        continue
      }

      // otherwise keep digging...
      return recursivelyMatchPath(requestPath, route.routes, accumulator)

    }
  }
  return accumulator
}

export default function (requestPath, routes) {
  return recursivelyMatchPath(requestPath, routes)
}
