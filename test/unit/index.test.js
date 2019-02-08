const { expect } = require('chai')

const jose = require('../../')

describe('index', () => {
  it('exports a function', () => {
    expect(jose).to.be.a('function')
  })
})
