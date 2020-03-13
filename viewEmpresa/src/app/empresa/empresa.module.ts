import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { DadosComponent } from './dados/dados.component';

import { BrMaskerModule } from 'br-mask';
import { EmpresaResolverGuard } from './empresa.guard';
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
        component: DadosComponent,
        resolve: {
          candidato: EmpresaResolverGuard
        }
      },
      {
        path: 'vagas',
        component: CvComponent,
        resolve: {
          candidato: EmpresaResolverGuard
        }
      }
    ])
  ],
  declarations: [DadosComponent, CvComponent, FormacaoModalComponent, XpProfModalComponent],
  providers: [Ng2PicaService ],
  entryComponents: [FormacaoModalComponent, XpProfModalComponent]
})
export class EmpresaModule { }
