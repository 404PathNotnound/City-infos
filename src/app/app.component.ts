import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SearchBarComponent } from './features/search/search-bar/search-bar.component';
import { CityDashboardComponent } from './features/city-dashboard/city-dashboard.component';
import { CityExplorerFacade } from './core/facades/city-explorer.facade';

@Component({
  imports: [SearchBarComponent, CityDashboardComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class App {
  protected readonly facade = inject(CityExplorerFacade);
}
