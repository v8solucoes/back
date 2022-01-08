var admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

interface Resposta {
    existe: boolean,
    error: any,
    mensagem: string,
    data: any
}

export async function TestarCredencial(req: any, res:any, next:any) {
    const data = await usuario('usuario','ZEjRkWCDc1PkuIaFyaWnYqmJY4q1')
    req.data = data
    next();
  };

export async function novo(cliente:any) {
  
   const  rota = rotas(cliente.credenciais);
    return db.collection(rota).add(cliente.dados)
    .then((data:any) => {
        
        const resposta = {
            existe: true,
            error: null,
            mensagem: 'Sucesso > Nova Coleção',
            data: data.id
        }
        return resposta

    })
    .catch( (error:any) => {
        const resposta = {
            existe: false,
            error: 'Erro > Nova Coleção ' + rota,
            mensagem: error,
            data: null
        }
        console.log(resposta.error);
        return resposta
    })
}

export async function pegar(cliente:any) {
   const  rota = rotas(cliente.credenciais);
   console.log(rota);
    return documento(rota, cliente.credenciais.item)
}
export async function deletar(cliente:any) {
   const  rota = rotas(cliente.credenciais);
   console.log(rota);
    return documentoDeletar(rota, cliente.credenciais.item)
}
export async function editar(cliente: any) {
   const  rota = rotas(cliente.credenciais);
   console.log(rota);
    return update(rota, cliente.credenciais.item, cliente.dados)
}

export async function listar(cliente:any) {
   const  rota = rotas(cliente.credenciais);
   console.log(rota);
    return colecao(rota)
}

export async function update(caminho:any, chave:any, dados:any) {
    return db.collection(caminho).doc(chave).update(dados).then(
        (doc:any) => {
            const resposta = {
                existe: true,
                error: null,
                mensagem: 'Update Sucesso',
                data: doc
            }
            return resposta 
        }
    )
}
export async function documento(caminho:any, chave:any) {
    return db.collection(caminho).doc(chave).get().then(
        (doc:any) => {
            if (!doc.exists) {

              const resposta = {
                    existe: false,
                    error: 'Documentos não existe ' + caminho +'/' +chave + ' ',
                    mensagem: doc.exists,
                    data: null
                }
                console.log(resposta.error);
                return resposta

            } else {
                const resposta = {
                    existe: true,
                    error: null,
                    mensagem: 'Documento Sucesso',
                    data: doc.data()
                }
                return resposta
            }
        }
    )
}

export async function documentoDeletar(caminho:any, chave:any) {
      console.log(chave);
    return db.collection(caminho).doc(chave).delete().then(()=>{
      
         return {
                existe: true,
                error: null,
                mensagem: 'Deletado Sucesso',
                data: ''
            }
            
    }).catch((doc:any)=>{
         return {
                    existe: false,
                    error: 'Documentos não existe ' + caminho +'/' +chave + ' ',
                    mensagem: doc.exists,
                    data: null
                }
    })
}

export async function colecao(caminho:any) {

    let resposta: Resposta = {
        existe: true,
        error: null,
        mensagem: 'Coleção Sucesso',
        data: {}
    }

    const snapshot = await db.collection(caminho).get()

    if(snapshot.existe) {
        resposta.existe = false
        resposta.error = snapshot.error
        resposta.mensagem = 'Coleção URL NÃO EXISTE: ' + caminho
        resposta.data = {'vazio':null}
        console.log(resposta.error) 

    } else {
        snapshot.forEach((doc:{id:string,data:any}) => {
            resposta.data[doc.id] = doc.data()
        })
    }
    return resposta
}

export async function usuario(caminho:any, chave:any) {

    try {
     var usuario = (await documento(caminho, chave)).data
     var modelo = (await colecao(`modelo`)).data;
 
     for (const key of Object.keys(usuario.modulo)) {  
        usuario.modulo[key].modelo = modelo[key]
    }

    const resposta = {
        existe: true,
        error: null,
        mensagem: 'Sucesso',
        data: usuario
    }
    
    return resposta

    } catch (error) {
        const resposta = {
            existe: false,
            error: error,
            mensagem: 'Coleção',
            data: null
        }
        return resposta
    }
}

export function rotas(rota:any) {

   const rotas:any = {
        revenda: `revenda`,
        apresentador: `cliente/${rota.idCliente}/dados/${rota.modulo}/lista/`,
        newModulo: `cliente/${rota.idCliente}/dados/${rota.modulo}/lista/`
    }

    return rotas[rota.modulo]

}

/*

const docRef = db.collection('xxxx').doc('alovelace');
docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
});

*/