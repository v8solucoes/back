import { InterfaceModelo } from "./dados.interface";
import { Formata} from "./documento.interface";

export class ConstrutorDocumento {
 
  static criarGrupo(modelo: any, arquivo: Formata) {

    let _grupo = [] as any;

    for (var propriedade in modelo) {
      const valor = modelo[propriedade] as Required<InterfaceModelo>;
      const tipo = valor.tipo;
      const grupoLista = valor._grupo;
      const valorRecursivo = () => this.criaRecursivo(grupoLista, arquivo);

      switch (tipo) {
        case "objeto":
          _grupo.push(
            `${arquivo.objeto(propriedade, valor, valorRecursivo())}`
          );
          break;

        case "string":
          _grupo.push(arquivo.string(propriedade, valor));
          break;

        default:
          console.log("GRUPO Tipo: " + tipo + " Não EXISTE");
          return;
      }
    }

    return `${
      arquivo.cabecalho + arquivo.abrePai + _grupo + arquivo.fechaPai
    } `;
  }

  static criaRecursivo(documento: any, arquivo: any) {
    let _grupoRecursivo = [] as any;

    documento.forEach((elemento: { [key: string]: InterfaceModelo }) => {
      const propriedade = Object.getOwnPropertyNames(elemento)[0];
      const valor = elemento[propriedade] as Required<InterfaceModelo>;
      const tipo = valor.tipo;
      const grupo = valor._grupo;
      const valorRecursivo = () => this.criaRecursivo(grupo, arquivo);

      switch (tipo) {
        case "objeto":
          _grupoRecursivo.push(
            `${arquivo.objetoRecursivo(propriedade, valor, valorRecursivo())}`
          );
          break;

        case "string":
          _grupoRecursivo.push(arquivo.string(propriedade, valor));
          break;

        default:
          console.log("GRUPO Tipo: " + tipo + " Não EXISTE");
          return;
      }
    });

    return `${_grupoRecursivo}`;
  }
}
