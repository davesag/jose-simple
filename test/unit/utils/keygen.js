const { promisify } = require('util')
const crypto = require('crypto')

const generateKeyPair = promisify(crypto.generateKeyPair)

const defaultPublicEncoding = { type: 'spki', format: 'pem' }
const defaultPrivateEncoding = { ...defaultPublicEncoding, type: 'pkcs8' }

const keygen = async ({
  modulusLength = 4096,
  publicKeyEncoding = defaultPublicEncoding,
  privateKeyEncoding = defaultPrivateEncoding
} = {}) =>
  generateKeyPair('rsa', {
    modulusLength,
    publicKeyEncoding,
    privateKeyEncoding
  })

module.exports = keygen
