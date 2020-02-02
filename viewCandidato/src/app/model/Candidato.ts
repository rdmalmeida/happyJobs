import { DadosPessoais } from './DadosPessoais';

export class Candidato {

    username: string;
    dadosPessoais: DadosPessoais;

    constructor(username: string, dadosP: DadosPessoais){
        this.username = username;
        this.dadosPessoais = dadosP;
    } 

}
