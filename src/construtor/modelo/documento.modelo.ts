import { ConstrutorArquivo as Arquivo} from "./arquivo.construtor";
import { ConstrutorDocumento as Documento } from "./documento.construtor";
import { InterfaceModelo } from "./dados.interface";
import { Formata, FormataModelo, FormataParametros } from "./documento.interface";

export class ModeloDocumento {

  static dados(nomeVariavel: string, dados: any): string {
    const criardados = `
    ${Arquivo.lerArquivo('./dados.interface.ts')}
    ${Documento.criarGrupo(dados, this.modelo(this.dadosDados('dadosDados').json))}
    ${Documento.criarGrupo(dados, this.modelo(this.dadosDados('dadosDados').interface))}
    `
    const sucesso = `Documento criado: ${nomeVariavel}`
    console.log(sucesso)
    return criardados
 }

  static dadosDados(nomeVariavel: string): { json: FormataModelo, interface:FormataModelo} {
    
    const nomeDados = `${nomeVariavel}_dados`
    const nomeInterface = `${nomeVariavel}_Interface`

    return {
      get json() {
        return {
          cabecalho: `export const ${nomeDados} : ${nomeInterface} = `,
          grupo: `,"_grupo": \n`,
          propriedadeSinal: `"`,
          modelo: (propriedade: any, valor: Required<InterfaceModelo>) => {
            return `
            "tipo": "${valor.tipo}",
            "dados": "${valor.dados.valor}",
            "exibir": ${JSON.stringify(valor.exibir)},
            "modelo": ${JSON.stringify(valor.modelo)}
            \n`;
          },
      }
    },
      get interface() {
        return {
          cabecalho: `export interface ${nomeInterface} `,
          grupo: `_grupo: \n`,
          propriedadeSinal: ``,
          modelo: (propriedade: any, valor: Required<InterfaceModelo>) => {
            return `
            tipo: "${valor.tipo}";
            dados: any;
            exibir: Partial<Exibir>;
            modelo: Partial<Modelo>;
            \n`;
          },
      }
    }
    };
  }

 static parametro(): FormataParametros {
    return {
      grupoAbre: `[\n`,
      grupoFecha: `]`,
      abrePai: `{\n`,
      fechaPai: `}`,
      abreFilho: `{\n`,
      fechaFilho: `}`,
      abreGrupo: `[\n`,
      fechaGrupo: `]`,
      propriedadeSepara: `:`,
    };
  }
  static modelo(formato:FormataModelo): Formata {
    const modelo: Formata = {
      ...this.parametro(),
      ...formato,
      propriedade: (propriedade: string) =>
        `${
          modelo.propriedadeSinal +
          propriedade +
          modelo.propriedadeSinal +
          modelo.propriedadeSepara
        }`,

      objeto: (
        propriedade: any,
        valor: Required<InterfaceModelo>,
        valorRecursivo: string
      ) =>
        `${
          modelo.propriedade(propriedade) +
          modelo.abreFilho +
          modelo.modelo(propriedade, valor) +
          modelo.grupo +
          modelo.abreGrupo +
          valorRecursivo +
          modelo.fechaGrupo +
          modelo.fechaFilho
        }`,
      objetoRecursivo: (
        propriedade: any,
        valor: Required<InterfaceModelo>,
        valorRecursivo: string
      ) =>
        `${
          modelo.abreFilho +
          modelo.objeto(propriedade, valor, valorRecursivo) +
          modelo.fechaFilho
        }`,
      string: (propriedade: any, valor: Required<InterfaceModelo>) =>
        `${
          modelo.abreFilho +
          modelo.propriedade(propriedade) +
          modelo.abreFilho +
          modelo.modelo(propriedade, valor) +
          modelo.fechaFilho +
          modelo.fechaFilho
        }`,
    };

    return modelo;
  }
}