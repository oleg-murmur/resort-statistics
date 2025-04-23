import { ChartOptions } from 'chart.js'
import { useMemo } from 'react'

import { METRIC_THRESHOLDS } from '../constants/metrics'
import { resorts } from '../constants/resorts'
import { useLocale } from '../contexts/LocaleContext'
import { MetricType } from '../types/chart'
import { calculateLinearRegression } from '../utils/chartUtils'
import { getMetricScale } from '../utils/chartUtils'
import { getAggregationPeriod } from '../utils/chartUtils'
import { getFormattedMetricValue } from '../utils/metricUtils'
import { generateMockData } from '../utils/resortUtils'

interface Resort {
    id: string
    name: {
        en: string
        ru: string
    }
}

interface UseChartDataProps {
    selectedResorts: string[]
    dateRange: { start: string; end: string }
    selectedMetric: MetricType
    showData: boolean
    showTrend: boolean
}

const getPointColor = (metric: MetricType, value: number): string | undefined => {
    const thresholds = METRIC_THRESHOLDS[metric]
    
    switch (metric) {
        case 'temperature':
        case 'humidity': {
            if (value < thresholds.min || value > thresholds.max) return 'rgba(255, 0, 0, 0.8)' // Красный для критических
            if (value < thresholds.warningMin || value > thresholds.warningMax) return 'rgba(255, 165, 0, 0.8)' // Оранжевый для предупреждений
            return undefined // Для нормальных значений используем цвет линии
        }
        case 'precipitation': {
            if (value > thresholds.max) return 'rgba(255, 0, 0, 0.8)'
            if (value > thresholds.warningMax) return 'rgba(255, 165, 0, 0.8)'
            return undefined
        }
        case 'visitorCount': {
            if (value > thresholds.max) return 'rgba(255, 0, 0, 0.8)'
            if (value > thresholds.warningMax || value < thresholds.warningMin) return 'rgba(255, 165, 0, 0.8)'
            return undefined
        }
    }
}

export const useChartData = ({
    selectedResorts,
    dateRange,
    selectedMetric,
    showData,
    showTrend,
}: UseChartDataProps) => {
    const { locale, t } = useLocale()
    const colors = {
        '1': 'rgba(144, 202, 249, 0.8)', // Bali
        '2': 'rgba(244, 143, 177, 0.8)', // Phuket
        '3': 'rgba(255, 183, 77, 0.8)', // Cancun
        '4': 'rgba(129, 199, 132, 0.8)', // Maldives
    } as const

    const period = getAggregationPeriod(dateRange.start, dateRange.end)

    const mockData = useMemo(
        () =>
            selectedResorts.map((resortId) => ({
                resortId,
                data: generateMockData(dateRange.start, dateRange.end, resortId, period, locale),
            })),
        [dateRange.start, dateRange.end, selectedResorts, period, locale],
    )

    const chartData = useMemo(() => {
        const labels = mockData[0]?.data.labels || []
        const datasets = mockData.map(({ resortId, data }) => {
            const values = data[selectedMetric]
            const resort = resorts.find((r) => r.id === resortId)
            const baseColor = colors[resortId as keyof typeof colors]

            // Calculate trend line
            const xValues = Array.from({ length: values.length }, (_, i) => i)
            const numericValues = values.map((v) => Number(v))
            const { slope, intercept } = calculateLinearRegression(xValues, numericValues)
            const trendLine = xValues.map((x) => slope * x + intercept)

            return {
                label: resort?.name[locale],
                data: values,
                borderColor: baseColor,
                backgroundColor: baseColor,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                hidden: !showData,
                pointBackgroundColor: values.map(value => getPointColor(selectedMetric, value) || baseColor),
                pointBorderColor: values.map(value => getPointColor(selectedMetric, value) || baseColor),
            }
        })

        // Add trend lines
        const trendDatasets = mockData.map(({ resortId, data }) => {
            const values = data[selectedMetric]
            const resort = resorts.find((r) => r.id === resortId)
            const xValues = Array.from({ length: values.length }, (_, i) => i)
            const numericValues = values.map((v) => Number(v))
            const { slope, intercept } = calculateLinearRegression(xValues, numericValues)
            const trendLine = xValues.map((x) => slope * x + intercept)

            return {
                label: `${t('common.trend')} ${resort?.name[locale]}`,
                data: trendLine,
                borderColor: colors[resortId as keyof typeof colors],
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderDash: [5, 5],
                pointRadius: 0,
                tension: 0,
                hidden: !showTrend,
            }
        })

        return {
            labels,
            datasets: [...datasets, ...trendDatasets],
        }
    }, [mockData, selectedMetric, colors, showData, showTrend, locale, t])

    const chartOptions: ChartOptions<'line'> = useMemo(() => {
        const allValues = mockData.flatMap(({ data }) => {
            const values = data[selectedMetric]
            return values.map((v) => Number(v))
        })
        const scale = getMetricScale(selectedMetric, allValues)

        return {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                },
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: { size: 14 },
                        padding: 20,
                        boxWidth: 20,
                        usePointStyle: true,
                    },
                },
                title: {
                    display: true,
                    text: `${t('common.comparison')}: ${t(`metrics.${selectedMetric}`)}`,
                    color: '#ffffff',
                    font: {
                        size: 18,
                        weight: 'bold',
                    },
                    padding: { bottom: 30 },
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 30, 30, 0.9)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 8,
                    displayColors: true,
                    callbacks: {
                        label: (context) => {
                            const value = context.parsed.y
                            return `${context.dataset.label}: ${getFormattedMetricValue(
                                selectedMetric,
                                value,
                                locale
                            )}`
                        },
                    },
                },
            },
            scales: {
                y: {
                    min: scale.min,
                    max: scale.max,
                    ticks: {
                        stepSize: scale.stepSize,
                        color: '#ffffff',
                        padding: 10,
                        callback: (value) => {
                            if (selectedMetric === 'visitorCount') {
                                return value.toLocaleString('ru')
                            }
                            return value
                        },
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: true,
                    },
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: true,
                    },
                    ticks: {
                        color: '#ffffff',
                        padding: 10,
                        maxRotation: 45,
                        minRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                },
            },
        }
    }, [mockData, selectedMetric, t])

    return { chartData, chartOptions }
}
