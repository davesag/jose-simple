const encodeBuffer = buffer => buffer.toString('base64')
const encodeString = string => encodeBuffer(Buffer.from(string))
const encodeData = data => encodeString(JSON.stringify(data))

const encode = data => {
  if (Buffer.isBuffer(data)) return encodeBuffer(data)
  if (typeof data === 'string') return encodeString(data)
  return encodeData(data)
}

const decode = string => {
  const decoded = Buffer.from(string, 'base64').toString()
  try {
    return JSON.parse(decoded)
  } catch (e) {
    return decoded
  }
}

module.exports = {
  encode,
  decode
}
