
import { RequisicaoServidor, RespostaServidor } from "./credencial-modulo";

import * as admin from "firebase-admin";
import { CredencialNova, CriarCredencial } from "./credencial-modulo";
import { RelatorioAcao } from "../../../_interface/credenciais";

admin.initializeApp();
const db = admin.firestore();
const credencial = new CriarCredencial();

export class DataBase {
  
  lote = db.batch();
  credencial = credencial;

  operacao() {
    return {
      get dataHora() {
        return admin.firestore.FieldValue.serverTimestamp();
      },
      get incrementa() {
        return admin.firestore.FieldValue.increment(1);
      },
      get decrementa() {
        return admin.firestore.FieldValue.increment(-1);
      },
      get novoId() {
        return db.bundle().bundleId;
      },
      get novo() {
        return admin.firestore.FieldValue.increment(1);
      },

      pushLista(item: any) {
        return admin.firestore.FieldValue.arrayUnion(item);
      },

      relatorio(credencial: CredencialNova) {
        const dataUpdate = admin.firestore.FieldValue.serverTimestamp();

        if (credencial.requisicao.acao == "novo") {
          return { novo: admin.firestore.FieldValue.increment(1), dataUpdate };
        }
        if (credencial.requisicao.acao == "editar") {
          return {
            editar: admin.firestore.FieldValue.increment(1),
            dataUpdate,
          };
        }
        if (credencial.requisicao.acao == "deletar") {
          return {
            deletar: admin.firestore.FieldValue.increment(-1),
            dataUpdate,
          };
        }

        return {};
      },
    };
  }

  push( credencial: CredencialNova, dados: any) {

    // Gerar Log
      
    credencial.requisicao.dataUpdate = this.operacao().dataHora as any

    // Criar Relatorio
    const relatorio = this.operacao().relatorio(credencial)

    // Adicionar Log no Dados

   /*  let dadosGravacao = (dados.log = this.operacao().relatorio(credencial) ); */

    const chave = credencial.requisicao.item;

    // Pegar Rotas
    const rotaLista = this.credencial.rotaModulo(credencial)

    if( 'novo' == credencial.requisicao.acao ) {
      this.lote.set( db.collection(rotaLista.lista).doc(chave), dados);
      this.lote.set( db.doc(rotaLista.documento), relatorio);
    } else {
      this.lote.update( db.collection(rotaLista.lista).doc(chave), dados);
      this.lote.update( db.doc(rotaLista.documento), relatorio);
    }
    
    console.log('push Executado')
    console.log(dados)
    return
    
  }
  
  salvar() {
    return this.lote.commit();
  }
  CriaNovoSet(){}
  Update(){}

  relatorio() {
    const incrementa = admin.firestore.FieldValue.increment(1);
    const decrementa = admin.firestore.FieldValue.increment(-1);
    const dataHora = admin.firestore.FieldValue.serverTimestamp();

    const relatorio: RelatorioAcao = {
      novo: incrementa,
      editado: incrementa,
      deletado: decrementa,
      ultimoUpdate: dataHora,
    };

    return relatorio
  }
  async criar() {
    console.log("Lote");

    try {
      const novoId = db.bundle().bundleId;
      const dataHora = admin.firestore.FieldValue.serverTimestamp();
      const incrementa = admin.firestore.FieldValue.increment(1);
      const decrementa = admin.firestore.FieldValue.increment(-1);
      const novaLista = admin.firestore.FieldValue.arrayUnion(novoId);
      console.log(novoId);
      await db.collection("meuLote").doc("credenciais").set({
        dataHora,
        incrementa,
        decrementa,
        novaLista,
      });
      console.log("Lote Processado");
    } catch (error) {
      console.log(error);
    }
  }
}

export async function criarLote() {
  console.log("Lote");

  try {
    const novoId = db.bundle().bundleId;
    const dataHora = admin.firestore.FieldValue.serverTimestamp();
    const incrementa = admin.firestore.FieldValue.increment(1);
    const decrementa = admin.firestore.FieldValue.increment(-1);
    const novaLista = admin.firestore.FieldValue.arrayUnion(novoId);
    console.log(novoId);
    await db.collection("meuLote").doc("credenciais").set({
      dataHora,
      incrementa,
      decrementa,
      novaLista,
    });
    console.log("Lote Processado");
  } catch (error) {
    console.log(error);
  }
}

export async function usuario(
  requisicao: RequisicaoServidor
): Promise<RespostaServidor> {
  try {
    var usuario = (await documento("usuario", requisicao.credenciais.usuarioId))
      .data;
    var modelo = (await colecao(`modelo`)).data;

    for (const key of Object.keys(usuario.modulo)) {
      usuario.modulo[key].modelo = modelo[key];
    }

    return respostaServidor(usuario, true, "Usuario Credencias Sucesso!");
  } catch (error) {
    return respostaServidor(false, true, "Erro Usuario Credencias " + error);
  }
}

export async function pegar(cliente: any) {
  const rota = rotas(cliente.credenciais);
  console.log(rota);
  return documento(rota, cliente.credenciais.item);
}
interface Resposta {
  existe: boolean;
  error: any;
  mensagem: string;
  data: any;
}

/* export async function TestarCredencial(req: any, res: any, next: any) {
  const data = await usuario("usuario", "ZEjRkWCDc1PkuIaFyaWnYqmJY4q1");
  req.data = data;
  next();
} */

export async function novo(cliente: any) {
  const rota = rotas(cliente.credenciais);
  return db
    .collection(rota)
    .add(cliente.dados)
    .then((data: any) => {
      const resposta = {
        existe: true,
        error: null,
        mensagem: "Sucesso > Nova Coleção",
        data: data.id,
      };
      return resposta;
    })
    .catch((error: any) => {
      const resposta = {
        existe: false,
        error: "Erro > Nova Coleção " + rota,
        mensagem: error,
        data: null,
      };
      console.log(resposta.error);
      return resposta;
    });
}

export async function deletar(cliente: any) {
  const rota = rotas(cliente.credenciais);
  console.log(rota);
  return documentoDeletar(rota, cliente.credenciais.item);
}
export async function editar(cliente: any) {
  const rota = rotas(cliente.credenciais);
  console.log(rota);
  return update(rota, cliente.credenciais.item, cliente.dados);
}

export async function listar(cliente: any) {
  const rota = rotas(cliente.credenciais);
  console.log(rota);
  return colecao(rota);
}

export async function update(caminho: any, chave: any, dados: any) {
  return db
    .collection(caminho)
    .doc(chave)
    .update(dados)
    .then((doc: any) => {
      const resposta = {
        existe: true,
        error: null,
        mensagem: "Update Sucesso",
        data: doc,
      };
      return resposta;
    });
}
export async function documento(caminho: any, chave: any) {
  return db
    .collection(caminho)
    .doc(chave)
    .get()
    .then((doc: any) => {
      if (!doc.exists) {
        const resposta = {
          existe: false,
          error: "Documentos não existe " + caminho + "/" + chave + " ",
          mensagem: doc.exists,
          data: null,
        };
        console.log(resposta.error);
        return resposta;
      } else {
        const resposta = {
          existe: true,
          error: null,
          mensagem: "Documento Sucesso",
          data: doc.data(),
        };
        return resposta;
      }
    });
}

export async function documentoDeletar(caminho: any, chave: any) {
  console.log(chave);
  return db
    .collection(caminho)
    .doc(chave)
    .delete()
    .then(() => {
      return {
        existe: true,
        error: null,
        mensagem: "Deletado Sucesso",
        data: "",
      };
    })
    .catch((doc: any) => {
      return {
        existe: false,
        error: "Documentos não existe " + caminho + "/" + chave + " ",
        mensagem: doc.exists,
        data: null,
      };
    });
}

export async function colecao(caminho: any) {
  let resposta: Resposta = {
    existe: true,
    error: null,
    mensagem: "Coleção Sucesso",
    data: {},
  };

  const snapshot = await db.collection(caminho).get();

  snapshot.forEach((doc: { id: string; data: any }) => {
    resposta.data[doc.id] = doc.data();
  });

  return resposta;
}
export function respostaServidor(
  moduloDados: any,
  sucesso: boolean,
  mensagem: string
): RespostaServidor {
  return { moduloDados, sucesso, mensagem };
}

export function rotas(rota: any) {
  const rotas: any = {
    revenda: `revenda`,
    apresentador: `cliente/${rota.idCliente}/dados/${rota.modulo}/lista/`,
    newModulo: `cliente/${rota.idCliente}/dados/${rota.modulo}/lista/`,
  };

  return rotas[rota.modulo];
}

/*

const docRef = db.collection('xxxx').doc('alovelace');
docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});

*/
