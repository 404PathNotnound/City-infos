import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { City } from '../models/city.model';
import { GeocodingResponse } from '../models/api.models';
@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private readonly http = inject(HttpClient);
  search(query: string): Observable<City[]> {
    const params = new HttpParams()
      .set('name', query)
      .set('count', 5)
      .set('language', 'fr')
      .set('format', 'json');
    return this.http
      .get<GeocodingResponse>(
        'https://geocoding-api.open-meteo.com/v1/search',
        { params },
      )
      .pipe(
        map((response) =>
          (response.results ?? []).map((result) => ({
            id: result.id,
            name: result.name,
            latitude: result.latitude,
            longitude: result.longitude,
            country: result.country,
            countryCode: result.country_code,
            admin1: result.admin1,
            timezone: result.timezone,
          })),
        ),
      );
  }
}
