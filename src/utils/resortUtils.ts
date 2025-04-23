import { formatDateLabel } from './chartUtils'

import { MockData, ResortBaseData, PeriodType } from '../types/chart'

const RESORT_BASE_DATA: Record<string, ResortBaseData> = {
    '1': {
        // Бали
        temperature: { base: 28, variation: 3 },
        humidity: { base: 75, variation: 10 },
        precipitation: { base: 100, variation: 150 },
        visitorCount: { base: 12000, variation: 5000 },
        windSpeed: { base: 5, variation: 3 },
    },
    '2': {
        // Пхукет
        temperature: { base: 30, variation: 2 },
        humidity: { base: 80, variation: 8 },
        precipitation: { base: 150, variation: 200 },
        visitorCount: { base: 10000, variation: 4000 },
        windSpeed: { base: 7, variation: 4 },
    },
    '3': {
        // Канкун
        temperature: { base: 27, variation: 4 },
        humidity: { base: 70, variation: 12 },
        precipitation: { base: 80, variation: 120 },
        visitorCount: { base: 8000, variation: 3000 },
        windSpeed: { base: 6, variation: 3 },
    },
    '4': {
        // Мальдивы
        temperature: { base: 29, variation: 2 },
        humidity: { base: 78, variation: 7 },
        precipitation: { base: 120, variation: 180 },
        visitorCount: { base: 6000, variation: 2000 },
        windSpeed: { base: 4, variation: 2 },
    },
}

export const getResortBaseData = (resortId: string): ResortBaseData => {
    return RESORT_BASE_DATA[resortId] || RESORT_BASE_DATA['1']
}

export const generateMockData = (
    startDate: string,
    endDate: string,
    resortId: string,
    period: PeriodType,
    locale: 'en' | 'ru',
): MockData => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const resortBaseData = getResortBaseData(resortId)

    const labels: string[] = []
    const currentDate = new Date(start)

    while (currentDate <= end) {
        // Добавляем основную точку
        labels.push(formatDateLabel(new Date(currentDate), period, locale))

        // Добавляем промежуточную точку
        const intermediateDate = new Date(currentDate)
        switch (period) {
            case 'month':
                intermediateDate.setDate(intermediateDate.getDate() + 15)
                if (intermediateDate <= end) {
                    labels.push(formatDateLabel(intermediateDate, period, locale))
                }
                currentDate.setMonth(currentDate.getMonth() + 1)
                break
            case 'quarter':
                intermediateDate.setMonth(intermediateDate.getMonth() + 3)
                if (intermediateDate <= end) {
                    labels.push(formatDateLabel(intermediateDate, period, locale))
                }
                currentDate.setMonth(currentDate.getMonth() + 6)
                break
            case 'year':
                intermediateDate.setMonth(intermediateDate.getMonth() + 6)
                if (intermediateDate <= end) {
                    labels.push(formatDateLabel(intermediateDate, period, locale))
                }
                currentDate.setFullYear(currentDate.getFullYear() + 1)
                break
        }
    }

    const generateAggregatedData = (base: number, variation: number): number[] => {
        return labels.map(() => {
            // Для более длительных периодов уменьшаем вариацию
            const periodVariation =
                variation * (period === 'year' ? 0.3 : period === 'quarter' ? 0.5 : 0.7)
            const random = base + (Math.random() - 0.5) * periodVariation * 2
            return Math.max(0, random)
        })
    }

    return {
        labels,
        temperature: generateAggregatedData(
            resortBaseData.temperature.base,
            resortBaseData.temperature.variation,
        ),
        humidity: generateAggregatedData(
            resortBaseData.humidity.base,
            resortBaseData.humidity.variation,
        ),
        precipitation: generateAggregatedData(
            resortBaseData.precipitation.base,
            resortBaseData.precipitation.variation,
        ),
        visitorCount: generateAggregatedData(
            resortBaseData.visitorCount.base,
            resortBaseData.visitorCount.variation,
        ),
        windSpeed: generateAggregatedData(
            resortBaseData.windSpeed.base,
            resortBaseData.windSpeed.variation,
        ),
    }
}
