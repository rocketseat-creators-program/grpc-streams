// const transformStream = client.Transform()
// const fileReadStream = fs.createReadStream(path.resolve(uploadDir, './fausto.txt'))
// fileReadStream.on('data', (payload) => {
//   transformStream.write({ data: Uint8Array.from(payload) })
// })

// transformStream.on('data', (payload) => {
//   console.log('Server response:', payload.data.toString())
// })

// fileReadStream.on('end', () => {
//   transformStream.end()
// })

module.exports = (client, path) => {
  console.log(`Transform: ${client, path}`)

}
