import { Formacao } from './Formacao';
import { XpProfissional } from './XpProfissional';

export class CV {

    resumo: string = '';
    titulo: string = '';

    formacao: Formacao[] = new Array<Formacao>();
    xpProf: XpProfissional[] = new Array<XpProfissional>();
        
    constructor(formacao?: Formacao[], xpProf?: XpProfissional[]){        
        this.formacao = formacao;
        this.xpProf = xpProf;
        
        console.log('this.formacao');
        console.log(this.formacao);
        console.log('this.xpprof');
        console.log(this.xpProf);
    }

}
