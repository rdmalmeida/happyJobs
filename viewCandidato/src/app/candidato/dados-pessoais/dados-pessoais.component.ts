import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/model/Candidato';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/util/BaseComponent';
import { DadosPessoais } from 'src/app/model/DadosPessoais';
import { CandidatService } from '../candidat.service';
import { CandidatoService } from '../candidato.service';
import { IonItem } from '@ionic/angular';
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss'],
})
//export class DadosPessoaisComponent extends BaseComponent implements OnInit {
  export class DadosPessoaisComponent implements OnInit {

  public candidato: Candidato = new Candidato('', new DadosPessoais());

  customPopoverOptions: any = {
    header: 'Escolha sua UF:',
  };

  constructor(private router: Router,
    private candidatoService: CandidatoService, 
    private route: ActivatedRoute,
    private fb: FormBuilder) {

   }

  ngOnInit() {
    this.onRefresh(); 
  }

  onRefresh(){


    console.log('iniciando...');

    const candidato = this.route.snapshot.data['candidato'];

    this.candidato.username = candidato.username;
    this.candidato.dadosPessoais = candidato.dadosPessoais;
      
    //nomeCompleto: new FormControl(candidato.dadosPessoais.nomeCompleto), 
      /*foto: [candidato.dadosPessoais.foto],
           
      nascimento: [candidato.dadosPessoais.nascimento],
      rg: [candidato.dadosPessoais.rg],
      cpf: [candidato.dadosPessoais.cpf],
      nacionalidade: [candidato.dadosPessoais.nacionalidade],
      naturalidade: [candidato.dadosPessoais.naturalidade],
      estadoCivil: [candidato.dadosPessoais.estadoCivil], // solteiro, casado, divorciado, união estável
      genero: [candidato.dadosPessoais.genero], // M F
      
      possuiFilhos: [candidato.dadosPessoais.possuiFilhos],
      possuiHabilitacao: [candidato.dadosPessoais.possuiHabilitacao],
      possuiVeiculo: [candidato.dadosPessoais.possuiVeiculo],
      possuiNecessidadesEspeciais: [candidato.dadosPessoais.possuiNecessidadesEspeciais],
      disponibilidadeMudar: [candidato.dadosPessoais.disponibilidadeMudar],
      pretensaoSalarial: [candidato.dadosPessoais.pretensaoSalarial],

      linkFace: [candidato.dadosPessoais.linkFace],
      linkedIn: [candidato.dadosPessoais.linkedIn],
      instagram: [candidato.dadosPessoais.instagram],

      logradouro: [candidato.dadosPessoais.logradouro],
      bairro: [candidato.dadosPessoais.bairro],
      cidade: [candidato.dadosPessoais.cidade],
      uf: [candidato.dadosPessoais.uf],
      cep: [candidato.dadosPessoais.cep],
      complemento: [candidato.dadosPessoais.complemento],*/
    //});

   // this.candidato = new Candidato(candidato.username, candidato.dadosPessoais);
    //console.log('candidato::' + this.candidato);
    
    /*
    
*/
    

  }

  saveIt(){

    console.log(this.candidato);
    this.candidatoService.salvarCandidato(this.candidato).subscribe(
      ok =>       console.log('ok:' + ok),
      err => console.error(err)
    );
  }


  save(form: HTMLFormElement, btn: HTMLButtonElement){
    
    /*
    const d = new DadosPessoais();
    const c = new Candidato(this.formi.get('username').value, d);  
    
    d.foto = this.formi.get('foto').value;
    d.nomeCompleto = this.formi.get('nomeCompleto').value;
    d.nascimento = this.formi.get('nascimento').value;
    d.rg = this.formi.get('').value;
    d.cpf = this.formi.get('cpf').value;
    d.nacionalidade = this.formi.get('nacionalidade').value;
    d.naturalidade = this.formi.get('naturalidade').value;
    d.estadoCivil = this.formi.get('estadoCivil').value;
    d.genero = this.formi.get('genero').value;
      
    d.possuiFilhos = this.formi.get('possuiFilhos').value;
    d.possuiHabilitacao = this.formi.get('possuiHabilitacao').value;
    d.possuiVeiculo = this.formi.get('possuiVeiculo').value;
    d.possuiNecessidadesEspeciais = this.formi.get('possuiNecessidadesEspeciais').value;
    d.disponibilidadeMudar = this.formi.get('disponibilidadeMudar').value;
    d.pretensaoSalarial = this.formi.get('pretensaoSalarial').value;

    d.linkFace = this.formi.get('linkFace').value;
    d.linkedIn = this.formi.get('linkedIn]').value;
    d.instagram = this.formi.get('instagram').value;

    d.logradouro = this.formi.get('logradouro').value;
    d.bairro = this.formi.get('bairro').value;
    d.cidade = this.formi.get('cidade').value;
    d.uf = this.formi.get('uf').value;
    d.cep = this.formi.get('cep').value;
    d.complemento = this.formi.get('complemento').value;*/
  }

 

}
