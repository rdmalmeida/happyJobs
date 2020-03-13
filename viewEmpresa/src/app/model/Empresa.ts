import { DadosCoorporativos } from './DadosCoorporativos';
import { CV } from './CV';
import { Formacao } from './Formacao';
import { XpProfissional } from './XpProfissional';

export class Empresa {

    username: string;
    dadosCoorporativos: DadosCoorporativos = new DadosCoorporativos();
    //cv: CV = new CV(new Array<Formacao>(), new Array<XpProfissional>());

    constructor(username: string, dadosP?: DadosCoorporativos, cv?: CV){
        this.username = username;
        if(dadosP != null && dadosP != undefined){
            this.dadosCoorporativos = dadosP;
        }

        /*if(cv != null && cv != undefined){
            this.cv = cv;
        }*/

    } 

}
