
    export interface InterfaceModelo {
  id: string;
  nome?: string;
  valor?: any;
  tipo?: Modelo['tipo']
  interface?: Dados['interface'];
  dados?: Partial<Dados>;
  modelo?: Partial<Modelo>;
  exibir?: Partial<Exibir>;
  _grupo?: { [key: string]: InterfaceModelo }[]
}

export interface Dados {
  interface: 'string'| 'boolean' | 'any'
  valor: any;
}

export interface Exibir {
  formulario: boolean;
  titulo: boolean;
  subTitulo: boolean;
}

export interface Modelo {
  nome: string;
  tipo: "string" | "lista" | "objeto";
  valorInicial: string | number | boolean;
  design: string;
  validarSincrono: boolean;
  validarAssincrono: boolean;
  colecao: {
    lista: boolean;
    objeto: boolean;
  };
}
    export const dadosDados_dados : dadosDados_Interface = {
"usuarioAdm":{

            "tipo": "objeto",
            "dados": "usuarioAdm - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"usuarioAdm 'Sem Nome'","tipo":"objeto","valorInicial":"objeto","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
,"_grupo": 
[
{
"credencial":{

            "tipo": "objeto",
            "dados": "sem Valor",
            "exibir": {"formulario":true,"titulo":true,"subTitulo":true},
            "modelo": {"nome":"sem nome","tipo":"objeto","valorInicial":"objeto","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
,"_grupo": 
[
{
"usuario":{

            "tipo": "objeto",
            "dados": "usuario - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"usuario 'Sem Nome'","tipo":"objeto","valorInicial":"objeto","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
,"_grupo": 
[
{
"idUsuario":{

            "tipo": "string",
            "dados": "idUsuario - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"idUsuario 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"idRevenda":{

            "tipo": "string",
            "dados": "idRevenda - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"idRevenda 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"idCliente":{

            "tipo": "string",
            "dados": "idCliente - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"idCliente 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"tipoAcesso":{

            "tipo": "string",
            "dados": "tipoAcesso - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"tipoAcesso 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"nome":{

            "tipo": "string",
            "dados": "nome - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"nome 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"email":{

            "tipo": "string",
            "dados": "email - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"email 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}}]}},{
"modulo":{

            "tipo": "objeto",
            "dados": "modulo - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"modulo 'Sem Nome'","tipo":"objeto","valorInicial":"objeto","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
,"_grupo": 
[
{
"nome":{

            "tipo": "string",
            "dados": "nome - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"nome 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"servico":{

            "tipo": "string",
            "dados": "servico - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"servico 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"url":{

            "tipo": "string",
            "dados": "url - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"url 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"id":{

            "tipo": "string",
            "dados": "id - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"id 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"local":{

            "tipo": "string",
            "dados": "local - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"local 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}}]}},{
"requisicao":{

            "tipo": "objeto",
            "dados": "requisicao - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"requisicao 'Sem Nome'","tipo":"objeto","valorInicial":"objeto","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
,"_grupo": 
[
{
"ambiente":{

            "tipo": "string",
            "dados": "ambiente - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"ambiente 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"acao":{

            "tipo": "string",
            "dados": "acao - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"acao 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"item":{

            "tipo": "string",
            "dados": "item - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"item 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"dominio":{

            "tipo": "string",
            "dados": "dominio - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"dominio 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}},{
"dataUpdate":{

            "tipo": "string",
            "dados": "dataUpdate - sem dados",
            "exibir": {"formulario":true,"titulo":false,"subTitulo":false},
            "modelo": {"nome":"dataUpdate 'Sem Nome'","tipo":"string","valorInicial":"string","design":"string;","validarSincrono":false,"validarAssincrono":false,"colecao":{"lista":false,"objeto":false}}
            
}}]}}]}}]}} 
    export interface dadosDados_Interface {
usuarioAdm:{

            tipo: "objeto";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
_grupo: 
[
{
credencial:{

            tipo: "objeto";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
_grupo: 
[
{
usuario:{

            tipo: "objeto";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
_grupo: 
[
{
idUsuario:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
idRevenda:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
idCliente:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
tipoAcesso:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
nome:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
email:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}}]}},{
modulo:{

            tipo: "objeto";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
_grupo: 
[
{
nome:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
servico:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
url:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
id:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
local:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}}]}},{
requisicao:{

            tipo: "objeto";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
_grupo: 
[
{
ambiente:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
acao:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
item:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
dominio:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}},{
dataUpdate:{

            tipo: "string";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            
}}]}}]}}]}} 
    