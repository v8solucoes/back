import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import { ValidatorsRemote } from "../../domain/src/shared/validator-remote";
import { TestCompose } from "../../domain/src/shared/validator-local";
import { Documents } from "../../domain/src/shared/modules";
import { Irequest } from "@domain/interface";
import { TestDocument } from "../../domain/src/shared/validator-remote";

var credenciais = express();

credenciais.use(cors({ 'origin': '*' }));

var testRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const request: Irequest = req.body as Irequest
  const test = new TestCompose(request).testRequest
  console.clear()
  if (test == null) {
    console.log('TEST REQUEST Aprovated');
    next();

  } else {
    console.log('TEST REQUEST Reprovated');
    /* next(); */
    res.json(test);
  }

};
var testDocument = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const request: Irequest = req.body as Irequest

  try {

    const test = await new TestDocument(request).permisionDomain()

    console.clear()
    if (test == null) {
      console.log('TEST DOCUMENT Aprovated');
      next();

    }

  } catch (error) {
    console.log('TEST DOCUMENT Reprovated');
    res.json(error);
  }

};

/* credenciais.use(testRequest); */

credenciais.get("/", async (req: express.Request, res: express.Response) => {

  console.log("Iniciado Home Service");

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render("index", {
    title: "Api",
    message: "Home"
  });
});

credenciais.post("/CRUD", testRequest, testDocument,

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
/* credenciais.post("/CRUD",

  async (req: express.Request, res: express.Response) => {
   
    console.clear()
      
    const request: Irequest = req.body as Irequest

    console.log('REQUEST CRUD =============================')
    console.log(req.baseUrl)
    console.log(request)
        
    try {

      const response = await new Documents(request).account_adm.create()
      console.log('RESPONSE CRUD ============================')
      console.log(response)
  
      res.json(response);

    } catch (error) {
      res.status(500).render("index", {
        title: "Erro do Servidor / CRUD",
        message: error,
      });
    }
  }
); */

credenciais.post("/validator", cors(), testRequest,

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
