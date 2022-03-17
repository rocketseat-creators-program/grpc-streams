const fs = require('fs/promises')
const grpc = require('@grpc/grpc-js')
const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const { Upload, Download, Transform } = require('./handlers')

const protoPath = path.resolve(__dirname, '../proto')

async function main () {
  const packageDefinition = await protoLoader.load(path.join(protoPath, 'file.proto'))
  const FileDefinition = grpc.loadPackageDefinition(packageDefinition)
  await fs.mkdir(path.resolve(__dirname, './uploads'), { recursive: true })

  const server = new grpc.Server()
  server.addService(FileDefinition.FileService.service, { Upload, Download, Transform })
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
    console.log(`Servidor online na porta 50051`)
  })
}

main()
  .then(console.log)
  .catch(console.error)
