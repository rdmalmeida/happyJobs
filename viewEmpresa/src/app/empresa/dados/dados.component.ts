import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/model/Empresa';
import { Router, ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/BaseComponent';
import { DadosCoorporativos } from 'src/app/model/DadosCoorporativos';
import { EmpresaService } from '../empresa.service';
import { IonButton } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { Ng2PicaService } from 'ng2-pica';
import { ArquiteturaService } from 'src/app/shared/arquitetura.service';
import { CV } from 'src/app/model/CV';
import { CpfValidator } from 'src/app/shared/cpf-validator';



@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss']
})
export class DadosComponent extends BaseComponent implements OnInit {
  
  public empresa: Empresa;

  customPopoverOptions: any = {
    header: 'Escolha sua UF:',
  };

  validations_form: FormGroup;

  constructor(private router: Router,
    private empresaService: EmpresaService, 
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

    let empresa = this.route.snapshot.data['empresa'];
    
    if(empresa === undefined || empresa == null){
      this.empresa = new Empresa(username, new DadosCoorporativos(), new CV());
    }else {
      this.empresa = empresa;
      
      if(this.empresa.dadosCoorporativos == null){
        this.empresa.dadosCoorporativos = new DadosCoorporativos();
      }
      /*if(this.empresa.cv == null){
        this.empresa.cv = new CV();
      }*/
    }

    console.log(this.empresa);    

    if (this.previewUrl == null && this.empresa.dadosCoorporativos.foto != null){
      this.previewUrl = "data:image/jpeg;base64," + this.empresa.dadosCoorporativos.foto;
    }

    this.criarForm(this.empresa);

  }

  private criarForm(empresa: Empresa) {

    this.validations_form = this.fb.group({
      nome: new FormControl(empresa.dadosCoorporativos.nome, Validators.required),
      foto: new FormControl(empresa.dadosCoorporativos.foto),
      cnpj: new FormControl(empresa.dadosCoorporativos.cnpj, CpfValidator.isValidCpf()),
      razaoSocial: new FormControl(empresa.dadosCoorporativos.razaoSocial, Validators.required),
      ramoNegocio: new FormControl(empresa.dadosCoorporativos.ramoNegocio, Validators.required),
      descricao: new FormControl(empresa.dadosCoorporativos.descricao, Validators.required),
      estruturaSocietaria: new FormControl(empresa.dadosCoorporativos.estruturaSocietaria, Validators.required),
      nomeContato: new FormControl(empresa.dadosCoorporativos.nomeContato, Validators.required),
      telefone: new FormControl(empresa.dadosCoorporativos.telefone, Validators.required),
      qtdFuncionarios: new FormControl(empresa.dadosCoorporativos.qtdFuncionarios, Validators.required),

      linkSite: new FormControl(empresa.dadosCoorporativos.linkSite),

      logradouro: new FormControl(empresa.dadosCoorporativos.logradouro, Validators.required),
      bairro: new FormControl(empresa.dadosCoorporativos.bairro, Validators.required),
      cidade: new FormControl(empresa.dadosCoorporativos.cidade, Validators.required),
      uf: new FormControl(empresa.dadosCoorporativos.uf, Validators.required),
      cep: new FormControl(empresa.dadosCoorporativos.cep, Validators.minLength(10)),
      complemento: new FormControl(empresa.dadosCoorporativos.complemento)
    });
  }

  save(form: HTMLFormElement, btn: IonButton){

      this.submetido = true;
      this.bind();
      
      console.log(this.empresa);

      if(this.validations_form.valid){
        this.empresaService.salvarEmpresa(this.empresa).subscribe(
          ok =>  this.arqService.showToastMessage('Salvo com sucesso')
        );
      } else {
        this.arqService.showToastErrorMessage('Preencha todos os campos do formulário');
      }
    
  }

  bind(){
       
    this.empresa.dadosCoorporativos.foto = this.validations_form.get('foto').value;;
    this.empresa.dadosCoorporativos.nome = this.validations_form.get('nome').value;
    this.empresa.dadosCoorporativos.razaoSocial = this.validations_form.get('razaoSocial').value;
    this.empresa.dadosCoorporativos.ramoNegocio = this.validations_form.get('ramoNegocio').value;    
    let cnpj = this.validations_form.get('cnpj').value;    
    this.empresa.dadosCoorporativos.cnpj = cnpj.replace(/[^\d]+/g,'');
    this.empresa.dadosCoorporativos.descricao = this.validations_form.get('descricao').value;
    this.empresa.dadosCoorporativos.estruturaSocietaria = this.validations_form.get('estruturaSocietaria').value;
    this.empresa.dadosCoorporativos.nomeContato = this.validations_form.get('nomeContato').value;
    this.empresa.dadosCoorporativos.telefone = this.validations_form.get('telefone').value;  
    this.empresa.dadosCoorporativos.qtdFuncionarios = this.validations_form.get('qtdFuncionarios').value;
    this.empresa.dadosCoorporativos.linkSite = this.validations_form.get('linkSite').value;

    this.empresa.dadosCoorporativos.logradouro = this.validations_form.get('logradouro').value;
    this.empresa.dadosCoorporativos.bairro = this.validations_form.get('bairro').value;
    this.empresa.dadosCoorporativos.cidade = this.validations_form.get('cidade').value;
    this.empresa.dadosCoorporativos.uf = this.validations_form.get('uf').value;
    this.empresa.dadosCoorporativos.cep = this.validations_form.get('cep').value;
    this.empresa.dadosCoorporativos.complemento = this.validations_form.get('complemento').value;

  }

}