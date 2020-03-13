import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ArquiteturaService {

  constructor(private router: Router,
              private menuCtrl: MenuController,
              private locationStrategy: LocationStrategy,
              public toastController: ToastController) { 

      console.log('ArquiteturaService construído!')
  }

  setSideMenuActive(active: boolean) {

      this.menuCtrl.enable(active, 'menu1');
      this.menuCtrl.swipeGesture(active, 'menu1')
        .then(
          (a) => console.log('menu visivel::' + active));
  }

  goHome(){
    this.setSideMenuActive(false);
    this.router.navigate(['']);
  }

  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  async showToastErrorMessage(message: string) {
    
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: 'middle',
      color: 'danger',
    });
    toast.present();
  }

  async showToastMessage(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();    
  }

}
