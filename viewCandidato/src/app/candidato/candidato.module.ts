import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';

import { BrMaskerModule } from 'br-mask';
import { resolve } from 'url';
import { CandidatoResolverGuard } from './candidato.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DadosPessoaisComponent,
        resolve: {
          candidato: CandidatoResolverGuard
        }
      }
    ])
  ],
  declarations: [DadosPessoaisComponent]
})
export class CandidatoModule { }
