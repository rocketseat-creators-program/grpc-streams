const fs = require('fs')

module.exports = (client, filePath) => {
  const transformStream = client.Transform()
  if (!fs.existsSync(filePath)) {
    console.error('Arquivo não encontrado')
    return process.exit(1)
  }

  const fileReadStream = fs.createReadStream(filePath)
  fileReadStream.on('data', (payload) => {
    transformStream.write({ data: Uint8Array.from(payload) })
  })

  transformStream.on('data', (payload) => {
    process.stdout.write(payload.data.toString())
  })

  fileReadStream.on('end', () => {
    transformStream.end()
  })
}
