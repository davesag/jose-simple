const encodeBuffer = buffer => buffer.toString('base64')
const encodeString = string => encodeBuffer(Buffer.from(string))
const encodeData = data => encodeString(JSON.stringify(data))

/**
 *  Encodes the supplied buffer, string, or object into a base64 string.
 *
 *  @param {buffer|string|object} data — The data to encode
 *  @returns {string} A base64 encoded string
 */
const encode = data => {
  if (Buffer.isBuffer(data)) return encodeBuffer(data)
  if (typeof data === 'string') return encodeString(data)
  return encodeData(data)
}

/**
 *  Decodes a previously encoded string into an object if it can, otherwise just a string.
 *
 *  @param {string} string — The base64 encoded string to decode
 *  @returns {object|string} The decoded and JSON parsed object, or just a string.
 */
const decode = string => {
  const decoded = Buffer.from(string, 'base64').toString()
  try {
    return JSON.parse(decoded)
  } catch (_err) {
    return decoded
  }
}

module.exports = {
  encode,
  decode
}
