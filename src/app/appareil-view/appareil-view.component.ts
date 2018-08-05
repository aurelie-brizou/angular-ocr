import { Component, OnInit } from '@angular/core';
import { AppareilService } from '../service/appareil.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

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
  appareilSubscription: Subscription;
  constructor(private appareilService: AppareilService) {
    setTimeout(
      () => {
        this.isAuth = true;
      }, 4000
    );
  }

  // indique que l'array appareils sera égale au tableau du service
  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  // le component appelle les méthodes du service
  onAllumer() {
    this.appareilService.switchOnAll();
  }
  onEteindre() {
    this.appareilService.switchOffAll();
  }

  onSave() {
    this.appareilService.saveAppareilsToServer();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

}
