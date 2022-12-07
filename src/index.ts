import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { ValidatorsRemote } from "../../domain/src/shared/validator-remote";
import { Controllers } from './../../domain/src/domain/controllers/controllers';
import { Irequest } from "@domain/interface";
import { testRequestPost, testPostDocument, testRequestGet, securityGetColection, testRequestGetDocument, securityGetDocument } from "./test/test";
import { Firebase } from "../../domain/src/domain/api/firebase";

var credenciais = express();

credenciais.use(cors({ 'origin': '*' }));
/* credenciais.use(cors({ 'origin': ['http://localhost:4200',] })); */

credenciais.get("/colection/:token/:request",
  cors(), testRequestGet, securityGetColection
);

credenciais.get("/document/:token/:request",
  cors(), testRequestGetDocument, securityGetDocument
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
credenciais.post("/crudGeneric", cors(), testRequestPost, testPostDocument,

  async (req: express.Request, res: express.Response) => {

    console.clear()
    console.log('CrudGeneric =============================')
    const request: Irequest = req.body as Irequest

    try {

      return await new Controllers(request).account_adm.create().then(
        response => {

          console.log('RESPONSE CRUD ============================')
          console.log(JSON.stringify(response))

          res.json({response});

        }
      )

    } catch (error) {
      res.json(error);
    }
  }
);
credenciais.post("/CRUD", cors(), testRequestPost, testPostDocument,

  async (req: express.Request, res: express.Response) => {

    console.clear()

    const request: Irequest = req.body as Irequest

    console.log('REQUEST CRUD =============================')
    /*  console.log(req.baseUrl)
     console.log(request) */

    try {

      return await new Controllers(request).account_adm.create().then(
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

/*     console.log('REQ')
    console.log(req) */
    const token = req.params['token'] as string
    const request = req.params['request'] as any
    
    console.clear()

    try {

      console.log('REQUEST: Login ================')
      const response = await Firebase.userPermissionAndModelAsync(token,JSON.parse(request))
      console.log('Response: Login ================')
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
