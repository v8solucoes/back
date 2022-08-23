import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
<<<<<<< HEAD
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
=======
import { ValidatorsRemote } from "../../domain/src/shared/validator-remote";
import { TestCompose } from "../../domain/src/shared/validator-local";
import { Module } from "../../domain/src/shared/modules";
import { Irequest } from "@domain/interface";
>>>>>>> c1975bb74658e1fc7c0002ed411f752bf7f47228

var credenciais = express();

credenciais.use(cors());
credenciais.set("view engine", "pug");
credenciais.set("views", "./src/views");

var testRequest = (req: express.Request, res: express.Response, next: express.NextFunction)=> {
  const request: Irequest = req.body as Irequest
  const test = new TestCompose(request).testRequest
  console.clear
  if (test == null) {
    console.log('REQUEST Aprovated');
    next();
   
  } else {
    console.log('REQUEST Reprovated');
    /* next(); */
    res.json(test);
 }
  
};

credenciais.use(testRequest);

credenciais.get("/", async (req: express.Request, res: express.Response) => {

  console.log("Iniciado Home Service");

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render("index", {
    title: "Api",
    message: "Home"
  });
});

credenciais.post("/CRUD",

  async (req: express.Request, res: express.Response) => {
    console.clear
      
    const request: Irequest = req.body as Irequest

    console.group('REQUEST =============================')
    console.log(request)
        
    try {

      const response = await new Module(request).accountAdm.create()
      console.log('RESPONSE ============================')
      console.log(response)
      console.groupEnd()
      res.json(response);

    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor / CRUD",
        message: error,
      });
    }
  }
);

credenciais.post("/validator",

  async (req: express.Request, res: express.Response) => {     

    const request: Irequest = req.body as Irequest
    console.clear()
    console.log('REQUEST: Validator ================')
    console.log(request)

    try {
     
      const response = await new ValidatorsRemote(request)[request.validator!.name].validateAsync
      console.log('RESPONSE: Validator ================')  
      console.log(response)
      res.json(response);
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor Validator",
        message: error,
      });
    }
  }
);


credenciais.use(function (req, res, next) {
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciais = functions.https.onRequest(credenciais);
