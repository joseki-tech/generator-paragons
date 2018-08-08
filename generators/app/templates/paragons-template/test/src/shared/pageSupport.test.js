import React from 'react'
import PageSupport from '../../../src/shared/PageSupport'
import * as _ from 'lodash'

describe('Page Support Test Suite', () => {

  test('should round trip title', () => {
    const title = 'my crazy title'
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.setTitle(title)
    expect(pageSupport.getTitle()).toEqual(title)
  })

  test('should round trip description', () => {
    const description = 'my crazy description'
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.setDescription(description)
    expect(pageSupport.getDescription()).toEqual(description)
  })

  test('should round trip keywords', () => {
    const keywords = ['dog', 'cat']
    const someMoreKeywords = 'good, bad, ugly'
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.addKeywords(keywords)
    pageSupport.addKeywords(someMoreKeywords)
    const expecting = []
    expecting.push(...keywords)
    someMoreKeywords.split(',').map(keyword => expecting.push(_.trim(keyword)))
    expect(pageSupport.getKeywords()).toEqual(expecting)
  })

  test('unique keywords', () => {
    const keywords = ['dog', 'cat']
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.addKeywords(keywords)
    var key = pageSupport.getKeywords()
    expect(pageSupport.getKeywords()).toEqual(keywords)
    pageSupport.addKeywords(keywords) // add them again
    expect(pageSupport.getKeywords()).toEqual(keywords)
  })

  test('build keywords meta tag', () => {
    const keywords = ['dog', 'cat']
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.addKeywords(keywords)
    expect(pageSupport.buildMetaKeywords()).toEqual(<meta content="dog,cat" name="keywords"/>)
  })

  test('build robot meta tag', () => {
    const keywords = ['dog', 'cat']
    const pageSupport = PageSupport.getInstance(true)
    pageSupport.addRobotDirectives(keywords)
    expect(pageSupport.buildMetaRobotDirectives()).toEqual(<meta content="dog,cat" name="robots"/>)
  })

})
