import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
<<<<<<< HEAD
import { deletar, editar, pegar, listar, novo, usuario } from './servico-credenciais/firebase'
import { ModeloRequisicao } from "./index-modulo";
import { Request, Response } from 'express';
import { acao } from './servico-credenciais/variaveis'
import { Funcoes } from '../../construtor/src/funcoes/back/funcoes'
import { Requisicao, Resposta } from "../../construtor/src/construtor/interface/interface";
=======
import { ValidatorsBack } from "../../domain/src/shared/validator-back";
import { FunctionsBack } from "../../domain/src/shared/functions-back";
import { Irequest, IValidatorRequest } from "@domain/interface";

>>>>>>> 4e243a23b8ddfd0e9639b13bd5f48bf98cd00d5b

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

<<<<<<< HEAD
credenciais.get("/criar-modelo",
=======
credenciais.post("/CRUD",
>>>>>>> 4e243a23b8ddfd0e9639b13bd5f48bf98cd00d5b

//   async (req: express.Request, res: express.Response) => {

 /*    const requisicao: Requisicao = {
    'credencial': credencial,
    'dados' : modelo_Dados
    } */

    try {
   /*    const resposta = await new ModeloRequisicao().crud(requisicao) */
  
      res.json('resposta');
      
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor",
        message: error,
      });
    }
  }
);
credenciais.post("/funcao",

<<<<<<< HEAD
  async (req: express.Request, res: express.Response) => {
    
    const requisicao = req.body as Requisicao
    const nomeFuncao = requisicao.credencial.requisicao.funcao
    const funcoes = new Funcoes(requisicao)
    
    try {
     
      const resposta = await funcoes[nomeFuncao]
  
      res.json(resposta as Resposta);
      
=======
    const request: Irequest = req.body as Irequest

    console.log('REQUEST =============================')
    console.log(request)
        
    try {

      const response = await new FunctionsBack(request).accountAdm.create
      console.log('RESPONSE ============================')
      console.log(response)
      res.json(response);


>>>>>>> 4e243a23b8ddfd0e9639b13bd5f48bf98cd00d5b
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor / CRUD",
        message: error,
      });
    }
  }
);
<<<<<<< HEAD
credenciais.post("/cadastrar",

=======
credenciais.post("/validator",
>>>>>>> 4e243a23b8ddfd0e9639b13bd5f48bf98cd00d5b
  async (req: express.Request, res: express.Response) => {
 
    const requisicao = req.body as Requisicao

<<<<<<< HEAD
    try {
      const resposta = await new ModeloRequisicao().crud(requisicao)
  
      res.json(resposta as Resposta);
      
=======
    const request: Irequest = req.body as Irequest
    const validator = req.body.validator as IValidatorRequest

    console.log('Validator')
    console.log(request)

    try {
     
      const response = await new ValidatorsBack(validator)[validator.nameValidator].validateAsync
      console.log(response)
      res.json(response);

>>>>>>> 4e243a23b8ddfd0e9639b13bd5f48bf98cd00d5b
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
