import { Component, OnInit, Input } from '@angular/core';
import { IonButton, ModalController } from '@ionic/angular';
import { Formacao } from 'src/app/model/Formacao';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/BaseComponent';
import { ArquiteturaService } from 'src/app/shared/arquitetura.service';

@Component({
  selector: 'app-formacao-modal',
  templateUrl: './formacao-modal.component.html',
  styleUrls: ['./formacao-modal.component.scss'],
})
export class FormacaoModalComponent extends BaseComponent implements OnInit {
  
  @Input() callback;
  
  @Input() _formacao;

  private formacao: Formacao = new Formacao();

  validations_form: FormGroup;

  readonly anosInicio: string[] = new Array<string>();

  readonly anosFim: string[] = new Array<string>();

  constructor(private fb: FormBuilder,
            private modalCtrl: ModalController,
            private arqService: ArquiteturaService) { 

    super();
    this.arqService.setSideMenuActive(true);
    this.fillYearsCombos();    
    console.log('Formacaomodal constructor loaded');
  }

  inicioPopOverOptions: any = {
    header: 'Escolha o ano de início:',
  };

  fimPopOverOptions: any = {
    header: 'Escolha o ano de conclusão:',
  };

  tipoDeCursoPopOverOptions: any = {
    header: 'Escolha o tipo de curso:',
  };

  private fillYearsCombos() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual + 1; i-- , i >= 1940;) {
      this.anosInicio.push(i + '');
    }
    for (let i = anoAtual + 7; i-- , i >= 1940;) {
      this.anosFim.push(i + '');
    }
  }

  ngOnInit() {
    //caso seja uma atualizacao da formacao, acessada atraves do modal
    if(this._formacao != null || this._formacao!= undefined){
      console.log(this._formacao);
      this.formacao = this._formacao;
    }
    this.criarForm(); 
  }

  private criarForm() {
    this.validations_form = this.fb.group({
      escola: new FormControl(this.formacao.escola, Validators.required),
      anoInicio: new FormControl(this.formacao.anoInicio, Validators.required),
      anoFim: new FormControl(this.formacao.anoFim, Validators.required),
      grau: new FormControl(this.formacao.grau, Validators.required),
      areaDeEstudo: new FormControl(this.formacao.areaDeEstudo),
      descricao: new FormControl(this.formacao.descricao, Validators.required)
    });
  }

  bind(){

    const formacao = new Formacao();
    
    formacao.escola = this.validations_form.get('escola').value;
    formacao.anoInicio = this.validations_form.get('anoInicio').value;
    formacao.anoFim = this.validations_form.get('anoFim').value;
    formacao.grau = this.validations_form.get('grau').value;
    formacao.areaDeEstudo = this.validations_form.get('areaDeEstudo').value;
    formacao.descricao = this.validations_form.get('descricao').value;

    this.formacao = formacao;
  }

  save(form: HTMLFormElement, btn: IonButton){
    
    this.submetido = true;

    this.bind();

    if(this.validations_form.valid){
      this.callback(this.formacao);
      this.dismiss();
    } else {
      this.arqService.showToastErrorMessage(this.ERR_CAMPOS_NECESSARIOS);
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
