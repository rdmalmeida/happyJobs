import { Component, OnInit, Input } from '@angular/core';
import { IonButton, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/BaseComponent';
import { ArquiteturaService } from 'src/app/shared/arquitetura.service';
import { XpProfissional } from 'src/app/model/XpProfissional';

@Component({
  selector: 'app-xp-prof-modal',
  templateUrl: './xp-prof-modal.component.html',
  styleUrls: ['./xp-prof-modal.component.scss'],
})
export class XpProfModalComponent extends BaseComponent implements OnInit {
  
  @Input() callback;
  
  @Input() _xpProf;

  private xpProf: XpProfissional = new XpProfissional();

  validations_form: FormGroup;
  
  readonly meses: string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  readonly anos: string[] = new Array<string>();

  constructor(private fb: FormBuilder,
            private modalCtrl: ModalController,
            private arqService: ArquiteturaService) { 

    super();
    this.arqService.setSideMenuActive(true);
    this.fillYearsCombos();
    console.log('XpProfModalComponent constructor loaded');
  }

  private fillYearsCombos() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual + 1; i-- , i >= 1940;) {
      this.anos.push(i + '');
    }

  }

  inicioPopOverMesOptions: any = {
    header: 'Escolha o mês de início:',
  };

  fimPopOverMesOptions: any = {
    header: 'Escolha o mês de saída:',
  };

  inicioPopOverAnoOptions: any = {
    header: 'Escolha o ano de início:',
  };

  fimPopOverAnoOptions: any = {
    header: 'Escolha o ano de saída:',
  };


  ngOnInit() {
    //caso seja uma atualizacao da xp, acessada atraves do modal
    if(this._xpProf != null || this._xpProf!= undefined){
      console.log(this._xpProf);
      this.xpProf = this._xpProf;
    }
    this.criarForm(); 
  }

  private criarForm() {
    this.validations_form = this.fb.group({
      titulo: new FormControl(this.xpProf.titulo, Validators.required),
      empresa: new FormControl(this.xpProf.empresa, Validators.required),
      descricao: new FormControl(this.xpProf.descricao, Validators.required),
      mesInicio: new FormControl(this.xpProf.mesInicio, Validators.required),
      mesFim: new FormControl(this.xpProf.mesFim, Validators.required),
      anoInicio: new FormControl(this.xpProf.anoInicio, Validators.required),
      anoFim: new FormControl(this.xpProf.anoFim, Validators.required),
      cidade: new FormControl(this.xpProf.cidade, Validators.required),
      pais: new FormControl(this.xpProf.pais, Validators.required)
    });
  }

  bind(){

    const xpProf = new XpProfissional();
    
    xpProf.empresa = this.validations_form.get('empresa').value;
    xpProf.titulo = this.validations_form.get('titulo').value;
    xpProf.descricao = this.validations_form.get('descricao').value;
    xpProf.anoInicio = this.validations_form.get('anoInicio').value;
    xpProf.anoFim = this.validations_form.get('anoFim').value;
    xpProf.mesInicio = this.validations_form.get('mesInicio').value;
    xpProf.mesFim = this.validations_form.get('mesFim').value;    
    xpProf.cidade = this.validations_form.get('cidade').value;
    xpProf.pais = this.validations_form.get('pais').value;

    this.xpProf = xpProf;
  }

  save(form: HTMLFormElement, btn: IonButton){
    
    this.submetido = true;

    this.bind();

    if(this.validations_form.valid){
      this.callback(this.xpProf);
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
