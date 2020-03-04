import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidato } from '../model/Candidato';
import { take, timeout } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { CV } from '../model/CV';


@Injectable({
  providedIn: 'root'
})
export class CandidatoService { 

  private readonly API_CANDIDATO = environment.API + 'candidato';

  constructor(private http: HttpClient,
    private loginService: LoginService
    ){ 
      console.log('CandidatoService construído!')
    }
  
  getCandidato(username: string) {

    let params = new HttpParams();
    params = params.append('username', username);

      return this.http.get<Candidato>(this.API_CANDIDATO, { 
        params
      })
        .pipe(take(1));
  }
  
  salvarCandidato(candidato: Candidato) {

    return this.http.post(this.API_CANDIDATO, candidato)
        .pipe(take(1));

  }

  salvarCurriculo(cv: CV) {

    return this.http.post(this.API_CANDIDATO, cv)
       .pipe(take(1));
  }

}
