import * as React from 'react'
import Loadable from 'react-loadable'

/**
 * Utility method for creating a {@link https://github.com/jamiebuilds/react-loadable#loadable|Loadable} from the specified component.
 *
 * @param fullyQualifiedComponentName
 * @returns {*}
 */
export default function (fullyQualifiedComponentName) {
  return Loadable({
    loader: () => import(/* webpackChunkName: "[request]" */ `${fullyQualifiedComponentName}`),
    loading: () => null,
  })
}
