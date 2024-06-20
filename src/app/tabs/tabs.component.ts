import { AfterContentChecked, AfterContentInit, Component, ContentChildren, QueryList, inject } from '@angular/core';
import { LocationService } from 'app/location.service';
import { TabComponent } from 'app/tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit, AfterContentChecked {
  
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  private tabsArray: TabComponent[] = [];
  private initialized = false;

  public ngAfterContentInit(): void {
    this.initTabs();
  }

  public ngAfterContentChecked(): void {
    if (!this.initialized) {
      this.initTabs();
      this.initialized = true;
    }
  }

  private initTabs(): void {
    this.tabsArray = this.tabs.toArray();
    const activeTabs = this.tabsArray.filter(tab => tab.isActive);
    if (activeTabs.length === 0 && this.tabsArray.length > 0) {
      this.selectTab(this.tabsArray[0]);
    }

    this.tabsArray.forEach(tab => {
      tab.select.subscribe(() => {
        console.log('Tab select event received');
        this.selectTab(tab);
      });
      tab.close.subscribe(() => {
        console.log('Tab close event received');
        this.closeTab(tab);
      });
    });
  }

  public selectTab(tab: TabComponent): void {
    console.log('Selecting tab', tab);
    this.tabsArray.forEach(t => t.isActive = false);
    tab.isActive = true;
  }

  public closeTab(tab: TabComponent): void {
    console.log('Closing tab', tab);
    const tabIndex = this.tabsArray.indexOf(tab);
    this.tabsArray.splice(tabIndex, 1);
    this.tabs.reset(this.tabsArray);

    if (tab.isActive && this.tabsArray.length > 0) {
      this.selectTab(this.tabsArray[0]);
    }
  }
}