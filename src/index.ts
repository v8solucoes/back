import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
/* import * as pug from 'pug'; */

import { Request, Response } from 'express';
import { criarLote, deletar, editar, pegar, listar, novo, usuario } from './servico-credenciais/firebase'
import { criarApresentador } from './servico-apresentador/apresentador'

import { acao } from '../../interface/variaveis'

var credenciais = express()

credenciais.use(cors());
credenciais.set('view engine', 'pug')
credenciais.set('views', './src/views')

credenciais.get('/', async (req: Request, res: Response) => {

  console.log('Iniciado Home Service')
  criarLote()

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render('index', { title: 'Api', message: 'Home', data: criarApresentador('teste','testes')});

})

credenciais.get('/apresentador', async (req: Request, res: Response) => {

  console.log('Apresentador')

  res.render('index', { title: 'Api', message: 'Apresentador'});

})

credenciais.post('/credenciais', async (req: Request, res: Response) => {

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