import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'

import { deletar, editar, pegar, listar, novo, usuario } from './firebase'
import { acao } from '../../interface/variaveis'

var credenciais = express()

credenciais.use(cors());

credenciais.get('/', async (req: any, res: any) => {

  console.log(acao.novo)
  console.log(acao)

  res.status(200).send(`Sucesso`);

})

credenciais.post('/credenciais', async (req: any, res: any) => {

  const dadosCliente = req.body
  console.log(dadosCliente)
  console.log(acao)

  switch (dadosCliente.acao) {

    case  acao.usuario : res.send(await usuario('usuario', dadosCliente.chave)); break;

    case acao.novo  : res.send(await novo(dadosCliente)); break;

    case acao.editar: res.send(await editar(dadosCliente)); break;

    case acao.pegar : res.send(await pegar(dadosCliente)); break;

    case acao.listar: res.send(await listar(dadosCliente)); break;

    case acao.deletar: res.send(await deletar(dadosCliente)); break;

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