module.exports = (request) => {
  request.on('data', (payload) => {
    const { data } = payload
    const text = data.toString()
    if (typeof text === 'string') {
      request.write({ data: Uint8Array.from(Buffer.from(text.toUpperCase())) })
    }
  })

  request.on('end', () => {
    request.end()
  })
}
