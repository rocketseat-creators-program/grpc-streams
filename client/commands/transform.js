const fs = require('fs')

module.exports = (client, filePath) => {
  const serverStream = client.Transform()
  if (!fs.existsSync(filePath)) {
    console.error('Arquivo não encontrado')
    return process.exit(1)
  }

  if (fs.statSync(filePath).isDirectory()) {
    console.error('Não é possível transformar uma pasta, selecione um arquivo')
    return process.exit(1)
  }

  const fileReadStream = fs.createReadStream(filePath)
  // Envio para o servidor
  fileReadStream.on('data', (payload) => {
    serverStream.write({ data: Uint8Array.from(payload) })
  })

  // Resposta
  serverStream.on('data', (payload) => {
    process.stdout.write(payload.data.toString())
  })

  fileReadStream.on('end', () => {
    serverStream.end()
  })
}
