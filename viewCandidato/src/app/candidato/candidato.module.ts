import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';

import { BrMaskerModule } from 'br-mask';
import { CandidatoResolverGuard } from './candidato.guard';
import { CvComponent } from './cv/cv.component';
import { FormacaoModalComponent } from './cv/formacao-modal/formacao-modal.component';
import { Ng2PicaModule, Ng2PicaService } from 'node_modules/ng2-pica/dist/ng2-pica';
import { XpProfModalComponent } from './cv/xp-prof-modal/xp-prof-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrMaskerModule,
    ReactiveFormsModule,
    Ng2PicaModule,
    RouterModule.forChild([
      {
        path: '',
        component: DadosPessoaisComponent,
        resolve: {
          candidato: CandidatoResolverGuard
        }
      },
      {
        path: 'cv',
        component: CvComponent,
        resolve: {
          candidato: CandidatoResolverGuard
        }
      }
    ])
  ],
  declarations: [DadosPessoaisComponent, CvComponent, FormacaoModalComponent, XpProfModalComponent],
  providers: [Ng2PicaService ],
  entryComponents: [FormacaoModalComponent, XpProfModalComponent]
})
export class CandidatoModule { }
