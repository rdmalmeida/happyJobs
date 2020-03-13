import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Empresa } from '../model/Empresa';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService { 

  private readonly API_EMPRESA = environment.API + 'empresa';

  constructor(private http: HttpClient
    ){ 
      console.log('EmpresaService construído!')
    }
  
  getEmpresa(username: string) {

    let params = new HttpParams();
    params = params.append('username', username);

      return this.http.get<Empresa>(this.API_EMPRESA, { 
        params
      })
        .pipe(take(1));
  }
  
  salvarEmpresa(empresa: Empresa) {

    return this.http.post(this.API_EMPRESA, empresa)
        .pipe(take(1));

  }

}
