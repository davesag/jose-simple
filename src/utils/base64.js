const encodeBuffer = buffer => buffer.toString('base64')
const encodeString = string => encodeBuffer(new Buffer(string))
const encodeData = data => encodeString(JSON.stringify(data))

const encode = (data) => {
  if (Buffer.isBuffer(data)) return encodeBuffer(data)
  if (typeof data === 'string') return encodeString(data)
  return encodeData(data)
}

const decode = (string) => {
  const decoded = new Buffer(string, 'base64').toString()
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
