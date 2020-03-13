import { Injectable } from '@angular/core';
import { 
  HttpEvent, HttpRequest, HttpHandler, 
  HttpInterceptor, HttpErrorResponse, HttpHeaders 
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { retry, catchError, take, timeout } from 'rxjs/operators';
import { ArquiteturaService } from './arquitetura.service';
import { LoginService } from '../login/login.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private arqService: ArquiteturaService,
    private loginService: LoginService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('interceptando');

    let headers = new HttpHeaders();    
    headers= headers.append('Authorization', 'Bearer '  + this.loginService.getToken());
    headers= headers.append('Content-Type', 'application/json');
    headers= headers.append('Accept', 'application/json');
    
    const cloneReq = request.clone({
      headers: headers      
    });
    return next.handle(cloneReq)    
    .pipe(
      timeout(5000),
      retry(1),
      catchError((error: HttpErrorResponse) => {

          let errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          console.log(errorMessage + '\n' + error.error);

          if(error.status === undefined){
            this.doClientErrorTreatment(error);
          } else {
            this.doServerErrorTreatment(error);
          }
                  
          //so redireciona
          return throwError(error);
      }
    ))
  };


  private doClientErrorTreatment(error: HttpErrorResponse) {

    let errorMessage;
    if (error instanceof TimeoutError) {
      errorMessage = 'Serviço indisponível, tente novamente mais tarde.';
    } else {        
      errorMessage = 'Humm... Parece que houve algum erro... tente outra vez!'
    }

    this.arqService.showToastErrorMessage(errorMessage);
  }
   

  doServerErrorTreatment(error: HttpErrorResponse){
    
    let errorMessage = 'Serviço indisponível, tente novamente mais tarde.';
    
    switch (error.status) {

      case 403 || 401: {
        errorMessage = 'É hora de revalidar a sua sessão, faça login novamente.';
        console.log(errorMessage);
        this.arqService.goHome();        
        
      }
    }

    this.arqService.showToastErrorMessage(errorMessage);

  }

}