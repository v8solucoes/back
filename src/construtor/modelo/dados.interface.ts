export interface InterfaceModelo {
  id: string;
  nome?: string;
  valor?: any;
  tipo?: Modelo['tipo']
  interface?: Dados['interface'];
  dados?: Partial<Dados>;
  modelo?: Partial<Modelo>;
  exibir?: Partial<Exibir>;
  _grupo?: { [key: string]: InterfaceModelo }[]
}

export interface Dados {
  interface: 'string'| 'boolean' | 'any'
  valor: any;
}

export interface Exibir {
  formulario: boolean;
  titulo: boolean;
  subTitulo: boolean;
}

export interface Modelo {
  nome: string;
  tipo: "string" | "lista" | "objeto";
  valorInicial: string | number | boolean;
  design: string;
  validarSincrono: boolean;
  validarAssincrono: boolean;
  colecao: {
    lista: boolean;
    objeto: boolean;
  };
}