import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';
import { AppareilService } from './service/appareil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // création d'une valeur globale donc ds app-component
  // la condition vérifie si l'utilisateur est authentifié 
  isAuth = false;

  lastUpdate = new Date();

  // def d'une propriété qui est vouée à être async
  lastUpdatePromise = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });
 

  appareils:any[];
  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  // indique que l'array appareils sera égale au tableau du service
  ngOnInit() {
    this.appareils = this.appareilService.appareils;
  }

  // le component appelle les méthodes du service
  onAllumer() {
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    this.appareilService.switchOffAll();
  }
}


