export interface Resort {
    id: string
    name: string
    location: string
    description: string
}

export interface WeatherData {
    date: string
    temperature: number
    humidity: number
    precipitation: number
}

export interface TouristData {
    date: string
    visitorCount: number
}

export interface ResortStats {
    resortId: string
    weatherData: WeatherData[]
    touristData: TouristData[]
}

export interface FilterState {
    selectedResort: string
    dateRange: {
        start: string
        end: string
    }
    metrics: string[]
}
