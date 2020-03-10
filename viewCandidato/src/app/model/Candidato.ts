import { DadosPessoais } from './DadosPessoais';
import { CV } from './CV';
import { FormacaoModalComponent } from '../candidato/cv/formacao-modal/formacao-modal.component';
import { Formacao } from './Formacao';
import { XpProfissional } from './XpProfissional';

export class Candidato {

    username: string;
    dadosPessoais: DadosPessoais = new DadosPessoais();
    cv: CV = new CV(new Array<Formacao>(), new Array<XpProfissional>());

    constructor(username: string, dadosP?: DadosPessoais, cv?: CV){
        this.username = username;
        if(dadosP != null && dadosP != undefined){
            this.dadosPessoais = dadosP;
        }

        if(cv != null && cv != undefined){
            this.cv = cv;
        }

        console.log('this.dadosPessoais');
        console.log(this.dadosPessoais);
        console.log('this.cv');
        console.log(this.cv);


        console.log('dadosP');
        console.log(dadosP);
        console.log('cv');
        console.log(cv);

    } 

}
