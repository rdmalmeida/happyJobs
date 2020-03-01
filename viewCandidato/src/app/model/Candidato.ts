import { DadosPessoais } from './DadosPessoais';
import { CV } from './CV';

export class Candidato {

    username: string;
    dadosPessoais: DadosPessoais;
    cv: CV;

    constructor(username: string, dadosP: DadosPessoais, cv: CV){
        this.username = username;
        this.dadosPessoais = dadosP;
        this.cv = cv;
    } 

}
