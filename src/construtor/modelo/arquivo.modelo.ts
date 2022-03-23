import { ModeloDados as Dados } from "./dados.modelo";
import { ModeloDocumento as Documento } from "./documento.modelo";
import { ConstrutorArquivo as Arquivo } from "./arquivo.construtor";

export class ModeloArquivo {
  static dados(nome: string) {
    Arquivo.novo(nome,`${nome}.dados.ts`, Documento.dados(nome, Dados.modulo));
    } 
}
