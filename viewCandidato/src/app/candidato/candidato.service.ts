import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidato } from '../model/Candidato';
import { Observable } from 'rxjs';
import { take, timeout, tap } from 'rxjs/operators';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("iniciando CandidatoService");
  }
  ngOnInit(): void {
    throw new Error("destruindo CandidatoService");
  }

  constructor(private http: HttpClient,
    private loginService: LoginService) { 

      console.log('CandidatoService construído!')
    }
  
  private readonly API_CANDIDATO = environment.API + 'candidato';

  private duranteTrs = false;

  getCandidato(username: string) {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    
    headers = headers.append('Authorization', 'Bearer ' + this.loginService.getToken());

    console.log('this.loginService.getToken()::' + this.loginService.getToken());
    console.log(headers);

    let params = new HttpParams();
    params = params.append('username', username)

    //if (!this.duranteTrs) {
        //this.duranteTrs = true;
        return this.http.get<Candidato>(this.API_CANDIDATO, { 
          headers,
          params
        })
        .pipe(take(1))
          .pipe( timeout(3000) );
    //}
  }
  
  salvarCandidato(candidato: Candidato) {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', 'Bearer ' +  this.loginService.getToken());

    console.log('this.loginService.getToken()::' + this.loginService.getToken());
    console.log(headers);

    //if (!this.duranteTrs) {
        //this.duranteTrs = true;
        return this.http.post(this.API_CANDIDATO, candidato,  { 
          headers
        })
        .pipe(take(1))
          .pipe( timeout(3000) );
    //}

  }

}
