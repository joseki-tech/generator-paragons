import * as React from 'react'
import * as _ from 'lodash'

const IS_NODE = require('is-node')

/**
 * Singleton per request/response cycle which centralizes critical page data
 * points including the title and meta tags. My primary purpose it to
 * facilitate SEO concerns. Anywhere you need me just use {@link #getInstance}
 *
 * ```
 * import PageSupport from './PageSupport'
 * const pageSupport = PageSupport.getInstance()
 * pageSupport.addKeywords('foo', 'bar')
 *```
 *
 * @module PageSupport
 */
const PageSupport = (function () {

  let _instance

  function init () {

    let _title
    let _description
    let _keywords = new Set()
    let _robotDirectives = new Set()

    /**
     * @function setTitle - Sets the page title
     * @param {string} title
     */
    const setTitle = function (title) {
      _title = title
      if (!IS_NODE) {
        const e = document.getElementsByTagName('title')[0]
        e.innerHTML = _title
      }
    }

    /**
     * @function getTitle - Returns the page title
     * @returns {string}
     */
    const getTitle = function () {
      return _title
    }

    /**
     * @function setDescription - Sets the page description
     * @param {string} description
     */
    const setDescription = function (description) {
      _description = description
      // No real point in updating the DOM
    }

    /**
     * @function getDescription - Returns the page description
     * @returns {string}
     */
    const getDescription = function () {
      return _description
    }

    /**
     * @function addKeywords - Adds the keywords
     * @param {string|Array<string>} keywords (either comma delimited or an array)
     */
    const addKeywords = function (keywords) {
      if (_.isArray(keywords)) {
        keywords.forEach(e => _keywords.add(e))
      }
      else {
        keywords.split(',').map(keyword => {
          _keywords.add(_.trim(keyword))
        })
      }
      // No real point in updating the DOM
    }

    /**
     * @function getKeywords - Returns the keywords
     * @returns {array}
     */
    const getKeywords = function () {
      return [..._keywords]
    }

    /**
     * @function addRobotDirectives - Adds the robot directives
     * @param {string|Array<string>} directives (either comma delimited or an array)
     */
    const addRobotDirectives = function (directives) {
      if (_.isArray(directives)) {
        directives.forEach(e => _robotDirectives.add(e))
      }
      else {
        directives.split(',').map(directive => {
          _robotDirectives.add(_.trim(directive))
        })
      }
      // No real point in updating the DOM
    }

    /**
     * @function getRobotDirectives - Returns the robot directives
     * @returns {array}
     */
    const getRobotDirectives = function () {
      return [..._robotDirectives]
    }

    /**
     * @function buildTitle - Builds the title tag
     * @returns {ReactElement}
     */
    const buildTitle = function () {
      return !!_title ? <title>{_title}</title> : ''
    }

    /**
     * @function buildMetaDescription - Builds the meta description tag
     * @returns {ReactElement}
     */
    const buildMetaDescription = function () {
      return !!_description ? <meta name="description"
                                    content={_description}/> : ''
    }

    /**
     * @function buildMetaKeywords - Builds the meta keywords tag
     * @returns {ReactElement}
     */
    const buildMetaKeywords = function () {
      return !_.isEmpty(_keywords)
        ? <meta name="keywords" content={getKeywords().join()}/>
        : ''
    }

    /**
     * @function buildMetaRobotDirectives - Builds the meta robots tag
     * @returns {ReactElement}
     */
    const buildMetaRobotDirectives = function () {
      return !_.isEmpty(_robotDirectives)
        ? <meta name="robots" content={[..._robotDirectives.values()].join()}/>
        : ''
    }

    return {
      setTitle,
      getTitle,
      setDescription,
      getDescription,
      addKeywords,
      getKeywords,
      addRobotDirectives,
      getRobotDirectives,
      buildTitle,
      buildMetaDescription,
      buildMetaKeywords,
      buildMetaRobotDirectives,
    }

  }

  return {

    /**
     * @param fresh
     * @returns {PageSupport}
     */
    getInstance: function (fresh) {
      if (!_instance || fresh) {
        _instance = Object.freeze(init())
      }
      return _instance
    },
  }

})()

export default PageSupport
