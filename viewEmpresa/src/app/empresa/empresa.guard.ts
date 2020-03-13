import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Empresa } from '../model/Empresa';
import { EmpresaService } from './empresa.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaResolverGuard implements Resolve<Empresa> {
  constructor(private service: EmpresaService,
    private loginS: LoginService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Empresa> {

    const username = this.loginS.getUsuarioLogado();        
    console.log('EmpresaResolverGuard::');
    return of(new Empresa(username));
    //return this.service.getEmpresa(username);
  }
}