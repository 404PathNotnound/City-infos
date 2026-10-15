import { Injectable, inject, signal } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  forkJoin,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { City, CityViewModel } from '../models/city.model';
import { AirQualityService } from '../services/air-quality.service';
import { CountryService } from '../services/country.service';
import { GeocodingService } from '../services/geocoding.service';
import { WeatherService } from '../services/weather.service';

export type ExplorerStatus =
  'idle' | 'loading' | 'ready' | 'not-found' | 'error';

@Injectable({ providedIn: 'root' })
export class CityExplorerFacade {
  private readonly geocoding = inject(GeocodingService);
  private readonly weather = inject(WeatherService);
  private readonly airQuality = inject(AirQualityService);
  private readonly country = inject(CountryService);
  private readonly querySubject = new Subject<string>();

  readonly status = signal<ExplorerStatus>('idle');
  readonly viewModel = signal<CityViewModel | null>(null);

  constructor() {
    this.initSearchResultSubject();
  }

  private initSearchResultSubject(): void {
    const searchResult$: Observable<CityViewModel> = this.querySubject.pipe(
      filter((query) => query.length >= 3),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        this.status.set('loading')
         return this.geocoding.search(query).pipe(
          catchError(() => {
            this.status.set('error');
            return EMPTY;
          }))
        }

      ),
      switchMap((cities) => {
        if (cities.length === 0) {
          this.status.set('not-found');
        }
        return cities.length > 0 ? this.loadCity(cities[0]) : EMPTY;
      }),
    );

    searchResult$.subscribe({
      next: (viewModel) => {
        this.viewModel.set(viewModel);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
      complete: () => this.status.set('ready'),
    });
  }

  search(query: string): void {
    const normalizedQuery = query.trim();
    if (normalizedQuery.length >= 3) {
      this.querySubject.next(normalizedQuery);
    }
  }

  private loadCity(city: City): Observable<CityViewModel> {
    return forkJoin({
      city: of(city),
      weather: this.weather.getForecast(city.latitude, city.longitude),
      airQuality: this.airQuality.getCurrent(city.latitude, city.longitude),
      country: this.country.getDetails(city.countryCode),
    }).pipe(
      catchError((error) => {
        console.error('Impossible de charger la fiche de la ville', error);
        this.status.set('error');
        return EMPTY;
      }),
    );
  }
}
