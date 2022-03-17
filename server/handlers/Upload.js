const fs = require('fs')
const path = require('path')

module.exports = (request, callback) => {
  const fileName = request.metadata.get('filename').toString()
  const writeStream = fs.createWriteStream(path.resolve(__dirname, '../uploads', fileName), { flags: 'w' })
  let bytesWritten = 0
  request.on('data', (payload) => {
    writeStream.write(payload.data)
    bytesWritten += payload.data.length
  })


  request.on('end', () => {
    callback(null, {
      name: fileName,
      type: fileName.split('.').pop(),
      size: bytesWritten
    })
  })
}
