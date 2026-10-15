import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityViewModel } from '../../core/models/city.model';
import { ExplorerStatus } from '../../core/facades/city-explorer.facade';
@Component({
  selector: 'app-city-dashboard',
  imports: [CommonModule],
  templateUrl: './city-dashboard.component.html',
  styleUrl: './city-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityDashboardComponent {
  readonly viewModel = input<CityViewModel | null>(null);
  readonly status = input<ExplorerStatus>('idle');
}
