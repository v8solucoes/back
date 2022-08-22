import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { ValidatorsRemote } from "../../library-shared/src/shared/validator-remote";
import { Module } from "../../library-shared/src/shared/modules";
import { Irequest } from "@shared-library/interface";

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


credenciais.post("/CRUD",

  async (req: express.Request, res: express.Response) => {
      
    const request: Irequest = req.body as Irequest

    console.log('REQUEST =============================')
    console.log(request)
        
    try {

      const response = await new Module(request).accountAdm.create()
      console.log('RESPONSE ============================')
      console.log(response)
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
