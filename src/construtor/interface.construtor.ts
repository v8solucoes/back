import * as fs from 'fs';
import * as path from 'path';

export class InterfaceConstrutor {
configuracao : object = {
    nome: "Menu Todos 2",
    campos: [ { nomeCampo: 'teste', grupo: false }],
    interface: ``
}
    constructor() {

        fs.appendFile(path.join(__dirname,'teste.json'),JSON.stringify(this.configuracao),( err: any) => {
            console.log('criado')
            if(err) throw err  
        return
        })
    }


}