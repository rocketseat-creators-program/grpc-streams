// const downloadStream = client.Download({ name: 'blog.html' }, (err, response) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log('Server response:', response)
// })

// downloadStream.on('data', (payload) => {
//   console.log('Server response:', payload)
// })

// downloadStream.on('end', () => {
//   console.log('Server response:', 'File download finished')
// })

module.exports = (client, path) => {
}
