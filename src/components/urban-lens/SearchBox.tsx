"use client"

import * as React from "react"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchCities } from "@/lib/api-service"
import { cn } from "@/lib/utils"

interface SearchBoxProps {
  onCitySelect: (city: any) => void;
}

export function SearchBox({ onCitySelect }: SearchBoxProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 1) {
        setIsLoading(true)
        const data = await searchCities(query)
        setResults(data)
        setIsLoading(false)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-primary animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-slate-300 group-focus-within:text-primary transition-colors" />
          )}
        </div>
        <Input
          type="text"
          placeholder="Search city..."
          className="w-full pl-10 pr-4 h-12 bg-white border-slate-100 rounded-xl text-base font-body shadow-sm focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-slate-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          <ul className="divide-y divide-slate-50">
            {results.map((city) => (
              <li key={city.id}>
                <button
                  onClick={() => {
                    onCitySelect(city)
                    setQuery("")
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 text-left transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-slate-50 group-hover:bg-primary/10">
                    <MapPin className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                  </div>
                  <div>
                    <div className="font-headline font-bold text-slate-900 text-sm">{city.name}</div>
                    <div className="text-[9px] text-slate-400">
                      {city.admin1 ? `${city.admin1}, ` : ""}{city.country}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
