import {
    getMetricDescription,
    formatMetricValue,
    getMetricUnit,
    getFormattedMetricValue,
} from '../metricUtils'

describe('metricUtils', () => {
    describe('getMetricDescription', () => {
        it('should return correct description for temperature in Russian', () => {
            expect(getMetricDescription('temperature', 15, 'ru')).toBe('❄️ Холодно')
            expect(getMetricDescription('temperature', 25, 'ru')).toBe('🌡️ Комфортно')
            expect(getMetricDescription('temperature', 38, 'ru')).toBe('🔥 Жарко')
        })

        it('should return correct description for temperature in English', () => {
            expect(getMetricDescription('temperature', 15, 'en')).toBe('❄️ Cold')
            expect(getMetricDescription('temperature', 25, 'en')).toBe('🌡️ Comfortable')
            expect(getMetricDescription('temperature', 38, 'en')).toBe('🔥 Hot')
        })

        it('should return correct description for humidity in Russian', () => {
            expect(getMetricDescription('humidity', 25, 'ru')).toBe('🏜️ Сухо')
            expect(getMetricDescription('humidity', 60, 'ru')).toBe('🌤️ Нормальная')
            expect(getMetricDescription('humidity', 90, 'ru')).toBe('🌧️ Влажно')
        })

        it('should return correct description for humidity in English', () => {
            expect(getMetricDescription('humidity', 25, 'en')).toBe('🏜️ Dry')
            expect(getMetricDescription('humidity', 60, 'en')).toBe('🌤️ Normal')
            expect(getMetricDescription('humidity', 90, 'en')).toBe('🌧️ Humid')
        })

        it('should return correct description for precipitation in Russian', () => {
            expect(getMetricDescription('precipitation', 50, 'ru')).toBe('☀️ Слабые')
            expect(getMetricDescription('precipitation', 150, 'ru')).toBe('🌦️ Умеренные')
            expect(getMetricDescription('precipitation', 250, 'ru')).toBe('🌧️ Сильные')
        })

        it('should return correct description for precipitation in English', () => {
            expect(getMetricDescription('precipitation', 50, 'en')).toBe('☀️ Low')
            expect(getMetricDescription('precipitation', 150, 'en')).toBe('🌦️ Moderate')
            expect(getMetricDescription('precipitation', 250, 'en')).toBe('🌧️ Heavy')
        })

        it('should return correct description for visitorCount in Russian', () => {
            expect(getMetricDescription('visitorCount', 1000, 'ru')).toBe('👤 Мало')
            expect(getMetricDescription('visitorCount', 8000, 'ru')).toBe('👥 Нормально')
            expect(getMetricDescription('visitorCount', 14000, 'ru')).toBe('👥 Многолюдно')
        })

        it('should return correct description for visitorCount in English', () => {
            expect(getMetricDescription('visitorCount', 1000, 'en')).toBe('👤 Low')
            expect(getMetricDescription('visitorCount', 8000, 'en')).toBe('👥 Normal')
            expect(getMetricDescription('visitorCount', 14000, 'en')).toBe('👥 Crowded')
        })
    })

    describe('formatMetricValue', () => {
        it('should format visitor count with thousand separators', () => {
            expect(formatMetricValue('visitorCount', 1234)).toBe('1 234')
            expect(formatMetricValue('visitorCount', 12345)).toBe('12 345')
        })

        it('should format other metrics with one decimal place', () => {
            expect(formatMetricValue('temperature', 25.567)).toBe('25.6')
            expect(formatMetricValue('humidity', 60.123)).toBe('60.1')
            expect(formatMetricValue('precipitation', 100.789)).toBe('100.8')
        })
    })

    describe('getMetricUnit', () => {
        it('should return correct units for each metric', () => {
            expect(getMetricUnit('temperature')).toBe('°C')
            expect(getMetricUnit('humidity')).toBe('%')
            expect(getMetricUnit('precipitation')).toBe('мм')
            expect(getMetricUnit('visitorCount')).toBe('чел.')
        })
    })

    describe('getFormattedMetricValue', () => {
        it('should format temperature correctly in Russian', () => {
            expect(getFormattedMetricValue('temperature', 25.6, 'ru')).toBe('25.6°C 🌡️ Комфортно')
        })

        it('should format temperature correctly in English', () => {
            expect(getFormattedMetricValue('temperature', 25.6, 'en')).toBe('25.6°C 🌡️ Comfortable')
        })

        it('should format humidity correctly in Russian', () => {
            expect(getFormattedMetricValue('humidity', 60.3, 'ru')).toBe('60.3% 🌤️ Нормальная')
        })

        it('should format humidity correctly in English', () => {
            expect(getFormattedMetricValue('humidity', 60.3, 'en')).toBe('60.3% 🌤️ Normal')
        })

        it('should format precipitation correctly in Russian', () => {
            expect(getFormattedMetricValue('precipitation', 50.8, 'ru')).toBe('50.8мм ☀️ Слабые')
        })

        it('should format precipitation correctly in English', () => {
            expect(getFormattedMetricValue('precipitation', 50.8, 'en')).toBe('50.8мм ☀️ Low')
        })

        it('should format visitor count correctly in Russian', () => {
            expect(getFormattedMetricValue('visitorCount', 8500, 'ru')).toBe('8 500чел. 👥 Нормально')
        })

        it('should format visitor count correctly in English', () => {
            expect(getFormattedMetricValue('visitorCount', 8500, 'en')).toBe('8 500чел. 👥 Normal')
        })
    })
})
