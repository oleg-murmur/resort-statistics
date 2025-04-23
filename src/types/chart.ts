export interface MockData {
    labels: string[]
    temperature: number[]
    humidity: number[]
    precipitation: number[]
    visitorCount: number[]
    windSpeed: number[]
}

export interface MetricThresholds {
    min: number
    max: number
    warningMin: number
    warningMax: number
}

export interface MetricScale {
    min: number
    max: number
    stepSize: number
}

export interface ResortBaseData {
    temperature: { base: number; variation: number }
    humidity: { base: number; variation: number }
    precipitation: { base: number; variation: number }
    visitorCount: { base: number; variation: number }
    windSpeed: { base: number; variation: number }
}

export interface FullMetricDescription {
    critical: { low: string; high: string }
    warning: { low: string; high: string }
    normal: string
}

export interface HighOnlyMetricDescription {
    critical: { high: string }
    warning: { high: string }
    normal: string
}

export interface HighLowWarningMetricDescription {
    critical: { high: string }
    warning: { high: string; low: string }
    normal: string
}

export interface LocalizedMetricDescription {
    en: FullMetricDescription | HighOnlyMetricDescription | HighLowWarningMetricDescription
    ru: FullMetricDescription | HighOnlyMetricDescription | HighLowWarningMetricDescription
}

export interface MetricDescription {
    critical: { low: string; high: string }
    warning: { low: string; high: string }
    normal: string
}

export type MetricType = 'temperature' | 'humidity' | 'precipitation' | 'visitorCount'
export type PeriodType = 'month' | 'quarter' | 'year'
