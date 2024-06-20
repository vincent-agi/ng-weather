import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  // choix du BehaviourSubject car valeur intiale possible et emet toujours la dernière valeur.
  // Donc tous les subscribers synchronisés. 
  private locationsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private locations: string[] = [];

  constructor() {
    let locString:string = localStorage.getItem(LOCATIONS);
    if (locString) 
    {
      this.locations = JSON.parse(locString);
      console.log("locations", this.locations)
      this.locationsSubject.next(this.locations)
    }
  }
  
  public getLocationsObservable(): Observable<string[]> {
    return this.locationsSubject.asObservable();
  }

  public addLocation(newLocation: string): void {
    const index: number = this.locations.indexOf(newLocation);
    if(index === -1) {
      this.locations.push(newLocation);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.locationsSubject.next(this.locations);
    } else {
      console.log(`location ${newLocation} already exist`);
    }
  }

  public removeLocation(location: string): void {
    let index = this.locations.indexOf(location);
    if (index !== -1)
    {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.locationsSubject.next(this.locations.filter(loc => loc !== location));
      console.log(`location ${location} deleted`)
    }
  }

  
  public clearLocations(): void {
    this.locations = [];
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.locationsSubject.next([]);
  }
}
