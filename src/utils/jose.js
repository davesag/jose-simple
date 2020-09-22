const { JWE } = require('node-jose')
const { encode, decode } = require('./base64')

/**
 *  Returns a pair of JOSE encrypter / decrypter functions.
 *
 *  @param privateKey — The private key used to decrypt
 *  @param publicKey — The public key used to encrypt
 *  @param options — Optional options passed on to the encrypter (see [`node-jose#encrypt`](https://github.com/cisco/node-jose/blob/master/lib/jwe/encrypt.js#L660-L668))
 *  @returns An object containing `encrypt` and `decrypt` functions.
 */
const jose = (privateKey, publicKey, options = {}) => {
  /**
   *  Encrypts the supplied data into JOSE format using the curried publicKey
   *
   *  @param {object} raw — The raw data toto encrypt
   *  @returns {string} The encrypted data as a JOSE encoded string.
   */
  const encrypt = async raw => {
    if (!raw) throw new Error('Missing raw data.')
    const buffer = Buffer.from(JSON.stringify(raw))
    const encrypted = await JWE.createEncrypt(options, publicKey).update(buffer).final()
    return encode(encrypted)
  }

  /**
   *  Decrypts the JOSE formated encrypted data using the curried privateKey
   *
   *  @param {string} encrypted — The encrypted data
   *  @returns {object} The original unencrypted data
   */
  const decrypt = async encrypted => {
    if (!encrypted) throw new Error('Missing encrypted data.')
    const decoded = decode(encrypted)
    const { payload } = await JWE.createDecrypt(privateKey).decrypt(decoded)
    return JSON.parse(payload)
  }

  return { encrypt, decrypt }
}

module.exports = jose
