// for (const file of localFileList) {
//   const filePath = path.resolve(uploadDir, file)
//   const fileSize = fs.statSync(filePath).size
//   const metadata = new grpc.Metadata()
//   metadata.add('filename', file)
//   metadata.add('size', fileSize)

//   const fileReadStream = fs.createReadStream(filePath)
//   const uploadStream = client.Upload(metadata, (err, response) => {
//     if (err) throw err
//     console.log(response)
//   })

//   fileReadStream.on('data', (data) => {
//     uploadStream.write({ data })
//   })

//   fileReadStream.on('end', () => {
//     console.log(`Upload finalizado ${file}: `, fileSize)
//     uploadStream.end()
//   })
// }

module.exports = (client, path) => {
  console.log(`Upload: ${client, path}`)

}
