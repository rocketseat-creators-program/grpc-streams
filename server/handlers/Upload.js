const fs = require('fs')
const path = require('path')

module.exports = (request, response) => {
  const fileName = request.metadata.get('filename').toString()
  const filePath = path.resolve(__dirname, '../uploads', fileName)
  const writeStream = fs.createWriteStream(filePath, { flags: 'w' })
  let bytesWritten = 0

  request.on('data', (payload) => {
    writeStream.write(payload.data)
    bytesWritten += payload.data.length
  })

  request.on('end', () => {
    response(null, {
      name: fileName,
      type: fileName.split('.').pop(),
      size: bytesWritten
    })
  })
}
