import { MetricType, PeriodType } from '../types/chart'

export const roundToNiceNumber = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)))
    const normalized = value / magnitude

    let niceNumber
    if (normalized < 1.5) {
        niceNumber = 1
    } else if (normalized < 3) {
        niceNumber = 2
    } else if (normalized < 7) {
        niceNumber = 5
    } else {
        niceNumber = 10
    }

    return niceNumber * magnitude
}

export const getAggregationPeriod = (startDate: string, endDate: string): PeriodType => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const diffInYears = diffInDays / 365

    if (diffInDays <= 180) return 'month'
    if (diffInYears <= 1) return 'month'
    if (diffInYears <= 5) return 'quarter'
    return 'year'
}

export const formatDateLabel = (date: Date, period: PeriodType, locale: 'en' | 'ru'): string => {
    const monthName = date.toLocaleString(locale, { month: 'long' })
    const quarter = Math.floor(date.getMonth() / 6) + 1
    const year = date.getFullYear()

    switch (period) {
        case 'month':
            return monthName
        case 'quarter':
            return locale === 'ru' 
                ? `${quarter} полугодие ${year}`
                : `${quarter} half ${year}`
        case 'year':
            return `${year}`
        default:
            return monthName
    }
}

export const getMetricScale = (metric: MetricType, data: number[]) => {
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)

    const padding = (maxValue - minValue) * 0.2
    const paddedMax = maxValue + padding
    const paddedMin = Math.max(0, minValue - padding)

    const niceMax = roundToNiceNumber(paddedMax)
    const niceMin = roundToNiceNumber(paddedMin)
    const niceStep = roundToNiceNumber((niceMax - niceMin) / 5)

    switch (metric) {
        case 'temperature':
            return {
                min: Math.min(15, niceMin),
                max: Math.max(40, niceMax),
                stepSize: niceStep,
            }
        case 'humidity':
            return {
                min: Math.min(50, niceMin),
                max: Math.min(100, niceMax),
                stepSize: niceStep,
            }
        case 'precipitation': {
            const precipMax = Math.max(200, niceMax)
            return {
                min: 0,
                max: precipMax,
                stepSize: roundToNiceNumber(precipMax / 5),
            }
        }
        case 'visitorCount': {
            const visitorMax = Math.max(15000, niceMax)
            return {
                min: 0,
                max: visitorMax,
                stepSize: roundToNiceNumber(visitorMax / 5),
            }
        }
    }
}

export const calculateLinearRegression = (x: number[], y: number[]) => {
    const n = x.length
    const sumX = x.reduce((a, b) => a + b, 0)
    const sumY = y.reduce((a, b) => a + b, 0)
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.reduce((sum, xi) => sum + xi * xi, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    return { slope, intercept }
}
