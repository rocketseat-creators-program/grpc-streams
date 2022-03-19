#!/usr/bin/env node
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const path = require('path')
const { program } = require('commander')
const { upload, download, list, transform } = require('./commands')

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../proto/file.proto'))
const FileDefinition = grpc.loadPackageDefinition(protoObject)
const client = new FileDefinition.FileService('0.0.0.0:50051', grpc.credentials.createInsecure())

program
  .name('Cliente gRPC para manipulação de arquivos')
  .description('Permite upload, download e transformação de arquivos de texto')

program
  .command('upload <arquivo>')
  .description('Faz upload de arquivos para o servidor, se o primeiro argumento for uma pasta, todos os arquivos da pasta serão enviados')
  .action((...args) => upload(client, ...args))

program
  .command('download <arquivo>')
  .description('Faz download de arquivos para o servidor')
  .action((...args) => download(client, ...args))

program
  .command('transform <arquivo>')
  .description('Transforma um arquivo de texto para ter todas as letras maiúsculas')
  .action((...args) => transform(client, ...args))

program
  .command('list')
  .option('-t, --table', 'Exibe a saida como tabela (padrão)', true)
  .option('-j, --json', 'Exibe a saida como JSON', false)
  .option('-q, --quiet', 'Exibe apenas os nomes dos arquivos', false)
  .description('Lista todos os arquivos presentes no servidor')
  .action((...args) => list(client, ...args))

program.parse(process.argv)
