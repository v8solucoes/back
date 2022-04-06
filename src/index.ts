import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import { ModeloRequisicao } from "./index-modulo";
import { Requisicao } from "../../construtor/src/construtor/requisicao/requisicao.interface";

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

credenciais.get("/criar-dados",

  async (req: express.Request, res: express.Response) => {
 
  /*   const requisicao: Requisicao = {
      credencial: dados_Dados.usuarioAdm.credencial,
      dados: dados_Dados
    } */

    

    try {
   /*    const resposta = await new ModeloRequisicao().crud(requisicao)
      res.json(resposta); */
/*       req.headers.host */

      res.json({
        'origem':` ${req.headers.host}`,
      });
   
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor",
        message: error,
      });
    }
  }
);

credenciais.post(
  "/credenciais",
  async (req: express.Request, res: express.Response) => {
   
    /* const requisicao: Requisicao = req.body; */
    const requisicao: Requisicao = req.body

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

credenciais.use(function (req, res, next) {
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciais = functions.https.onRequest(credenciais);
