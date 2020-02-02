import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Candidato } from '../model/Candidato';
import { CandidatoService } from './candidato.service';
import { DadosPessoais } from '../model/DadosPessoais';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoResolverGuard implements Resolve<Candidato> {
  constructor(private service: CandidatoService,
    private loginS: LoginService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidato> {
    
    console.log('CandidatoResolverGuard::')
    const username = this.loginS.getUsuarioLogado();

    return this.service.getCandidato(username);
  }
}