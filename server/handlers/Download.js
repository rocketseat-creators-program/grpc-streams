const fs = require('fs')
const path = require('path')

module.exports = (call) => {
  const filePath = path.resolve(__dirname, '../uploads', call.request.name)
  if (!fs.existsSync(filePath)) {
    call.emit('error', new Error('File not found'))
    return call.end()
  }

  const fileStream = fs.createReadStream(filePath)
  fileStream.on('data', (payload) => {
    call.write({
      data: Buffer.from(payload)
    })
  })

  fileStream.on('end', () => {
    call.end()
  })
}
