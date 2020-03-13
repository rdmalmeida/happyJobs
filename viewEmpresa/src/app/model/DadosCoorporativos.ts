
export class DadosCoorporativos {

    foto: any;
    nome: string;
    razaoSocial: string;
    cnpj: string;
    estruturaSocietaria: string; //ltda - sa - ei - eireli - mei.
    descricao: string;
    
    linkSite: string;

    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    complemento: string; // opcional/ 

    telefone: string;
    nomeContato: string;
    ramoNegocio: string; //predefinidos e opcao outros (abre input para incluir)
    qtdFuncionarios: string; //0 a 10, 11 a 50, 51 a 100, 101 a 150, 151 a 200, mais de 200

    constructor(){

    }

}
