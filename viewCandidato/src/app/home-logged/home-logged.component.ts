import { Component, OnInit } from '@angular/core';
import { ArquiteturaService } from '../util/arquitetura.service';

@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss'],
})
export class HomeLoggedComponent implements OnInit {

  constructor(private arqService: ArquiteturaService) { }

  ngOnInit() {
    this.arqService.setSideMenuActive(true);
    this.arqService.preventBackButton();
  }

  

}
