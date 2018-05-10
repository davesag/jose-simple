const { expect } = require('chai')
const faker = require('faker')
const keygen = require('generate-rsa-keypair')
const { JWK } = require('node-jose')

const makeKey = pem => JWK.asKey(pem, 'pem')

const jose = require('../../../src/utils/jose')

describe('jose', () => {
  const keys = keygen()

  context('happy path', () => {
    const raw = {
      iss: 'test',
      exp: faker.date.future().getTime(),
      sub: {
        test: faker.lorem.words()
      }
    }

    let encrypted
    let decrypted

    before(async () => {
      const jwKeys = await Promise.all([
        makeKey(keys.public),
        makeKey(keys.private)
      ])
      const j = jose(jwKeys[1], jwKeys[0])
      encrypted = await j.encrypt(raw)
      decrypted = await j.decrypt(encrypted)
    })

    it('encrypted', () => {
      expect(encrypted).to.exist
      expect(encrypted).to.be.a('string')
    })

    it('decrypted', () => {
      expect(decrypted).to.exist
      expect(decrypted).to.be.an('object')
    })

    it('decrypted version of encrypted is raw', () => {
      expect(decrypted).to.eql(raw)
    })
  })

  context('unhappy path', () => {
    let j

    before(async () => {
      const jwKeys = await Promise.all([
        makeKey(keys.public),
        makeKey(keys.private)
      ])
      j = jose(jwKeys[1], jwKeys[0])
    })

    describe('encrypt', () => {
      context('given no input', () => {
        it('rejects', () => expect(j.encrypt()).to.be.rejected)
      })
    })

    describe('decrypt', () => {
      context('given no input', () => {
        it('rejects', () => expect(j.decrypt()).to.be.rejected)
      })
    })
  })
})
