const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const fs = require('fs')

async function main () {
  const uploadDir = path.resolve(__dirname, './uploads')
  const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/file.proto'))
  const FileDefinition = grpc.loadPackageDefinition(protoObject)
  const client = new FileDefinition.FileService('0.0.0.0:50051', grpc.credentials.createInsecure())

  const fileList = fs.readdirSync(uploadDir)

  for (const file of fileList) {
    const filePath = path.resolve(uploadDir, file)
    const fileSize = fs.statSync(filePath).size
    const metadata = new grpc.Metadata()
    metadata.add('filename', file)
    metadata.add('size', fileSize)

    const fileReadStream = fs.createReadStream(filePath)
    const uploadStream = client.Upload(metadata, (err, response) => {
      if (err) throw err
      console.log(response)
    })

    fileReadStream.on('data', (data) => {
      uploadStream.write({ data })
    })

    fileReadStream.on('end', () => {
      console.log(`Upload finalizado ${file}: `, fileSize)
      uploadStream.end()
    })
  }
}

main().then(() => {
}).catch(console.error)
