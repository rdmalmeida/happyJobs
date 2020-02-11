import { TimeoutError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class BaseComponent{

    public errorMsg = '';

    submetido: boolean = false;
    
    handleError(error) {

        let mensagem;
        if(error instanceof TimeoutError ){
    
          mensagem = 'Serviço indisponível, tente novamente mais tarde.';
    
        } else {
    
          if (error instanceof HttpErrorResponse) {
    
            if (error.status === 0) {
              mensagem = 'Serviço indisponível, tente novamente mais tarde.';
            }
            if (error.status === 403) {
              mensagem = 'Login ou senha inválidos!';
            }
            if (error.status === 406) {
              mensagem = error.error.mensagem;
            }
          }
        }
    
        console.log('mensagem::' + mensagem);
        this.errorMsg = mensagem;
    }
}