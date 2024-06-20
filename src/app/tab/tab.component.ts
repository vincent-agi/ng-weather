import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @ContentChild('location') locationElement: ElementRef;

  @Input() isActive = false;

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<void>();

  private readonly locationService: LocationService = inject(LocationService);

  public closeTab(event: MouseEvent): void {
    event.stopPropagation();
    console.log('Tab removed');
    this.locationService.removeLocation(this.locationElement.nativeElement.innerText);
    this.close.emit();
  }

  public selectTab(): void {
    this.isActive = true;
    console.log('Tab selected');
    this.select.emit();
  }
}