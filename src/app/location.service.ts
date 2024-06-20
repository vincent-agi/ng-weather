import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  // choix du BehaviourSubject car valeur intiale possible et emet toujours la dernière valeur.
  // Donc tous les subscribers synchronisés. 
  private locationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private locations$: Observable<string[]> = this.locationsSubject.asObservable();

  constructor() {
    const locString: string = localStorage.getItem(LOCATIONS);
    if (locString) {
      const locations: string[] = JSON.parse(locString);
      this.locationsSubject.next(locations);
    }
  }

  public getLocationsObservable(): Observable<string[]> {
    return this.locations$;
  }

  public addLocation(newLocation: string): void {
    const currentLocations = this.locationsSubject.getValue();
    if (!currentLocations.includes(newLocation)) {
      const updatedLocations = [...currentLocations, newLocation];
      localStorage.setItem(LOCATIONS, JSON.stringify(updatedLocations));
      this.locationsSubject.next(updatedLocations);
    } else {
      console.log(`Location ${newLocation} already exists`);
    }
  }

  public removeLocation(zipcode: string): void {

    /*
    * Note : Apparement cette fonction ne met pas a jour dynamiquement la liste des locations
    * Je ne comprends pas pourquoi puisque que je mets a jour l'observable.
    * Bizarre Que celle ci ne fonctionne pas de facon réactive alors que addLocation oui.
    */

    const currentLocations = this.locationsSubject.getValue();
    const updatedLocations = currentLocations.filter(location => location !== zipcode);
    console.log("current locations", currentLocations);
    console.log("updated locations", updatedLocations);
    localStorage.setItem(LOCATIONS, JSON.stringify(updatedLocations));
    this.locationsSubject.next(updatedLocations);
    console.log(`Location ${zipcode} deleted`);
  }

  public clearLocations(): void {
    localStorage.setItem(LOCATIONS, JSON.stringify([]));
    this.locationsSubject.next([]);
  }
}