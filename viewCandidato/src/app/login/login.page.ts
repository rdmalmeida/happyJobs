import { User } from './../model/User';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import {  HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { TimeoutError } from 'rxjs';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {


  public user: User = {username: '', password: '', enabled: true, dataCadastro: null, confirm: ''};

  public newUser: User = {username: '', password: '', enabled: true, dataCadastro: null, confirm: ''};

  public errorMsg = '';
  public errorMsg2 = '';

  validations_form: FormGroup;

  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private loginService: LoginService) {
   
   }

  public showRegisterForm = false;


  ngOnInit() {

    this.validations_form  = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  logar() {
    
/*
    this.loginService.logar(this.user).subscribe((header) => {

      this.router.navigate(['home']);

    }, (a) => this._handleError(a, 1));*/
  }

  saveUser(form: HTMLFormElement, btn: HTMLButtonElement) {
    btn.disabled = true;
    this.newUser.dataCadastro = new Date();

    this.loginService.saveUser(this.newUser).subscribe( (resp) => {
        this.errorMsg2 = 'Usuário cadastrado com sucesso!';
        form.reset();
        btn.disabled = false;
    }, (out) => {
      // console.log(out);
      this._handleError(out, 2);
      btn.disabled = false;
    });
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

    if (form === 1) {
      this.errorMsg = mensagem;
    } else {
      this.errorMsg2 = mensagem;
    }
  }

  showCadastro() {
    this.showRegisterForm = !this.showRegisterForm;
  }

}
