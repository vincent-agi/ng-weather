import {Component, inject, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  private locations: string[] = [];
  private locationsSubscription: Subscription;

  private readonly weatherService = inject(WeatherService);
  private readonly router = inject(Router);
  protected readonly locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  public ngOnInit(): void {
    this.locationsSubscription = this.locationService.getLocationsObservable()
      .subscribe(locations => {
        console.log("locations current comp : ", locations)
        this.locations = locations;
      });
  }

  public showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  public ngOnDestroy(): void {
    this.locationsSubscription.unsubscribe();
  }

  public removeLocation(location: string, event:Event): void {
    this.locationService.removeLocation(location);
    event.stopPropagation();
  }

  public clearLocations(): void {
    this.locationService.clearLocations();
  }
}
