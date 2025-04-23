import {
    roundToNiceNumber,
    getAggregationPeriod,
    formatDateLabel,
    getMetricScale,
    calculateLinearRegression,
} from '../chartUtils'

describe('chartUtils', () => {
    describe('roundToNiceNumber', () => {
        it('should round numbers to nice values', () => {
            expect(roundToNiceNumber(1.4)).toBe(1)
            expect(roundToNiceNumber(2.7)).toBe(2)
            expect(roundToNiceNumber(6.2)).toBe(5)
            expect(roundToNiceNumber(8.9)).toBe(10)
            expect(roundToNiceNumber(142)).toBe(100)
        })
    })

    describe('getAggregationPeriod', () => {
        it('should return month for periods up to 180 days', () => {
            const start = '2024-01-01'
            const end = '2024-06-28' // ~180 days
            expect(getAggregationPeriod(start, end)).toBe('month')
        })

        it('should return month for periods up to 1 year', () => {
            const start = '2024-01-01'
            const end = '2024-12-31'
            expect(getAggregationPeriod(start, end)).toBe('month')
        })

        it('should return quarter for periods between 1 and 5 years', () => {
            const start = '2020-01-01'
            const end = '2024-12-31'
            expect(getAggregationPeriod(start, end)).toBe('quarter')
        })

        it('should return year for periods over 5 years', () => {
            const start = '2015-01-01'
            const end = '2024-12-31'
            expect(getAggregationPeriod(start, end)).toBe('year')
        })
    })

    describe('formatDateLabel', () => {
        it('should format month labels correctly', () => {
            const date = new Date('2024-03-15')
            expect(formatDateLabel(date, 'month')).toBe('март')
        })

        it('should format quarter labels correctly', () => {
            const date = new Date('2024-03-15')
            expect(formatDateLabel(date, 'quarter')).toBe('1 полугодие 2024')
        })

        it('should format year labels correctly', () => {
            const date = new Date('2024-03-15')
            expect(formatDateLabel(date, 'year')).toBe('2024')
        })
    })

    describe('getMetricScale', () => {
        const testData = [25, 30, 35]

        it('should return correct scale for temperature', () => {
            const scale = getMetricScale('temperature', testData)
            expect(scale.min).toBeLessThanOrEqual(15)
            expect(scale.max).toBeGreaterThanOrEqual(40)
            expect(scale.stepSize).toBeGreaterThan(0)
        })

        it('should return correct scale for humidity', () => {
            const scale = getMetricScale('humidity', testData)
            expect(scale.min).toBeLessThanOrEqual(50)
            expect(scale.max).toBeLessThanOrEqual(100)
            expect(scale.stepSize).toBeGreaterThan(0)
        })

        it('should return correct scale for precipitation', () => {
            const scale = getMetricScale('precipitation', testData)
            expect(scale.min).toBe(0)
            expect(scale.max).toBeGreaterThanOrEqual(200)
            expect(scale.stepSize).toBeGreaterThan(0)
        })

        it('should return correct scale for visitor count', () => {
            const scale = getMetricScale('visitorCount', testData)
            expect(scale.min).toBe(0)
            expect(scale.max).toBeGreaterThanOrEqual(15000)
            expect(scale.stepSize).toBeGreaterThan(0)
        })
    })

    describe('calculateLinearRegression', () => {
        it('should calculate correct slope and intercept', () => {
            const x = [1, 2, 3, 4, 5]
            const y = [2, 4, 6, 8, 10] // perfect linear relationship y = 2x
            const result = calculateLinearRegression(x, y)

            expect(result.slope).toBeCloseTo(2, 5)
            expect(result.intercept).toBeCloseTo(0, 5)
        })

        it('should handle flat line', () => {
            const x = [1, 2, 3, 4, 5]
            const y = [5, 5, 5, 5, 5] // flat line y = 5
            const result = calculateLinearRegression(x, y)

            expect(result.slope).toBeCloseTo(0, 5)
            expect(result.intercept).toBeCloseTo(5, 5)
        })

        it('should handle negative slope', () => {
            const x = [1, 2, 3, 4, 5]
            const y = [10, 8, 6, 4, 2] // negative slope y = -2x + 12
            const result = calculateLinearRegression(x, y)

            expect(result.slope).toBeCloseTo(-2, 5)
            expect(result.intercept).toBeCloseTo(12, 5)
        })
    })
})
