export interface GeocodingResponse {
  results?: GeocodingResult[];
}
export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone?: string;
}
export interface ForecastResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}
export interface AirQualityResponse {
  current: { pm2_5: number; pm10: number; european_aqi: number };
}
export interface CountryApiResponse {
  name: string;
  capital?: string;
  population: number;
  currencies: { code: string; name: string; symbol?: string }[];
  languages: { name: string }[];
  flag: string;
}
