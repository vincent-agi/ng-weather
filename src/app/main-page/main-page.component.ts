import { Component, OnInit, inject } from '@angular/core';
import { CacheService } from 'app/cache.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {

  private readonly cacheService: CacheService = inject(CacheService);

  public ngOnInit(): void {
    // Petite durée de cache de 10 secondes
    const duration: number = 10000;
    this.cacheService.setCacheDuration('currentConditionsCache', duration);
  }
}
