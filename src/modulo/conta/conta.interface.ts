import { Credencial } from "../../../../construtor/src/construtor/11-credencial/credencial.export";
/* import { dados_Interface } from "../../imports"; */

export interface ContaMetodo {

  executar(req: Credencial): Promise<string>

}

export interface Metodos {
    emailExiste(req: string): boolean
    tipoUsuario(req: string): boolean
}