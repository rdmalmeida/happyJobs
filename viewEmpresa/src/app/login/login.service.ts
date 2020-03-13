import { User } from './../model/User';
import { tap, take, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = environment.API + 'authenticate';
  private readonly API_USERS = environment.API + 'users';

  constructor(private http: HttpClient) { }

  public logar(user: User): Observable < any > {

    return this.http.post(this.API, { username: user.username, password: user.password },  {
      observe: 'response'
     })
     .pipe(take(1))
        .pipe(
            tap( 
              response => {

              window.sessionStorage.setItem('token', response.headers.get('Authorization'));
              window.sessionStorage.setItem('user', user.username);
              //console.log(this.token);
              return response;

            }));
  }

  public getToken(): string {
    return window.sessionStorage.getItem('token');
  }

  public getUsuarioLogado(): string {
    return window.sessionStorage.getItem('user');
  }

  public saveUser(user: User): Observable<any> {

    return this.http.post(this.API_USERS, user,  {
      observe: 'response'
    })
      .pipe(take(1));
  }

}
