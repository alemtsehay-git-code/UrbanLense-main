# 🌍 UrbanLens

> **Atmospheric Intelligence for the Modern Traveler**

UrbanLens is a cutting-edge web application that combines real-time weather data, geographical insights, and AI-powered travel suggestions to provide concise, actionable city intelligence for travelers worldwide.

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Features

- 🌡️ **Real-Time Weather Data** - Get current weather conditions, temperature, humidity, and wind speed
- 🗺️ **Geolocation Detection** - Automatically detect user location on first visit
- 🔍 **Smart City Search** - Search and explore any city worldwide with autocomplete
- 🌐 **Country Information** - Comprehensive country data including population, currency, and flags
- 🤖 **AI-Powered Suggestions** - Personalized travel recommendations powered by Google Generative AI
- 📱 **Responsive Design** - Beautifully optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations
- ⚡ **Fast Performance** - Server-side rendering with Next.js for optimal speed

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with SSR and optimization
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Radix UI** - Headless UI components

### Backend & APIs
- **Google Genkit** - AI-powered flows and integrations
- **Weather API** - Real-time weather data
- **Reverse Geocoding** - Location-based city detection
- **REST APIs** - Custom API integrations

### Development
- **ESLint** - Code quality
- **PostCSS** - CSS processing
- **Node.js 22** - Runtime environment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 22.x or higher
- **npm** or **yarn** package manager
- A modern web browser

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/urbanlens.git
cd urbanlens
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
NEXT_PUBLIC_GOOGLE_GENKIT_API_KEY=your_genkit_api_key
NEXT_PUBLIC_REVERSE_GEOCODING_API_KEY=your_geocoding_api_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📚 Usage

### Basic Workflow

1. **Allow Geolocation** - On first visit, grant permission for automatic location detection
2. **Search a City** - Use the search box to find any city worldwide
3. **View Insights** - See real-time weather, country information, and key metrics
4. **Get AI Suggestions** - Click "Create Travel Plan" to get personalized recommendations

### API Integration

The application integrates with multiple APIs:

- **Weather API** - Fetches real-time weather conditions
- **Country API** - Retrieves country-specific information (population, currency, flag)
- **Google Genkit** - Generates AI-powered travel suggestions based on city data

## 📁 Project Structure

```
urbanlens/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main page component
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   └── urban-lens/           # Feature-specific components
│   │       ├── SearchBox.tsx     # City search component
│   │       ├── SuggestionCard.tsx # AI suggestions display
│   │       └── WeatherIcons.tsx  # Weather icon components
│   ├── lib/
│   │   ├── api-service.ts        # API calls and data fetching
│   │   ├── utils.ts              # Utility functions
│   │   └── placeholder-images.ts # Image assets
│   ├── hooks/
│   │   ├── use-mobile.tsx        # Mobile detection hook
│   │   └── use-toast.ts          # Toast notification hook
│   └── ai/
│       ├── genkit.ts             # Genkit configuration
│       └── flows/
│           └── generate-travel-suggestion-flow.ts # AI flow
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🔧 Configuration

### Tailwind CSS
Customize the design system in `tailwind.config.ts`:
```typescript
// Define custom colors, fonts, spacing, etc.
```

### Next.js
Modify build and runtime behavior in `next.config.ts`.

### TypeScript
Adjust type checking in `tsconfig.json`.

## 🧪 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

## 🌍 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `getCityDetails(lat, lon)` | Fetch weather and country info for coordinates |
| `reverseGeocode(lat, lon)` | Get city name from coordinates |
| `generateTravelSuggestion(data)` | Generate AI-powered travel recommendations |

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms
- **Netlify** - `npm run build` then connect repository
- **Docker** - Create `Dockerfile` for containerization
- **AWS** - Use EC2 or Elastic Beanstalk

## 🎨 Customization

### Themes & Colors
Modify the primary color and design tokens in `tailwind.config.ts`.

### Fonts
Add custom fonts in `app/globals.css` using `@font-face` or web fonts.

### Components
All UI components are located in `components/ui/` and can be customized.

## 🐛 Troubleshooting

### Geolocation Not Working
- Ensure HTTPS is enabled (required for geolocation)
- Check browser permissions for location access
- Verify CORS settings for API calls

### API Errors
- Check `.env.local` for valid API keys
- Ensure internet connection is stable
- Verify API rate limits haven't been exceeded

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 22+)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact & Support

For questions, issues, or suggestions:

- **Email**: support@urbanlens.app
- **GitHub Issues**: [Report a bug](https://github.com/yourusername/urbanlens/issues)
- **Documentation**: [Full docs](https://docs.urbanlens.app)

---

**Designed for Appsrow Solution LLP**

Made with ❤️ using Next.js, TypeScript, and AI
