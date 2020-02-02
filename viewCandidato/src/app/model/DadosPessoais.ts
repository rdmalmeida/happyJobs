
export class DadosPessoais {

    foto: any;
    nomeCompleto: string;
    nascimento: Date;
    rg: string;
    cpf: string;
    nacionalidade: string;
    naturalidade: string;
    estadoCivil: string; // solteiro, casado, divorciado, união estável
    genero: string; // M F

    possuiFilhos: boolean;
    possuiHabilitacao: boolean;
    possuiVeiculo: boolean;
    possuiNecessidadesEspeciais: boolean;
    disponibilidadeMudar: boolean;
    pretensaoSalarial: number;

    linkFace: string;
    linkedIn: string;
    instagram: string;

    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    complemento: string; // opcional/ 
    
    constructor(){

    }

}
