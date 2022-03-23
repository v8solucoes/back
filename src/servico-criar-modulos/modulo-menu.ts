import {
    MenuDados,
    moduloUsuarioAdm    
  } from "./modulo-modulo";

export const menu: MenuDados = {
    adm: {
      principal: [
        {
          moduloNome: moduloUsuarioAdm.nome,
          url: moduloUsuarioAdm.url,
          tipo: "colecaoGaveta",
          acao: "listar",
          item: "",
          icone: "",
          grupo: [
            {
              moduloNome: moduloUsuarioAdm.nome,
              url: moduloUsuarioAdm.url,
              tipo: "control",
              acao: "listar",
              item: "",
              icone: "",
            },
          ],
        },
      ],
    },
  };