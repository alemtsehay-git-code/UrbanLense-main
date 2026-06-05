export interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionCode: number;
  time: string;
}

export interface CountryData {
  name: string;
  population: number;
  currency: string;
  flag: string;
  countryCode: string;
}

export async function searchCities(query: string) {
  if (query.length < 2) return [];
  const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
  const data = await res.json();
  return data.results || [];
}

export async function reverseGeocode(lat: number, lon: number) {
  const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
  const data = await res.json();
  return {
    name: data.city || data.locality || data.principalSubdivision,
    latitude: lat,
    longitude: lon,
    country_code: data.countryCode,
    country: data.countryName,
    admin1: data.principalSubdivision
  };
}

export async function getCityDetails(lat: number, lon: number, countryCode: string) {
  // Weather
  const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`);
  const weatherJson = await weatherRes.json();
  
  // Country
  const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  const countryJson = await countryRes.json();
  const country = countryJson[0];

  const weather: WeatherData = {
    temp: weatherJson.current.temperature_2m,
    humidity: weatherJson.current.relative_humidity_2m,
    windSpeed: weatherJson.current.wind_speed_10m,
    condition: mapWeatherCode(weatherJson.current.weather_code),
    conditionCode: weatherJson.current.weather_code,
    time: weatherJson.current.time,
  };

  const currencyCode = Object.keys(country.currencies || {})[0] || 'N/A';
  const currencyName = country.currencies?.[currencyCode]?.name || 'N/A';

  const countryData: CountryData = {
    name: country.name.common,
    population: country.population,
    currency: `${currencyName} (${currencyCode})`,
    flag: country.flags.svg || country.flags.png,
    countryCode: country.cca2,
  };

  return { weather, country: countryData };
}

function mapWeatherCode(code: number): string {
  if (code === 0) return 'Clear Sky';
  if (code <= 3) return 'Partly Cloudy';
  if (code <= 48) return 'Foggy';
  if (code <= 55) return 'Drizzle';
  if (code <= 65) return 'Rainy';
  if (code <= 75) return 'Snowy';
  if (code <= 99) return 'Thunderstorm';
  return 'Overcast';
}
