const { expect } = require('chai')
const faker = require('faker')
const keygen = require('./keygen.js')
const { JWK } = require('node-jose')

const jose = require('../../../src/utils/jose')

const makeKey = async pem => JWK.asKey(pem, 'pem')

describe('jose', () => {
  let privateKey
  let publicKey
  let j

  before(async () => {
    const keys = await keygen()
    privateKey = await makeKey(keys.privateKey)
    publicKey = await makeKey(keys.publicKey)
  })

  const doTests = () => {
    const raw = {
      iss: 'test',
      exp: faker.date.future().getTime(),
      sub: {
        test: faker.lorem.words()
      }
    }

    context('happy path', () => {
      let encrypted
      let decrypted

      before(async () => {
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
      describe('encrypt', () => {
        context('given no input', () => {
          it('rejects', () =>
            expect(j.encrypt()).to.be.rejectedWith('Missing raw data.'))
        })
      })

      describe('decrypt', () => {
        context('given no input', () => {
          it('rejects', () =>
            expect(j.decrypt()).to.be.rejectedWith('Missing encrypted data.'))
        })
      })
    })
  }

  context('without options', () => {
    before(() => {
      j = jose(privateKey, publicKey)
    })

    doTests()
  })

  context('with options', () => {
    before(() => {
      j = jose(privateKey, publicKey, { format: 'compact' })
    })

    doTests()
  })
})
