import { InterfaceModelo } from "./dados.interface";

/* FUNÇÕES */
export type NomePropriedades<T> = { [K in keyof T]: K }[keyof T];

// CONTRUTOR DOCUMENTOS

export type Formata = {} & FormataParametros & FormataModelo & FormataMetodos;

export interface FormataModelo {
  cabecalho: string;
  grupo: string;
  propriedadeSinal: string;
  modelo(propriedade: any, valor: Required<InterfaceModelo>): string;
}
export interface FormataParametros {
  grupoAbre: string;
  grupoFecha: string;
  abrePai: string;
  fechaPai: string;
  abreFilho: string;
  fechaFilho: string;
  abreGrupo: string;
  fechaGrupo: string;
  propriedadeSepara: string;
}

export interface FormataMetodos {
  propriedade(propriedade: string): string;
  objeto(propriedade: any, valor: Required<InterfaceModelo>, valorRecursivo: string): string;
  objetoRecursivo(propriedade: any, valor: Required<InterfaceModelo>, valorRecursivo: string): string;
  string(propriedade: any, valor: Required<InterfaceModelo>): string;
}