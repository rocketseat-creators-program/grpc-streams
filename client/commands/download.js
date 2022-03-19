const path = require('path')
const fs = require('fs')

module.exports = (client, fileName, options) => {
  let outputPath = path.resolve(__dirname, '../downloads')
  if (options.output) outputPath = path.resolve(options.output)
  fs.mkdirSync(outputPath, { recursive: true })

  const fileStream = fs.createWriteStream(path.join(outputPath, fileName), { flags: 'w+' })
  const downloadStream = client.Download({ name: fileName })

  downloadStream.on('error', (err) => {
    console.error(err.details)
    fs.unlinkSync(fileStream.path)
    process.exit(1)
  })

  downloadStream.on('data', ({ data }) => {
    fileStream.write(data)
  })

  downloadStream.on('end', () => {
    console.log('Download Concluido')
    process.exit(0)
  })
}
