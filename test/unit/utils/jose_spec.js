const { expect } = require('chai')
const faker = require('faker')
const keygen = require('generate-rsa-keypair')
const { JWK } = require('node-jose')

const makeKey = pem => JWK.asKey(pem, 'pem')

const jose = require('../../../src/utils/jose')

describe('jose', () => {
  const raw = {
    iss: 'test',
    exp: faker.date.future().getTime(),
    sub: {
      test: faker.lorem.words()
    }
  }

  let encrypted
  let decrypted

  const keys = keygen()

  before((done) => {
    Promise.all([
      makeKey(keys.public),
      makeKey(keys.private)
    ])
      .then((jwKeys) => {
        const j = jose(jwKeys[1], jwKeys[0])
        j.encrypt(raw).then((enc) => {
          encrypted = enc
          j.decrypt(encrypted).then((dec) => {
            decrypted = dec
            done()
          }, done)
        }, done)
      })
  })

  it('encrypts', () => {
    expect(encrypted).to.exist
    expect(encrypted).to.be.a('string')
  })

  it('decrypts', () => {
    expect(decrypted).to.exist
    expect(decrypted).to.be.an('object')
  })

  it('decrypted version of encrypted is raw', () => {
    expect(decrypted).to.eql(raw)
  })
})
