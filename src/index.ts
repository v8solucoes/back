import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

import {
  InterfaceConstrutor,
  acao,
  RequisicaoServidor,
  deletar,
  editar,
  pegar,
  listar,
  novo,
  usuario,
  criarApresentador,
/*   CriarDados */
} from "./index-modulo";


/* var lote = new CriarLote(); */

var credenciais = express();

credenciais.use(cors());
credenciais.set("view engine", "pug");
credenciais.set("views", "./src/views");

credenciais.get("/", async (req: express.Request, res: express.Response) => {
 
/*   lote.criar(); */
  console.log("Iniciado Home Service");

/* criarLote() */

  /* res.json({ message: 'hello world with Typescript' }) */
  /* response.sendfile('index.html'); */

  res.render("index", {
    title: "Api",
    message: "Home",
    data: criarApresentador("teste", "testes"),
  });
});

credenciais.get("/criar-dados", async (req: express.Request, res: express.Response) => {
  console.log("Criar Dados");

  var criarInterface = new InterfaceConstrutor();
  
  try {
    
    criarInterface
    res.json(criarInterface.configuracao)
/*     var criarModulo = new CriarDados();
    const criar = await criarModulo.criar();
    
    res.json(criar); */

  } catch (error) {
    res
      .status(500)
      .render("index", {
        title: "Criar Modulo Erro do Servidor",
        message: error,
      });
  }
});

credenciais.post("/credenciais", async (req: express.Request, res: express.Response) => {
  const requisicao: RequisicaoServidor = req.body;
  console.log(requisicao.credenciais.acao);
  /*   console.log(acao) */

  switch (requisicao.credenciais.acao) {
    case acao.usuario:
      res.send(await usuario(requisicao));
      break;

    case acao.pegar:
      res.send(await pegar(requisicao));
      break;

    case acao.novo:
      res.send(await novo(requisicao));
      break;

    case acao.editar:
      res.send(await editar(requisicao));
      break;

    case acao.listar:
      res.send(await listar(requisicao));
      break;

    case acao.deletar:
      res.send(await deletar(requisicao));
      break;

    default:
      const erro = `Ação não encontrada: ${requisicao.credenciais.acao}`;
      console.log(erro);
      res.status(200).send(erro);
      break;
  }
});

credenciais.use(function (req, res, next) {
  res.status(404).send("Desculpe Url não encontrada!");
});

exports.credenciais = functions.https.onRequest(credenciais);
