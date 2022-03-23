import { AcaoNomes } from "../../../interface/interfaces-imports";
import {
  CredencialUsuario,
  CredencialModulo,
  CredencialRequisicao,
  CredencialNova,
} from "./credencial-modulo";

export class CredencialPronta {

  usuarioTeste: CredencialUsuario = {
    idUsuario: "ZEjRkWCDc1PkuIaFyaWnYqmJY4q1",
    idRevenda: "C0JrcUWVqTQR3sPt8Qqo",
    idCliente: "gfFyiX5IU4OaoXm4BDzX",
    tipoAcesso: "adm",
    nome: "Emerson",
    email: "teste@v8sites.com.br",
  };

  moduloUsuarioAdm: CredencialModulo = {
    id: "usuarioAdm",
    nome: "Usuario Adm",
    url: "usuario-adm",
    servico: false,
    local: "adm",
  };

  moduloModeloAdm: CredencialModulo = {
    id: 'modeloAdm',
    nome: "Modelo Adm",
    url: 'usuario-adm',
    servico: false,
    local: "adm",
  };

  requisicaoLista: CredencialRequisicao = {
    item: "",
    acao: "listar",
    dataUpdate: new Date(),
    ambiente: "ambienteTeste",
    dominio: "localhost",
  };

  credencialUsuarioAdmTeste: CredencialNova = {
    usuario: this.usuarioTeste,
    modulo: this.moduloUsuarioAdm,
    requisicao: this.requisicaoNovoItem('novo', this.usuarioTeste.idUsuario),
  };
  credencialModeloAdmTeste: CredencialNova = {
    usuario: this.usuarioTeste,
    modulo: this.moduloModeloAdm,
    requisicao: this.requisicaoNovoItem('novo', this.usuarioTeste.idUsuario),
  };
  credencialUsuarioAdmDadosTeste: CredencialNova = {
    usuario: this.usuarioTeste,
    modulo: this.moduloModeloAdm,
    requisicao: this.requisicaoNovoItem('novo', this.usuarioTeste.idUsuario),
  };
  credencialTeste: CredencialNova = {
    usuario: this.usuarioTeste,
    modulo: this.moduloUsuarioAdm,
    requisicao: this.requisicaoLista,
  };

  requisicaoNovoItem (acao: AcaoNomes, item: string, ): CredencialRequisicao {
    return {
      item: item,
      acao: acao,
      dataUpdate: new Date(),
      ambiente: "ambienteTeste",
      dominio: "localhost",
    };
  };
  requisicaoPegarItem = (item: string): CredencialRequisicao => {
    return {
      item: item,
      acao: "pegar",
      dataUpdate: new Date(),
      ambiente: "ambienteTeste",
      dominio: "localhost",
    };
  };
}
