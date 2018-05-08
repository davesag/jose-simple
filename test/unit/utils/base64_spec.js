const { expect } = require('chai')
const faker = require('faker')

const { encode, decode } = require('../../../src/utils/base64')

describe('base64', () => {
  describe('encode', () => {
    context('given a string', () => {
      const raw = faker.lorem.words()
      const original = `${raw}`

      it('encodes without altering the original string', () => {
        expect(encode(raw)).to.exist
        expect(raw).to.equal(original)
      })
    })

    context('given a buffer', () => {
      const raw = Buffer.from(faker.lorem.words())

      it('encodes', () => {
        expect(encode(raw)).to.exist
      })
    })

    context('given an object', () => {
      const raw = { test: faker.lorem.words() }

      it('encodes', () => {
        expect(encode(raw)).to.exist
      })
    })
  })

  describe('decode', () => {
    context('given an encoded string', () => {
      const raw = {
        test: 'this is a test'
      }
      const encoded = encode(raw)
      const original = `${encoded}`

      it('decodes without altering the original string', () => {
        expect(decode(encoded)).to.eql(raw)
        expect(encoded).to.equal(original)
      })
    })

    context('given any old string', () => {
      const raw = 'not a json string'
      const encoded = encode(raw)
      const original = `${encoded}`

      it('decodes without altering the original string', () => {
        expect(decode(encoded)).to.eql(raw)
        expect(encoded).to.equal(encoded)
      })
    })
  })
})
