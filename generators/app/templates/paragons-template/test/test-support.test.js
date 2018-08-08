import {load, loadJSON, saveJSON} from "../src/test/test-support"

describe('Test Support Test Suite', () => {

    test('load', () => {
        const content = load('test.txt')
        expect(content).toEqual('hello world!')
    })

    test('save json', () => {
        saveJSON({foo: 'bar'}, 'test')
    })

    test('load json', done => {
        const json = loadJSON('test')
            .then((json) => {
                expect(json).toEqual({foo: 'bar'})
                done()
            })
    })

})