import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { Funcao_Modelo } from '../src/imports'
import { RequisicaoDados } from "../../construtor/src/construtor/11-credencial/credencial.interface";

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

credenciais.post("/api",

  async (req: express.Request, res: express.Response) => {

    console.log(req.body)
    
    const requisicao = req.body as RequisicaoDados
    const funcao = requisicao.credencial.requisicao.funcao
    
    try {
     
      const funcoes = await new Funcao_Modelo(requisicao)[funcao]
      res.json(funcoes);

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
