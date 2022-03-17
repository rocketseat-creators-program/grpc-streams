const fs = require('fs')
const path = require('path')

module.exports = async (_, callback) => {
  const filesDir = path.resolve(__dirname, '../uploads')
  const files = fs.readdirSync(filesDir)
  return callback(null, {
    files: files.map((file) => ({
      name: file,
      type: file.split('.').pop(),
      size: fs.statSync(path.join(filesDir, file)).size
    }))
  })

}
