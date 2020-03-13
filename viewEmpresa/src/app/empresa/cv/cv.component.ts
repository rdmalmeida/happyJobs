import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonButton, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CV } from 'src/app/model/CV';
import { DadosCoorporativos } from 'src/app/model/DadosCoorporativos';
import { Empresa } from 'src/app/model/Empresa';
import { Formacao } from 'src/app/model/Formacao';
import { XpProfissional } from 'src/app/model/XpProfissional';

import { BaseComponent } from 'src/app/shared/BaseComponent';
import { FormacaoModalComponent } from './formacao-modal/formacao-modal.component';
import { XpProfModalComponent } from './xp-prof-modal/xp-prof-modal.component';

import { EmpresaService } from '../empresa.service';
import { LoginService } from 'src/app/login/login.service';
import { ArquiteturaService } from 'src/app/shared/arquitetura.service';


@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent extends BaseComponent implements OnInit {
  
  public empresa: Empresa;

  validations_form: FormGroup;

  constructor(private empresaService: EmpresaService, 
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loginS: LoginService,
    public modalController: ModalController,
    private arqService: ArquiteturaService) { 

    super();
    this.arqService.setSideMenuActive(true);
   }

  ngOnInit() {
    this.onRefresh(); 
  }

  onRefresh(){

    const username = this.loginS.getUsuarioLogado();

    let empresa = this.route.snapshot.data['empresa'];
    if(empresa === undefined || empresa == null){
      this.empresa = new Empresa(username, new DadosCoorporativos());
    } else {
      this.empresa = empresa;

      if(this.empresa.dadosCoorporativos == null){
        this.empresa.dadosCoorporativos = new DadosCoorporativos();
      }
      /*if(this.empresa.cv == null){
        this.empresa.cv = new CV();
      }*/
    }    
      
    console.log('empresa::');
    console.log(this.empresa);  
    
    this.validations_form = this.fb.group({

      /*titulo: new FormControl(this.empresa.cv.titulo, Validators.required), 
      resumo: new FormControl(this.empresa.cv.resumo, Validators.required),
      */
    });   
  }
  
/*
  save(form: HTMLFormElement, btn: IonButton){
     
      this.bind();
      console.log(this.empresa);

      if(this.validations_form.valid){
        this.empresaService.salvarEmpresa(this.empresa).subscribe(
          ok =>  {
            this.arqService.showToastMessage('Salvo com sucesso')
          });
      } else {
        this.arqService.showToastErrorMessage('Preencha todos os campos do formulário');
      }
  }

  bind(){

    const cv = new CV(this.empresa.cv.formacao, this.empresa.cv.xpProf);
    
    cv.titulo = this.validations_form.get('titulo').value;
    cv.resumo = this.validations_form.get('resumo').value;

    this.empresa.cv = cv;
  }

  addFormacao(){
    this.presentFormacaoModal(-1);    
  }

  removeFormacao(formaGrid: Formacao){    
    const i = this.empresa.cv.formacao.findIndex(formacao => 
              
        formacao.escola === formaGrid.escola &&
        formacao.descricao === formaGrid.descricao &&
        formacao.grau === formaGrid.grau &&
        formacao.anoInicio === formaGrid.anoInicio &&
        formacao.anoFim === formaGrid.anoFim
      );

   this.empresa.cv.formacao.splice(i,1);
  }

  atualizaFormacao(formaGrid: Formacao){    
    const i = this.empresa.cv.formacao.findIndex(formacao => 
              
        formacao.escola === formaGrid.escola &&
        formacao.descricao === formaGrid.descricao &&
        formacao.grau === formaGrid.grau &&
        formacao.anoInicio === formaGrid.anoInicio &&
        formacao.anoFim === formaGrid.anoFim
      );

    this.presentFormacaoModal(i);
   
  }

  async presentFormacaoModal(index: number){ 
    const modal = await this.modalController.create({
      component: FormacaoModalComponent,
      componentProps: {
        'index': index,
        '_formacao': index<0 ? new Formacao() : this.empresa.cv.formacao[index],
        'callback': ( result => {
          if(index == -1){
            this.empresa.cv.formacao.push(result);  
          } else {
            this.empresa.cv.formacao[index] = result; 
          }
        })
      }
    });

    return await modal.present();
  }

  addXP(){
    this.presentXPModal(-1);    
  }

  async presentXPModal(index: number){ 
    const modal = await this.modalController.create({
      component: XpProfModalComponent,
      componentProps: {
        'index': index,
        '_xpProf': index<0 ? new XpProfissional() : this.empresa.cv.xpProf[index],
        'callback': ( result => {
          if(index == -1){
            this.empresa.cv.xpProf.push(result);  
          } else {
            this.empresa.cv.xpProf[index] = result; 
          }
        })
      }
    });

    return await modal.present();
  }

  atualizaXp(xpProfGrid: XpProfissional){
    const i = this.empresa.cv.xpProf.findIndex(xpProf =>               
      xpProf.empresa === xpProfGrid.empresa &&
      xpProf.descricao === xpProfGrid.descricao &&
      xpProf.titulo === xpProfGrid.titulo &&
      xpProf.anoInicio === xpProfGrid.anoInicio &&
      xpProf.anoFim === xpProfGrid.anoFim &&
      xpProf.mesInicio === xpProfGrid.mesInicio &&
      xpProf.mesFim === xpProfGrid.mesFim &&
      xpProf.cidade === xpProfGrid.cidade &&
      xpProf.pais === xpProfGrid.pais
    );

    this.presentXPModal(i);
  }

  removeXp(xpProfGrid: XpProfissional){
    const i = this.empresa.cv.xpProf.findIndex(xpProf =>               
      xpProf.empresa === xpProfGrid.empresa &&
      xpProf.descricao === xpProfGrid.descricao &&
      xpProf.titulo === xpProfGrid.titulo &&
      xpProf.anoInicio === xpProfGrid.anoInicio &&
      xpProf.anoFim === xpProfGrid.anoFim &&
      xpProf.mesInicio === xpProfGrid.mesInicio &&
      xpProf.mesFim === xpProfGrid.mesFim &&
      xpProf.cidade === xpProfGrid.cidade &&
      xpProf.pais === xpProfGrid.pais
    );

    this.empresa.cv.xpProf.splice(i,1);
  }
  */
}
