import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AirQualityResponse } from '../models/api.models';
import { AirQualitySnapshot } from '../models/city.model';
@Injectable({ providedIn: 'root' })
export class AirQualityService {
  private readonly http = inject(HttpClient);
  getCurrent(
    latitude: number,
    longitude: number,
  ): Observable<AirQualitySnapshot> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('current', 'pm2_5,pm10,european_aqi')
      .set('timezone', 'auto');
    return this.http
      .get<AirQualityResponse>(
        'https://air-quality-api.open-meteo.com/v1/air-quality',
        { params },
      )
      .pipe(
        map((response) => ({
          pm25: response.current.pm2_5,
          pm10: response.current.pm10,
          europeanIndex: response.current.european_aqi,
        })),
      );
  }
}
