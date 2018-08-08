import * as React from 'react'
import * as _ from 'lodash'
import PageSupport from './PageSupport'
// import { hot } from 'react-hot-loader'

/**
 * If you consider yourself a page then extend me and you can easily set the
 * title, description, and keywords.
 *
 * @abstract
 * @see PageSupport
 */
class PurePage extends React.PureComponent {

  /**
   * Thought that components on sister routes would be cached under react-router v4 as they were under v3. That is
   * the constructors would NOT be called when bouncing between them (after their initial creation) and only
   * componentDidMount would be invoked. However, it appears under v4 that that the components are getting construct
   * and destructed. So for now let's just handle the page support from the constructor.
   */
  constructor (props, context, title, description, keywords) {
    super(props, context)

    const pageSupport = PageSupport.getInstance()

    if (!!title)
      pageSupport.setTitle(title)
    if (!!description)
      pageSupport.setDescription(description)
    if (!_.isEmpty(keywords))
      pageSupport.addKeywords(keywords)
  }

  render () {
    return 'You extended PurePage but, forgot to implement the render method!'
  }

}

export default PurePage
