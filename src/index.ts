/* import * as functions from "firebase-functions"; */
const {onRequest} = require("firebase-functions/v2/https");
import * as express from "express";
import * as cors from "cors";
import { ValidatorsRemote } from "../../domain/src/shared/validator-remote";
import { Controllers } from './../../domain/src/domain/controllers/controllers';
import { Irequest } from "@domain/interface";
import { testRequestPost, testPostDocument, testRequestGet, securityGetColection, testRequestGetDocument, securityGetDocument } from "./test/test";
import { Firebase } from "../../domain/src/domain/api/firebase";
import { _debugBack } from "../../domain/src/domain/repository/debug";

var credenciaisSecondGen = express();

credenciaisSecondGen.use(cors({ 'origin': '*' }));
/* credenciais.use(cors({ 'origin': ['http://localhost:4200',] })); */

credenciaisSecondGen.get("/colection/:token/:request", testRequestGet, securityGetColection
);

credenciaisSecondGen.get("/document/:token/:request", testRequestGetDocument, securityGetDocument
);

credenciaisSecondGen.get("/", async (req: express.Request, res: express.Response) => {

  console.log("Iniciado Home Service");

  res.json({ message: 'hello world with Typescript' })
  /* response.sendfile('index.html'); */

/*   res.render("index", {
    title: "Api",
    message: "Home"
  }); */
});
credenciaisSecondGen.post("/crudGeneric", testRequestPost, testPostDocument,

  async (req: express.Request, res: express.Response) => {

   /*  console.clear() */
    console.log('CrudGeneric =============================')
    const request: Irequest = req.body as Irequest
    
    try {
      
    /*   console.log('TRY  =============================') */
      return await new Controllers(request)[request.document][request.action]().then(
        response => {

          console.log('RESPONSE CRUD ============================')
          console.log(JSON.stringify(response))

          res.json({response});

        }
      )

    } catch (error) {
      console.log('RESPONSE CRUD ERROR ============================')
      res.json({error});
    }
  }
);
/* credenciais.post("/CRUD", cors(), testRequestPost, testPostDocument,

  async (req: express.Request, res: express.Response) => {

    console.clear()

    const request: Irequest = req.body as Irequest

    console.log('REQUEST CRUD =============================')

    try {

      return await new Controllers(request)[request.document][request.action]().then(
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
); */

credenciaisSecondGen.get("/user/:token/:request", testRequestGet,

  async (req: express.Request, res: express.Response) => {

    const token = req.params['token'] as string
    const request = req.params['request'] as any

    if(_debugBack.login) {
      console.log('REQUEST: Login ===================================================')
      console.log(request)
    }
    
    console.clear()

    try {
      const response = await Firebase.userPermissionAndModelAsync(token,JSON.parse(request))

      if(_debugBack.login) {
      console.log('RESPONSE: Login ====================================================')
      console.log(response)
      }

      res.json(response);
    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor Login",
        message: error,
      });
    }
  }
);

credenciaisSecondGen.post("/validator", testRequestPost,

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

credenciaisSecondGen.use(function (req, res, next) {
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciaisSecondGen = onRequest(credenciaisSecondGen);
