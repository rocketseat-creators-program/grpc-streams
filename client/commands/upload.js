const path = require('path')
const fs = require('fs')
const grpc = require('@grpc/grpc-js')

const doUpload = (client, { fileName, filePath, fileSize }) => {
  console.log(`=== Iniciando o Upload do arquivo ${fileName} com ${fileSize} bytes ===`)
  const metadata = new grpc.Metadata()
  metadata.add('filename', fileName)
  metadata.add('size', fileSize)

  const fileReadStream = fs.createReadStream(filePath)
  const uploadStream = client.Upload(metadata, (err, response) => {
    if (err) throw err
    console.log(`Resposta do servidor:`)
    console.table(response)
    return
  })

  fileReadStream.on('data', (data) => {
    uploadStream.write({ data })
  })

  fileReadStream.on('end', () => {
    console.log(`=== Upload finalizado ${fileName}: ${fileSize} bytes ===`)
    uploadStream.end()
    return
  })
}

module.exports = (client, rawPath) => {
  if (fs.statSync(rawPath).isDirectory()) {
    const files = fs.readdirSync(rawPath)

    files.forEach(file => {
      const filePath = path.join(rawPath, file)
      const fileSize = fs.statSync(filePath).size
      console.log(filePath)
      doUpload(client, { fileName: file, filePath, fileSize })
    })
    return
  }

  doUpload(client, { fileName: rawPath.split(path.sep).pop(), filePath: rawPath, fileSize: fs.statSync(rawPath).size })
}
