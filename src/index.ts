import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { deletar, editar, pegar, listar, novo, usuario } from './servico-credenciais/firebase'
import { ModeloRequisicao } from "./index-modulo";
import { Requisicao } from "../../construtor/src/construtor/requisicao/requisicao.interface";
import { Request, Response } from 'express';
import { acao } from './servico-credenciais/variaveis'
var credenciais = express();

credenciais.use(cors());
credenciais.set("view engine", "pug");
credenciais.set("views", "./src/views");

credenciais.get("/", async (req: express.Request, res: express.Response) => {

  console.log("Iniciado Home Service");

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render("index", {
    title: "Api",
    message: "Home"
  });
});

credenciais.post("/cadastrar",

  async (req: express.Request, res: express.Response) => {
 
    const requisicao = req.body as Requisicao

    try {
      const resposta = await new ModeloRequisicao().crud(requisicao)
  
      res.json(resposta);
      
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor",
        message: error,
      });
    }
  }
);

credenciais.post('/credenciais', async (req: Request, res: Response) => {

  const dadosCliente = req.body as any
  console.log(dadosCliente)

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
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciais = functions.https.onRequest(credenciais);
