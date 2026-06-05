import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, CloudFog } from "lucide-react"

export function WeatherIcon({ code, className }: { code: number; className?: string }) {
  if (code === 0) return <Sun className={className} />
  if (code <= 3) return <Cloud className={className} />
  if (code <= 48) return <CloudFog className={className} />
  if (code <= 55) return <CloudRain className={className} />
  if (code <= 65) return <CloudRain className={className} />
  if (code <= 75) return <CloudSnow className={className} />
  if (code <= 99) return <CloudLightning className={className} />
  return <Cloud className={className} />
}

export { Wind, Droplets }
