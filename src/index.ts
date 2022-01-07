import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

import { deletar, editar, item, lista, nova, usuario } from './firebase'
import { acao } from '../../interface/modulos/variaveis'

var credenciais = express()

credenciais.use(cors());

credenciais.get('/', async (req: any, res: any) => {

  console.log(acao.itemNovo)
  console.log(acao)

  res.status(200).send(`Sucesso`);

})

credenciais.post('/credenciais', async (req: any, res: any) => {

  const dadosCliente = req.body
  console.log(dadosCliente)
  console.log(acao)

  switch (dadosCliente.acao) {

    case 'usuario':
      res.status(200).send(await usuario('usuario', dadosCliente.chave)); break;

    case 'nova':
      res.status(200).send(await nova(dadosCliente)); break;

    case 'editar':
      res.status(200).send(await editar(dadosCliente)); break;

    case 'update':
      res.status(200).send(await editar(dadosCliente)); break;

    case 'item':
      res.status(200).send(await item(dadosCliente)); break;

    case 'lista':
      res.status(200).send(await lista(dadosCliente)); break;

    case 'deletar':
      res.status(200).send(await deletar(dadosCliente)); break;

    default:
      const erro = `Ação não encontrada: ${dadosCliente.acao}`
      console.log(erro)
      res.status(200).send(erro)
      break;
  };

})

credenciais.use(function (req, res, next) {
  res.status(404).send('Desculpe Url não encontrada!');
});

exports.credenciais = functions.https.onRequest(credenciais)