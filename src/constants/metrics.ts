import {
    MetricThresholds,
    FullMetricDescription,
    HighOnlyMetricDescription,
    HighLowWarningMetricDescription,
    LocalizedMetricDescription,
} from '../types/chart'

export const METRICS = [
    { id: 'temperature', label: 'Температура (°C)' },
    { id: 'humidity', label: 'Влажность (%)' },
    { id: 'precipitation', label: 'Осадки (мм)' },
    { id: 'visitorCount', label: 'Количество посетителей (чел.)' },
] as const

export const METRIC_UNITS = {
    temperature: '°C',
    humidity: '%',
    precipitation: 'мм',
    visitorCount: 'чел.',
    windSpeed: 'м/с',
} as const

export const METRIC_THRESHOLDS: Record<string, MetricThresholds> = {
    temperature: {
        min: 20,
        max: 35,
        warningMin: 22,
        warningMax: 32,
    },
    humidity: {
        min: 30,
        max: 85,
        warningMin: 40,
        warningMax: 75,
    },
    precipitation: {
        min: 0,
        max: 200,
        warningMin: 0,
        warningMax: 100,
    },
    visitorCount: {
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
        warningMin: 0,
        warningMax: 12000,
    },
    windSpeed: {
        min: 0,
        max: 15,
        warningMin: 0,
        warningMax: 10,
    },
} as const

type MetricDescriptions = {
    temperature: LocalizedMetricDescription
    humidity: LocalizedMetricDescription
    precipitation: LocalizedMetricDescription
    visitorCount: LocalizedMetricDescription
    windSpeed: LocalizedMetricDescription
}

export const METRIC_DESCRIPTIONS: MetricDescriptions = {
    temperature: {
        en: {
            critical: { low: '❄️ Cold', high: '🔥 Hot' },
            warning: { low: '🌤️ Cool', high: '☀️ Warm' },
            normal: '🌡️ Comfortable',
        },
        ru: {
            critical: { low: '❄️ Холодно', high: '🔥 Жарко' },
            warning: { low: '🌤️ Прохладно', high: '☀️ Тепло' },
            normal: '🌡️ Комфортно',
        },
    },
    humidity: {
        en: {
            critical: { low: '🏜️ Dry', high: '🌧️ Humid' },
            warning: { low: '🌤️ Slightly dry', high: '💧 High' },
            normal: '🌤️ Normal',
        },
        ru: {
            critical: { low: '🏜️ Сухо', high: '🌧️ Влажно' },
            warning: { low: '🌤️ Суховато', high: '💧 Повышенная' },
            normal: '🌤️ Норма',
        },
    },
    precipitation: {
        en: {
            critical: { high: '🌧️ Heavy' },
            warning: { high: '🌦️ Moderate' },
            normal: '☀️ Low',
        },
        ru: {
            critical: { high: '🌧️ Сильные' },
            warning: { high: '🌦️ Умеренные' },
            normal: '☀️ Мало',
        },
    },
    visitorCount: {
        en: {
            critical: { high: '👥 Crowded' },
            warning: { high: '👥 Medium', low: '👤 Low' },
            normal: '👥 Normal',
        },
        ru: {
            critical: { high: '👥 Много' },
            warning: { high: '👥 Средне', low: '👤 Мало' },
            normal: '👥 Норма',
        },
    },
    windSpeed: {
        en: {
            critical: { high: '💨 Strong' },
            warning: { high: '🌬️ Moderate' },
            normal: '🍃 Light',
        },
        ru: {
            critical: { high: '💨 Сильный' },
            warning: { high: '🌬️ Умеренный' },
            normal: '🍃 Легкий',
        },
    },
} as const
