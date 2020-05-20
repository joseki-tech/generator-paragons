import * as React from 'react'

/**
 * A protected page(route secured) which induces a login unless the user is
 * already authenticated.
 */
class SecurePage extends React.Component {

  render () {
    return 'Well look who has the keys to the castle!'
  }

}

export default SecurePage
