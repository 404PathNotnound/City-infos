export interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  countryCode: string;
  admin1?: string;
  timezone?: string;
}
export interface CityViewModel {
  city: City;
  weather: WeatherSnapshot;
  airQuality: AirQualitySnapshot;
  country: CountryDetails;
}
export interface WeatherSnapshot {
  current: { temperature: number; windSpeed: number; weatherCode: number };
  daily: { date: string; max: number; min: number; weatherCode: number }[];
}
export interface AirQualitySnapshot {
  pm25: number;
  pm10: number;
  europeanIndex: number;
}
export interface CountryDetails {
  name: string;
  capital: string;
  population: number;
  currencies: string[];
  languages: string[];
  flag: string;
}
