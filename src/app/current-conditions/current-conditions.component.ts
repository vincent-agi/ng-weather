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

  private locationSubscription: Subscription;

  private readonly weatherService = inject(WeatherService);
  private readonly router = inject(Router);
  protected readonly locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  ngOnInit(): void {
    this.locationSubscription = this.locationService.getLocationsObservable().subscribe();
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }

  public showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  public clearLocations(): void {
    this.locationService.clearLocations();
  }
}
