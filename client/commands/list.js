module.exports = (client, options) => {
  client.ListFiles({}, (err, response) => {
    if (err) {
      console.error(err)
      return
    }

    if (!response.files) return console.log('Nenhum arquivo encontrado')

    if (options.quiet) {
      console.log(response.files.map(file => file.name).join('\n'))
      return
    }

    if (options.json) {
      console.log(JSON.stringify(response.files))
      return
    }

    if (options.table) {
      console.table(response.files.map((file) => ({
        Nome: file.name,
        Tipo: file.type,
        Tamanho: Math.ceil(file.size / 1024) + ' Kb'
      })))
      return
    }
  })
}
