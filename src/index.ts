import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { ValidatorsBack } from "../../library-shared/src/shared/validator-back";
import { FunctionsBack } from "../../library-shared/src/shared/functions-back";
import { Irequest, IValidatorRequest } from "@shared-library/interface";


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

      const response = await new FunctionsBack(request).accountAdm.create
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
    const validator = req.body.validator as IValidatorRequest

    console.log('Validator')
    console.log(request)

    try {
     
      const response = await new ValidatorsBack(validator)[validator.nameValidator].validateAsync
      console.log(response)
      res.json(response);

    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor / Validator",
        message: error,
      });
    }
  }
);

credenciais.use(function (req, res, next) {
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciais = functions.https.onRequest(credenciais);
