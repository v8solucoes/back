import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { ValidatorsRemote } from "../../domain/src/shared/validator-remote";
import { Documents } from "../../domain/src/shared/modules";
import { Irequest } from "@domain/interface";
import { testRequestPost, testDocument, testRequestGet } from "./test/test";
import { Firebase } from "../../domain/src/domain/api/firebase";

var credenciais = express();

credenciais.use(cors({ 'origin': '*' }));
/* credenciais.use(cors({ 'origin': ['http://localhost:4200',] })); */
credenciais.get("/colection/:token/:request", cors(), testRequestGet,

  async (req: express.Request, res: express.Response) => {

    const token = req.params['token'] as string
    const request = req.params['request'] as any
    
    console.clear()

    console.log('REQUEST: Colection ================')

    try {

      const response = await Firebase.colection(token,JSON.parse(request))
      console.log('RESPONSE: Colection ================')
      console.log(response)
      res.json(response);
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor Login",
        message: error,
      });
    }
  }
);

credenciais.get("/", async (req: express.Request, res: express.Response) => {

  console.log("Iniciado Home Service");

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render("index", {
    title: "Api",
    message: "Home"
  });
});

credenciais.post("/CRUD", cors(), testRequestPost, testDocument,

  async (req: express.Request, res: express.Response) => {

    console.clear()

    const request: Irequest = req.body as Irequest

    console.log('REQUEST CRUD =============================')
    /*  console.log(req.baseUrl)
     console.log(request) */

    try {

      return await new Documents(request).account_adm.create().then(
        response => {

          console.log('RESPONSE CRUD ============================')
          console.log(JSON.stringify(response))

          res.json(response);

        }
      )

    } catch (error) {
      res.json(error);
    }
  }
);

credenciais.get("/user/:token/:request", cors(), testRequestGet,

  async (req: express.Request, res: express.Response) => {

    console.log('REQ')
    console.log(req)
    const token = req.params['token'] as string
    const request = req.params['request'] as any
    
    console.clear()

    console.log('REQUEST: Login ================')

    try {

      const response = await Firebase.userPermissionAndModelAsync(token,JSON.parse(request))
      console.log('RESPONSE: Login ================')
      console.log(response)
      res.json(response);
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor Login",
        message: error,
      });
    }
  }
);

credenciais.post("/validator", cors(), testRequestPost,

  async (req: express.Request, res: express.Response) => {

    const request: Irequest = req.body as Irequest
    console.clear()
    console.log('REQUEST: Validator ================')
    /*  console.log(request) */

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
