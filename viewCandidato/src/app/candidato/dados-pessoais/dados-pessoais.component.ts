import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/model/Candidato';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/util/BaseComponent';
import { DadosPessoais } from 'src/app/model/DadosPessoais';
import { CandidatService } from '../candidat.service';
import { CandidatoService } from '../candidato.service';
import { IonItem } from '@ionic/angular';
import { Observable, empty, bindCallback } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent extends BaseComponent implements OnInit {
  
  public candidato: Candidato;

  customPopoverOptions: any = {
    header: 'Escolha sua UF:',
  };

  validations_form: FormGroup;

  constructor(private router: Router,
    private candidatoService: CandidatoService, 
    private route: ActivatedRoute,
    private fb: FormBuilder) {

    super();
    
   }

  ngOnInit() {
    this.onRefresh(); 
  }

  onRefresh(){

    

    console.log('iniciando...');

    const candidato = this.route.snapshot.data['candidato'];
    this.candidato = new Candidato(candidato.username, new DadosPessoais());
      
    this.validations_form  = this.fb.group({
      nomeCompleto: new FormControl(candidato.dadosPessoais.nomeCompleto, Validators.required), 
      foto: new FormControl(candidato.dadosPessoais.foto),
           
      nascimento: new FormControl(candidato.dadosPessoais.nascimento, Validators.required), 
      rg: new FormControl(candidato.dadosPessoais.rg, Validators.required),
      cpf: new FormControl(candidato.dadosPessoais.cpf, Validators.required),
      nacionalidade: new FormControl(candidato.dadosPessoais.nacionalidade, Validators.required),
      naturalidade: new FormControl(candidato.dadosPessoais.naturalidade, Validators.required),
      estadoCivil: new FormControl(candidato.dadosPessoais.estadoCivil, Validators.required), // solteiro, casado, divorciado, união estável
      genero: new FormControl(candidato.dadosPessoais.genero, Validators.required), // M F
      
      possuiFilhos: new FormControl(candidato.dadosPessoais.possuiFilhos),
      possuiHabilitacao: new FormControl(candidato.dadosPessoais.possuiHabilitacao),
      possuiVeiculo: new FormControl(candidato.dadosPessoais.possuiVeiculo),
      possuiNecessidadesEspeciais: new FormControl(candidato.dadosPessoais.possuiNecessidadesEspeciais),
      disponibilidadeMudar: new FormControl(candidato.dadosPessoais.disponibilidadeMudar),
      pretensaoSalarial: new FormControl(candidato.dadosPessoais.pretensaoSalarial),

      linkFace: new FormControl(candidato.dadosPessoais.linkFace),
      linkedIn: new FormControl(candidato.dadosPessoais.linkedIn),
      instagram: new FormControl(candidato.dadosPessoais.instagram),

      logradouro: new FormControl(candidato.dadosPessoais.logradouro, Validators.required),
      bairro: new FormControl(candidato.dadosPessoais.bairro, Validators.required),
      cidade: new FormControl(candidato.dadosPessoais.cidade, Validators.required),
      uf: new FormControl(candidato.dadosPessoais.uf, Validators.required),
      cep: new FormControl(candidato.dadosPessoais.cep, Validators.required),
      complemento: new FormControl(candidato.dadosPessoais.complemento)
    });

    //console.log('candidato::' + this.candidato);    
  }

  //saveIt(){
  save(form: HTMLFormElement, btn: HTMLButtonElement){

      this.submetido = true;
      this.bind();
      
      this.errorMsg = '';
      console.log(this.candidato);
      console.log('this.validations_form.valid::'+ this.validations_form.valid);

      if(this.validations_form.valid){
        this.candidatoService.salvarCandidato(this.candidato).subscribe(
          ok =>  this.errorMsg = 'Salvo com sucesso',
          err => console.error(err)
        );
      } else {
        this.errorMsg = 'Preencha todos os campos do formulário';
      }
    
  }


  
    
  bind(){

    const d = new DadosPessoais();
    const c = new Candidato(this.candidato.username, d);  
    
    d.foto = this.validations_form.get('foto').value;
    d.nomeCompleto = this.validations_form.get('nomeCompleto').value;
    d.nascimento = this.validations_form.get('nascimento').value;
    d.rg = this.validations_form.get('rg').value;
    d.cpf = this.validations_form.get('cpf').value;
    d.nacionalidade = this.validations_form.get('nacionalidade').value;
    d.naturalidade = this.validations_form.get('naturalidade').value;
    d.estadoCivil = this.validations_form.get('estadoCivil').value;
    d.genero = this.validations_form.get('genero').value;
      
    d.possuiFilhos = this.validations_form.get('possuiFilhos').value;
    d.possuiHabilitacao = this.validations_form.get('possuiHabilitacao').value;
    d.possuiVeiculo = this.validations_form.get('possuiVeiculo').value;
    d.possuiNecessidadesEspeciais = this.validations_form.get('possuiNecessidadesEspeciais').value;
    d.disponibilidadeMudar = this.validations_form.get('disponibilidadeMudar').value;
    d.pretensaoSalarial = this.validations_form.get('pretensaoSalarial').value;

    d.linkFace = this.validations_form.get('linkFace').value;
    d.linkedIn = this.validations_form.get('linkedIn').value;
    d.instagram = this.validations_form.get('instagram').value;

    d.logradouro = this.validations_form.get('logradouro').value;
    d.bairro = this.validations_form.get('bairro').value;
    d.cidade = this.validations_form.get('cidade').value;
    d.uf = this.validations_form.get('uf').value;
    d.cep = this.validations_form.get('cep').value;
    d.complemento = this.validations_form.get('complemento').value;

    this.candidato = c;
  }

 

}
