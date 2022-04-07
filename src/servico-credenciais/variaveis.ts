
export const acao: Acao = {
    novo: "novo",
    editar: "editar",
    deletar: "deletar",
    listar: "listar",
    pegar: "pegar",
    usuario: "usuario"
}

export interface Acao {
    usuario: 'usuario'
    novo: 'novo'
    editar: 'editar'
    deletar: 'deletar'
    pegar: 'pegar'
    listar: 'listar'
}

type Urls = | 'revenda' | 'stream-video' | 'gravar-video' | 'new-modulo' | 'apresentador';
export type AcaoNomes = 'novo' | 'editar' | 'deletar' | 'pegar' | 'usuario' | 'listar'

export interface RotasApp { 
    modulo: string
    moduloUrl: Urls
    acao: AcaoNomes
    item: string 
}