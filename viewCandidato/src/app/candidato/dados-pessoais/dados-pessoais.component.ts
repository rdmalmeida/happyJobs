import { Component, OnInit } from '@angular/core';
import { Candidato } from 'src/app/model/Candidato';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/util/BaseComponent';
import { DadosPessoais } from 'src/app/model/DadosPessoais';
import { CandidatoService } from '../candidato.service';
import { IonButton } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { Ng2PicaService } from 'ng2-pica';
import { ArquiteturaService } from 'src/app/util/arquitetura.service';
import { CV } from 'src/app/model/CV';
import { Formacao } from 'src/app/model/Formacao';
import { XpProfissional } from 'src/app/model/XpProfissional';


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
    private fb: FormBuilder,
    private loginS: LoginService,
    private ng2Pica: Ng2PicaService,
    private arqService: ArquiteturaService) { 

    super();
    this.arqService.setSideMenuActive(true);

   }


fileData: File = null;
previewUrl:any = null;
 
fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      

    reader.onload = (_event) => { 

      this.previewUrl = reader.result; 
      this.redimensionaImg();
    }

    reader.readAsDataURL(this.fileData); 

}

  redimensionaImg(){

    const fArray: File[] = new Array<File>();
    fArray.push(this.fileData);

    let finalBase64 = null;

    this.ng2Pica.resize(fArray, 300, 300, true).subscribe(
      result => {        
        const reader = new FileReader();
        reader.readAsDataURL(result); 
        
        reader.onload = () => { 
            finalBase64 = reader.result;                           
            this.validations_form.patchValue({foto: finalBase64.split(',')[1]});
        } 
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );
  }

  ngOnInit() {
    this.onRefresh(); 
  }

  onRefresh(){

    const username = this.loginS.getUsuarioLogado();

    let candidato = this.route.snapshot.data['candidato'];
    
    if(candidato === undefined || candidato == null){
      this.candidato = new Candidato(username, new DadosPessoais(), new CV());
    }else {
      this.candidato = candidato;
      
      if(this.candidato.dadosPessoais == null){
        this.candidato.dadosPessoais = new DadosPessoais();
      }
      if(this.candidato.cv == null){
        this.candidato.cv = new CV();
      }
    }

    console.log(this.candidato);    

    if (this.previewUrl == null && this.candidato.dadosPessoais.foto != null){
      this.previewUrl = "data:image/jpeg;base64," + this.candidato.dadosPessoais.foto;
    }

    this.criarForm(this.candidato);

  }

  private criarForm(candidato: Candidato) {
    this.validations_form = this.fb.group({
      nomeCompleto: new FormControl(candidato.dadosPessoais.nomeCompleto, Validators.required),
      foto: new FormControl(candidato.dadosPessoais.foto),
      nascimento: new FormControl(candidato.dadosPessoais.nascimento, Validators.required),
      rg: new FormControl(candidato.dadosPessoais.rg, Validators.required),
      cpf: new FormControl(candidato.dadosPessoais.cpf, Validators.required),
      nacionalidade: new FormControl(candidato.dadosPessoais.nacionalidade, Validators.required),
      naturalidade: new FormControl(candidato.dadosPessoais.naturalidade, Validators.required),
      estadoCivil: new FormControl(candidato.dadosPessoais.estadoCivil, Validators.required),
      genero: new FormControl(candidato.dadosPessoais.genero, Validators.required),
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
  }

  save(form: HTMLFormElement, btn: IonButton){

      this.submetido = true;
      this.bind();
      
      console.log(this.candidato);

      if(this.validations_form.valid){
        this.candidatoService.salvarCandidato(this.candidato).subscribe(
          ok =>  this.arqService.showToastMessage('Salvo com sucesso')
        );
      } else {
        this.arqService.showToastErrorMessage('Preencha todos os campos do formulário');
      }
    
  }

  bind(){

   
    this.candidato.dadosPessoais.foto = this.validations_form.get('foto').value;;
    this.candidato.dadosPessoais.nomeCompleto = this.validations_form.get('nomeCompleto').value;
    this.candidato.dadosPessoais.nascimento = this.validations_form.get('nascimento').value;
    this.candidato.dadosPessoais.rg = this.validations_form.get('rg').value;
    this.candidato.dadosPessoais.cpf = this.validations_form.get('cpf').value;
    this.candidato.dadosPessoais.nacionalidade = this.validations_form.get('nacionalidade').value;
    this.candidato.dadosPessoais.naturalidade = this.validations_form.get('naturalidade').value;
    this.candidato.dadosPessoais.estadoCivil = this.validations_form.get('estadoCivil').value;
    this.candidato.dadosPessoais.genero = this.validations_form.get('genero').value;
      
    this.candidato.dadosPessoais.possuiFilhos = this.validations_form.get('possuiFilhos').value;
    this.candidato.dadosPessoais.possuiHabilitacao = this.validations_form.get('possuiHabilitacao').value;
    this.candidato.dadosPessoais.possuiVeiculo = this.validations_form.get('possuiVeiculo').value;
    this.candidato.dadosPessoais.possuiNecessidadesEspeciais = this.validations_form.get('possuiNecessidadesEspeciais').value;
    this.candidato.dadosPessoais.disponibilidadeMudar = this.validations_form.get('disponibilidadeMudar').value;
    this.candidato.dadosPessoais.pretensaoSalarial = this.validations_form.get('pretensaoSalarial').value;

    this.candidato.dadosPessoais.linkFace = this.validations_form.get('linkFace').value;
    this.candidato.dadosPessoais.linkedIn = this.validations_form.get('linkedIn').value;
    this.candidato.dadosPessoais.instagram = this.validations_form.get('instagram').value;

    this.candidato.dadosPessoais.logradouro = this.validations_form.get('logradouro').value;
    this.candidato.dadosPessoais.bairro = this.validations_form.get('bairro').value;
    this.candidato.dadosPessoais.cidade = this.validations_form.get('cidade').value;
    this.candidato.dadosPessoais.uf = this.validations_form.get('uf').value;
    this.candidato.dadosPessoais.cep = this.validations_form.get('cep').value;
    this.candidato.dadosPessoais.complemento = this.validations_form.get('complemento').value;

  }

}