import { ConstrutorDados as Criar } from "./dados.construtor";

export class ModeloDados {
  static grupo = {
    ...Criar.objeto({
      id: "usuario",
      _grupo: [
        Criar.string({ id: "idUsuario" }),
        Criar.string({ id: "idRevenda" }),
        Criar.string({ id: "idCliente" }),
        Criar.string({ id: "tipoAcesso" }),
        Criar.string({ id: "nome" }),
        Criar.string({ id: "email" }),
      ],
    }),
    ...Criar.objeto({
      id: "modulo",
      _grupo: [
        Criar.string({ id: "nome" }),
        Criar.string({ id: "servico" }),
        Criar.string({ id: "url" }),
        Criar.string({ id: "id" }),
        Criar.string({ id: "local" }),
      ],
    }),
    ...Criar.objeto({
      id: "requisicao",
      _grupo: [
        Criar.string({ id: "ambiente" }),
        Criar.string({ id: "acao" }),
        Criar.string({ id: "item" }),
        Criar.string({ id: "dominio" }),
        Criar.string({ id: "dataUpdate" }),
      ],
    }),
  };
  static compartilhado = {
    ...Criar.objeto({
      id: "credencial",
      _grupo: [
        Criar.objeto({ id: "usuario", _grupo: this.grupo.usuario._grupo }),
        Criar.objeto({ id: "modulo", _grupo: this.grupo.modulo._grupo }),
        Criar.objeto({ id: "requisicao", _grupo: this.grupo.requisicao._grupo}),
      ],
    }),
  };
  static modulo = {
    ...Criar.objeto({
      id: "usuarioAdm",
      _grupo: [Criar.objeto(this.compartilhado.credencial)],
    }),
  };
}
