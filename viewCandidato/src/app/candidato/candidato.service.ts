import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidato } from '../model/Candidato';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CandidatoService { 

  private readonly API_CANDIDATO = environment.API + 'candidato';
  //private readonly API_CURRICULO = this.API_CANDIDATO + '/cv';

  constructor(private http: HttpClient
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

}
