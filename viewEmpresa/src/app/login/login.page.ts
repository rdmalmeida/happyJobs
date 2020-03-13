import { User } from './../model/User';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { IonButton } from '@ionic/angular';
import { ArquiteturaService } from '../shared/arquitetura.service';
import { TimeoutError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CpfValidator } from '../shared/cpf-validator';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  public user: User = {username: '', password: '', enabled: true, dataCadastro: null, confirm: ''};

  public newUser: User = {username: '', password: '', enabled: true, dataCadastro: null, confirm: ''};

  public validations_form: FormGroup;

  public submetido: boolean = false;

  public showRegisterForm = false;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private arqService: ArquiteturaService) {
   
      this.validations_form  = this.formBuilder.group({
        username: new FormControl('', Validators.compose([
          Validators.required,          
          Validators.pattern('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
        ])),
        password: new FormControl('', Validators.compose([
          Validators.required, 
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=])(?=\\S+$).{8,}$')
        ])),
        confirm: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$¨%^&+=])(?=\\S+$).{8,}$')
        ]))
      });

   }

  logar() {

    this.loginService.logar(this.user).subscribe((header) => {

      this.router.navigate(['home']);

    }, (a) => this._handleError(a, 1));
  }

  bind(){

    this.newUser.username = this.validations_form.get('username').value;
    this.newUser.password = this.validations_form.get('password').value;
    this.newUser.confirm = this.validations_form.get('confirm').value;    
  }
  
  saveUser(form: HTMLFormElement, btn: IonButton) {

    this.submetido = true;
    let mensagem: string;

    this.bind();
    if(this.validations_form.valid){
        
        btn.disabled = true;
        this.newUser.dataCadastro = new Date();
    
        this.loginService.saveUser(this.newUser).subscribe( (resp) => {
          mensagem = 'Usuário cadastrado com sucesso!';
          this.arqService.showToastMessage(mensagem);
            form.reset();
            btn.disabled = false;
        }, (out) => {
          // console.log(out);
          this._handleError(out, 2);
          btn.disabled = false;
        });

      } else {
        mensagem = 'Por favor, preencha corretamente todos os campos.';
        this.arqService.showToastErrorMessage(mensagem);
      }

  }


  _handleError(error, form) {

    let mensagem;  
    if(error instanceof TimeoutError){
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

    this.arqService.showToastErrorMessage(mensagem);
  }

  showCadastro() {
    this.showRegisterForm = !this.showRegisterForm;
  }

}
