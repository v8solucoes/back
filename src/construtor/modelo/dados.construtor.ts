import {
  Dados,
  Exibir,
  Modelo,
  InterfaceModelo,
} from "./dados.interface";

export class ConstrutorDados {
  static carregarModelo(valor: InterfaceModelo): Required<InterfaceModelo> {
    const modeloString: InterfaceModelo = {
      // Dados Atalhos
      id: valor.id || "string",
      nome: valor.nome || "sem nome",
      valor: valor.valor || "sem Valor",
      tipo: valor.tipo,
      interface: valor.interface || valor.dados?.interface || "any",

      // Dados do Atalho Estruturados
      dados: this.dados(valor),
      modelo: this.modelo(valor),
      exibir: this.exibir(valor),
    };

    if ((valor.tipo = "objeto")) {
      modeloString["_grupo"] = valor._grupo;
    }

    return modeloString as Required<InterfaceModelo>;
  }
  static string(valor: InterfaceModelo): {
    [key: string]: Required<Omit<InterfaceModelo, "_grupo">>;
  } {
    valor.tipo = 'string'
    return { [valor.id]: this.carregarModelo(valor) };
  }

  static objeto(valor: InterfaceModelo): {
    [key: string]: Required<InterfaceModelo>;
  } {
    valor.tipo = 'objeto'
    return { [valor.id]: this.carregarModelo(valor) };
  }

  static dados(valor: InterfaceModelo): Dados {
    // procura Modelo na sequencia > Atalho, Estruturado ou Default
    return {
      interface: valor.interface || valor.dados?.interface || "any",
      valor: valor.valor || valor.dados?.valor || `${valor.id} - sem dados`,
    };
  }

  static modelo(valor: InterfaceModelo): Modelo {
    // procura Modelo na sequencia > Atalho, Estruturado ou Default
    return {
      nome: valor.nome || valor.modelo?.nome || `${valor.id} 'Sem Nome'`,
      tipo: valor.tipo || valor.modelo?.tipo || "string",
      valorInicial: valor.tipo || valor.modelo?.valorInicial || "Sem Valor",
      design: valor.modelo?.design || `string;`,
      validarSincrono: valor.modelo?.validarSincrono || false,
      validarAssincrono: valor.modelo?.validarAssincrono || false,
      colecao: {
        lista: valor.modelo?.colecao?.lista || false,
        objeto: valor.modelo?.colecao?.objeto || false,
      },
    };
  }

  static exibir(valor: InterfaceModelo): Exibir {
    // procura Modelo na sequencia > Atalho, Estruturado ou Default
    return {
      formulario: valor.exibir?.formulario || true,
      titulo: valor.exibir?.formulario || false,
      subTitulo: valor.exibir?.formulario || false,
    };
  }
}
