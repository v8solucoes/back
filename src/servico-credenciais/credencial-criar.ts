import {
  Rota,
  TipoRota,
  CredencialModulo,
  CredencialRequisicao,
  CredencialUsuario,
  CredencialNova,
  CredencialPronta
} from "./credencial-modulo";

export class CriarCredencial {

  pronta = new CredencialPronta

  rotaModulo(credenciais: CredencialNova): TipoRota {

    const pasta = "lista";
    const caminho: Rota = {
      adm: {
        lista: `${credenciais.requisicao.ambiente}/${credenciais.modulo.id}/${pasta}`,
        documento: `${credenciais.requisicao.ambiente}/${credenciais.modulo.id}`,
      },
      revenda: {
        lista: `${credenciais.requisicao.ambiente}/${credenciais.usuario.idRevenda}/${credenciais.modulo.id}/${pasta}`,
        documento: `${credenciais.requisicao.ambiente}/${credenciais.usuario.idRevenda}/${credenciais.modulo.id}`,
      },
      cliente: {
        lista: `${credenciais.requisicao.ambiente}/${credenciais.usuario.idRevenda}/${credenciais.usuario.idCliente}/${credenciais.modulo.id}/${pasta}`,
        documento: `${credenciais.requisicao.ambiente}/${credenciais.usuario.idRevenda}/${credenciais.usuario.idCliente}/${credenciais.modulo.id}`,
      },
    };

    return caminho[credenciais.modulo.local] as TipoRota
  }

  credencialNova(
    usuario: CredencialUsuario,
    modulo: CredencialModulo,
    requisicao: CredencialRequisicao
  ): CredencialNova {
    return {
      usuario,
      modulo,
      requisicao,
    };
  }

  modulo(modulo: CredencialModulo): CredencialModulo {
    return {
      nome: modulo.nome,
      id: modulo.id,
      servico: modulo.servico,
      url: modulo.url,
      local: modulo.local,
    };
  }

  requisicao(requisicao: CredencialRequisicao): CredencialRequisicao {
    return {
      dominio: requisicao.dominio,
      item: requisicao.item,
      acao: requisicao.acao,
      dataUpdate: new Date(),
      ambiente: requisicao.ambiente,
    };
  }

  converteNomePadraoURL(nome: string): string {
    return nome.trim().replace(/ /g, "-").toLowerCase();
  }

  converteNomePadraoJSON(nome: string): string {
    const transforma = nome
      .trim()
      .replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/ /g, "");

    return transforma.charAt(0).toLowerCase() + transforma.substr(1);
  }

  converteNomeURLpadraoJSON(nomeUrl: string) {
    const transforma = nomeUrl.trim().replace(/-/g, " ");

    return this.converteNomePadraoJSON(transforma);
  }
  
}
