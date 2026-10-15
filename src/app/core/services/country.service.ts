import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CountryDetails } from '../models/city.model';
import { CountryApiResponse } from '../models/api.models';
@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  getDetails(countryCode: string): Observable<CountryDetails> {
    return this.http
      .get<CountryApiResponse>(`https://countries.dev/alpha/${countryCode}`)
      .pipe(
        map((country) => ({
          name: country.name,
          capital: country.capital ?? '—',
          population: country.population,
          currencies: country.currencies.map((currency) => currency.name),
          languages: country.languages.map((language) => language.name),
          flag: country.flag,
        })),
      );
  }
}
