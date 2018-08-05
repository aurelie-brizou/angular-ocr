import { Subject } from "../../../node_modules/rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "../../../node_modules/@angular/core";

@Injectable()
export class AppareilService {
    appareilSubject = new Subject<any[]>();
    private appareils = [];
 
    constructor(private httpClient:HttpClient) {

    }
    emitAppareilSubject() {
        this.appareilSubject.next(this.appareils.slice());
    }
    getAppareilById(id: number) {
        const appareil = this.appareils.find(
            (appareilObject) => {
                return appareilObject.id === id;
            }
        );
        return appareil;
    }

    switchOnAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }
    switchOffAll() {
        for (let appareil of this.appareils) {
            appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(index: number) {
        this.appareils[index].status = 'allumé';
        this.emitAppareilSubject();
    }

    switchOnOff(index: number) {
        this.appareils[index].status = 'éteint';
        this.emitAppareilSubject();
    }

    // ajouter un appreil à la liste
    addAppareil(name: string, status:string) {
        const appareilObject = {
            id: 0,
            name: '',
            status: ''
        };
        appareilObject.name = name;
        appareilObject.status = status;
        appareilObject.id = this.appareils
        [(this.appareils.length-1)].id + 1;
        this.appareils.push(appareilObject);
        this.emitAppareilSubject();
    }

    saveAppareilsToServer() {
        this.httpClient
        // méthode put si il existe cette data à l'url il va l'écraser
        .put('https://http-client-demo-ocr.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
            () =>{
                console.log('enregistrement terminé')
            },
            (error) => {
                console.log('erreur de sauvegarde' + error);
            }
        );
    }

    getAppareilsFromServer() {
        this.httpClient
        .get<any[]>('https://http-client-demo-ocr.firebaseio.com/appareils.json')
        .subscribe(
            (response) =>{
                this.appareils = response;
                this.emitAppareilSubject();
            },
            (error) => {
                console.log('erreur de chargement ' + error);
            }
        );
    }
}