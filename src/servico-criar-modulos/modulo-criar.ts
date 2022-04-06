import {
  DataBase,
  CriarCredencial,
} from "./modulo-modulo";

import { UsuarioAdm_Modulo_Dados} from "../../../_interface/NOVA-INTERFACE/modulo-import"
export class CriarDados {

  constructor() { }

  data = new DataBase();

  pegarCredencial = new CriarCredencial();

  // Modulos

  _usuarioAdm = new UsuarioAdm_Modulo_Dados()

  async criar() {

    try {
console.group('Dados')
console.log(this._usuarioAdm.dados)
console.groupEnd()
      // Cria Usuário Credenciais
      this.data.push(
        this.pegarCredencial.pronta.credencialUsuarioAdmTeste,
        this._usuarioAdm.dados
      );

      // Cria Modelo
   /*    this.data.push(
        this.pegarCredencial.pronta.credencialModeloAdmTeste,
        this.modelo
      ); */

      // Cria Dados
/*       this.data.push(
        this.pegarCredencial.pronta.credencialUsuarioAdmDadosTeste,
        this.dados
      ); */

      await this.data.salvar();

      return this._usuarioAdm.dados;

    } catch (error) {
      return error;
    }
  }
}

// Modelo Adm / Revenda / Cliente

// Usuário Credencial

// Usuário Menus

// Modelo do Cliente
/* 
  usuarioNovo: UsuarioCriar = {
    credencial: this.credencial.pronta.credencialTeste,
    design: design,
    menu: {
      adm: {
        principal: this.menus(),
      },
      revenda: null,
      cliente: null,
    },
    modulo: this.modulo(),
  };

  debug = (pro: any, valor: any) =>
    new Debugar(debugar.criarDados, "CriarDados", pro, valor);

  async criar() {
    try { */
/*  this.lote.pushNovaColecao(this.credencial.rotaCredencialNovoUsuarioAdmTeste,  this.usuarioNovo); */
/* 
      await this.lote.salvar();

      return this.usuarioNovo;
    } catch (error) {
      return error;
    }
  }

  modulo(): ModulosTodosModulos {
    let modulo = {} as any;

    this.listaModulo.forEach((modulos: any) => {
      const chaveModulo = modulos.dados.chave.chaveModulo;

      modulo[chaveModulo] = {
        permissao: modulos.dados.permissao[chaveModulo],
        modelo: this.lote.pushNovaColecao(
          this.credencial.rotaModeloAdmTeste,
          modulos.dados.modelo[chaveModulo]
        ),
        form: null,
        dados: {
          item: null,
          lista: null,
        },
        listarTitulo: modulos.dados.listarTitulo[chaveModulo],
        listarSubTitulo: modulos.dados.listarSubTitulo[chaveModulo],
      };
    });
    return modulo as ModulosTodosModulos;
  } */
/* 
  menus(): Menu[] {
    const principal = [] as Menu[];

    this.listaModulo.forEach((modulos: any) => {
      modulos.dados.menu.adm.principal.forEach((menu: Menu) =>
        principal.push(menu)
      );
    });

    return principal;
  } */
