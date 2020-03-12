import { Component, OnInit } from '@angular/core';
import { ArquiteturaService } from '../shared/arquitetura.service';
import { BaseComponent } from '../shared/BaseComponent';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss'],
})
export class HomeLoggedComponent extends BaseComponent {
  
  constructor(private arqService: ArquiteturaService){
    super();
    this.arqService.setSideMenuActive(true);
  }

}
