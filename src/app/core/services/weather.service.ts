import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ForecastResponse } from '../models/api.models';
import { WeatherSnapshot } from '../models/city.model';
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);
  getForecast(
    latitude: number,
    longitude: number,
  ): Observable<WeatherSnapshot> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('current', 'temperature_2m,wind_speed_10m,weather_code')
      .set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
      .set('timezone', 'auto')
      .set('forecast_days', 5);
    return this.http
      .get<ForecastResponse>('https://api.open-meteo.com/v1/forecast', {
        params,
      })
      .pipe(
        map((response) => ({
          current: {
            temperature: response.current.temperature_2m,
            windSpeed: response.current.wind_speed_10m,
            weatherCode: response.current.weather_code,
          },
          daily: response.daily.time.map((date, index) => ({
            date,
            max: response.daily.temperature_2m_max[index],
            min: response.daily.temperature_2m_min[index],
            weatherCode: response.daily.weather_code[index],
          })),
        })),
      );
  }
}
