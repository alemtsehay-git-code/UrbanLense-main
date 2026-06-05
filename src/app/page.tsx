"use client"

import * as React from "react"
import { SearchBox } from "@/components/urban-lens/SearchBox"
import { WeatherIcon, Wind, Droplets } from "@/components/urban-lens/WeatherIcons"
import { SuggestionCard } from "@/components/urban-lens/SuggestionCard"
import { getCityDetails, WeatherData, CountryData, reverseGeocode } from "@/lib/api-service"
import { generateTravelSuggestion, GenerateTravelSuggestionOutput } from "@/ai/flows/generate-travel-suggestion-flow"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Globe, Users, Coins, MapPin, AlertCircle, Compass, Sparkles, Menu, X, Moon, Sun } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export default function UrbanLensPage() {
  const [selectedCity, setSelectedCity] = React.useState<any>(null)
  const [weather, setWeather] = React.useState<WeatherData | null>(null)
  const [country, setCountry] = React.useState<CountryData | null>(null)
  const [suggestion, setSuggestion] = React.useState<GenerateTravelSuggestionOutput | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isAiLoading, setIsAiLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [aiError, setAiError] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const fetchAiSuggestion = React.useCallback(async () => {
    if (!selectedCity || !weather || !country) return

    setIsAiLoading(true)
    setAiError(null)
    try {
      const aiResponse = await generateTravelSuggestion({
        cityName: selectedCity.name,
        countryName: country.name,
        temperature: weather.temp,
        weatherCondition: weather.condition,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        population: country.population,
        currency: country.currency
      })
      setSuggestion(aiResponse)
    } catch (err: any) {
      console.error("AI Generation failed:", err)
      const isQuotaError = err.message?.includes('429')
      setAiError(isQuotaError
        ? "Daily AI quota reached for this region. Please try again shortly."
        : "The concierge is momentarily unavailable. Please try again.")
    } finally {
      setIsAiLoading(false)
    }
  }, [selectedCity, weather, country])

  const handleCitySelect = React.useCallback(async (city: any) => {
    setIsLoading(true)
    setError(null)
    setAiError(null)
    setSelectedCity(city)
    setWeather(null)
    setCountry(null)
    setSuggestion(null)

    try {
      const { weather, country } = await getCityDetails(city.latitude, city.longitude, city.country_code)
      setWeather(weather)
      setCountry(country)
    } catch (err) {
      console.error(err)
      setError("Failed to retrieve city data. Please try another location.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const cityData = await reverseGeocode(position.coords.latitude, position.coords.longitude)
            if (cityData) {
              handleCitySelect(cityData)
            }
          } catch (err) {
            console.error("Reverse geocoding failed", err)
          }
        },
        (geoError) => {
          console.warn("Geolocation denied or failed", geoError)
        }
      )
    }
  }, [handleCitySelect])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">



      {/* Hero Header Section */}
      <header className="w-full text-center space-y-2 mb-4 mt-4 md:mt-6 animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-50 text-slate-400 font-code text-[10px] font-bold tracking-widest uppercase border border-slate-100">
          <Sparkles className="h-3 w-3 mr-2 text-primary" />
          Atmospheric Intelligence
        </div>
        <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tighter text-slate-900">
          Urban<span className="text-primary">Lens</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-sm mx-auto font-body font-light">
          Concise city insights for the modern traveler.
        </p>
      </header>

      <div className="w-full max-w-xl z-40">
        <SearchBox onCitySelect={handleCitySelect} />
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-xl rounded-xl border-red-100 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Network Alert</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {(selectedCity || isLoading) && (
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 mt-2">

          <Card className="col-span-1 md:col-span-7 bg-white border-slate-100 rounded-2xl shadow-sm animate-fade-in-up animate-stagger-1 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-5 pb-2">
              <CardTitle className="text-lg md:text-xl font-headline flex items-center gap-2 text-slate-900">
                <div className="p-1.5 rounded-lg bg-blue-50 text-primary">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="truncate">
                  {isLoading && !selectedCity ? <Skeleton className="h-5 w-24" /> : (selectedCity?.name || 'Locating...')}
                </span>
              </CardTitle>
              {weather && (
                <div className="text-primary">
                  <WeatherIcon code={weather.conditionCode} className="h-8 w-8" />
                </div>
              )}
            </CardHeader>
            <CardContent className="p-5 pt-0">
              {isLoading && !weather ? (
                <div className="space-y-4 py-2">
                  <Skeleton className="h-12 w-24" />
                  <Separator className="bg-slate-50" />
                  <div className="grid grid-cols-2 gap-3">
                    <Skeleton className="h-12 rounded-lg" />
                    <Skeleton className="h-12 rounded-lg" />
                  </div>
                </div>
              ) : weather && (
                <div className="space-y-4">
                  <div className="flex items-end gap-1.5 flex-wrap">
                    <span className="text-5xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">{Math.round(weather.temp)}°</span>
                    <span className="text-xl text-slate-300 pb-1.5 font-light">C</span>
                    <div className="flex flex-col ml-3 pb-1.5">
                      <span className="text-lg font-headline font-semibold text-primary leading-tight">{weather.condition}</span>
                      <span className="text-[9px] font-code tracking-widest text-slate-400 uppercase">Local Status</span>
                    </div>
                  </div>

                  <Separator className="bg-slate-50" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                      <div className="p-1 rounded-md bg-white border border-slate-100 shadow-sm">
                        <Droplets className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Humidity</div>
                        <div className="font-headline text-base font-bold text-slate-900">{weather.humidity}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                      <div className="p-1 rounded-md bg-white border border-slate-100 shadow-sm">
                        <Wind className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">Wind</div>
                        <div className="font-headline text-base font-bold text-slate-900">{weather.windSpeed} <span className="text-[9px] font-normal text-slate-400">km/h</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-5 bg-white border-slate-100 rounded-2xl shadow-sm animate-fade-in-up animate-stagger-2">
            <CardHeader className="p-5 pb-2">
              <CardTitle className="text-lg md:text-xl font-headline flex items-center gap-2 text-slate-900">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500">
                  <Globe className="h-4 w-4" />
                </div>
                National
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              {isLoading && !country ? (
                <div className="space-y-4 py-2">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-3/4" />
                  </div>
                </div>
              ) : country && (
                <div className="space-y-4">
                  <div className="relative h-20 w-full rounded-xl overflow-hidden border border-slate-100">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                    <div className="absolute bottom-2 left-3 font-headline font-bold text-lg text-white">
                      {country.name}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Users className="h-3 w-3 opacity-60" />
                        <span>Population</span>
                      </div>
                      <span className="font-headline font-bold text-slate-900">{(country.population / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Coins className="h-3 w-3 opacity-60" />
                        <span>Currency</span>
                      </div>
                      <span className="font-headline font-bold text-slate-900 truncate max-w-[100px]">{country.currency.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <MapPin className="h-3 w-3 opacity-60" />
                        <span>Alpha Code</span>
                      </div>
                      <Badge variant="secondary" className="font-code text-[7px] px-1.5 py-0 bg-indigo-50 text-indigo-600 rounded uppercase tracking-widest">{country.countryCode}</Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="col-span-1 md:col-span-12">
            <SuggestionCard
              suggestion={suggestion}
              isLoading={isAiLoading}
              error={aiError}
              onCreatePlan={fetchAiSuggestion}
              hasCityData={!!weather && !!country}
            />
          </div>

        </div>
      )}

      {!selectedCity && !isLoading && (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 space-y-6 animate-in fade-in duration-500 relative">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 animate-float">
            <Compass className="h-12 w-12 md:h-16 md:w-16 text-slate-200" />
          </div>
          <div className="text-center space-y-2 px-6 max-w-sm">
            <h3 className="text-lg md:text-xl font-headline font-bold text-slate-400 italic">Explore the atmosphere...</h3>
            <p className="text-slate-400 font-body text-xs md:text-sm font-light">
              Discover trends and personalized journeys for any global city.
            </p>
          </div>
        </div>
      )}

      <footer className="w-full border-t border-slate-100 bg-slate-50/50 mt-12 md:mt-16 pt-8 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="flex flex-col items-start md:items-start">
              <h3 className="font-headline font-bold text-slate-900 text-sm mb-2">
                Urban<span className="text-primary">Lens</span>
              </h3>
              <p className="text-slate-500 font-body text-xs leading-relaxed">
                Atmospheric intelligence for modern travelers exploring global cities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-headline font-semibold text-slate-900 text-xs uppercase tracking-widest mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-slate-500 hover:text-primary font-body text-xs transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-primary font-body text-xs transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-primary font-body text-xs transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-primary font-body text-xs transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h4 className="font-headline font-semibold text-slate-900 text-xs uppercase tracking-widest mb-3">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                  <Compass className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                  <Globe className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary transition-colors">
                  <MapPin className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <Separator className="bg-slate-100" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-6 gap-4">
            <p className="text-slate-400 font-code text-[8px] tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} Appsrow Solution LLP. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-slate-400 font-body text-[9px]">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Powered by Atmospheric Intelligence</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
