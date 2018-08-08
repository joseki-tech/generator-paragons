import * as React from "react"
import Bar from "./Bar";
import PurePage from '../../PurePage'

/**
 * FooPage
 * @memberOf Demos
 */

class FooPage extends PurePage {

    constructor(props, context) {
        super(props, context, 'Foo')
    }

    render() {
        return <Bar/>
    }

}

export default FooPage
