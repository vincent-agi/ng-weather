import { Component } from '@angular/core';
import {LocationService} from "../location.service";

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  constructor(private readonly locationService : LocationService) { }

  addLocation(zipcode : string){
    console.log("zipcode-entry component, zipcode :", zipcode);
    this.locationService.addLocation(zipcode);
  }

}
