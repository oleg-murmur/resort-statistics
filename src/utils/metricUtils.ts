import { METRIC_DESCRIPTIONS, METRIC_THRESHOLDS, METRIC_UNITS } from '../constants/metrics'
import {
    MetricType,
    FullMetricDescription,
    HighOnlyMetricDescription,
    HighLowWarningMetricDescription,
} from '../types/chart'

export const getMetricDescription = (metric: MetricType, value: number, locale: 'en' | 'ru'): string => {
    const thresholds = METRIC_THRESHOLDS[metric]
    const descriptions = METRIC_DESCRIPTIONS[metric][locale]

    switch (metric) {
        case 'temperature':
        case 'humidity': {
            const desc = descriptions as FullMetricDescription
            if (value < thresholds.min) return desc.critical.low
            if (value > thresholds.max) return desc.critical.high
            if (value < thresholds.warningMin) return desc.warning.low
            if (value > thresholds.warningMax) return desc.warning.high
            break
        }
        case 'precipitation': {
            const desc = descriptions as HighOnlyMetricDescription
            if (value > thresholds.max) return desc.critical.high
            if (value > thresholds.warningMax) return desc.warning.high
            break
        }
        case 'visitorCount': {
            const desc = descriptions as HighLowWarningMetricDescription
            if (value > thresholds.max) return desc.critical.high
            if (value > thresholds.warningMax) return desc.warning.high
            if (value < thresholds.warningMin) return desc.warning.low
            break
        }
    }

    return descriptions.normal
}

export const formatMetricValue = (metric: MetricType, value: number): string => {
    if (metric === 'visitorCount') {
        return Math.round(value).toLocaleString('ru')
    }
    return value.toFixed(1)
}

export const getMetricUnit = (metric: MetricType): string => {
    return METRIC_UNITS[metric]
}

export const getFormattedMetricValue = (metric: MetricType, value: number, locale: 'en' | 'ru'): string => {
    const formattedValue = formatMetricValue(metric, value)
    const unit = getMetricUnit(metric)
    const description = getMetricDescription(metric, value, locale)

    return `${formattedValue}${unit} ${description}`
}
