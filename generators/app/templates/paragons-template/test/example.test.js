import React from 'react'
import Enzyme, {render} from 'enzyme'
import Bar from "../src/shared/demo/components/Bar"
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe('Example Test Suite', () => {

    test('should be big', () => {
        const wrapper = render(<Bar/>)
        console.log(wrapper.text())
        expect(wrapper.text()).toBe('IM BIG!')
    })

})