import { Box, Paper, Typography, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Divider } from '@mui/material'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartEvent,
    ActiveElement,
} from 'chart.js'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { getResortData } from '../constants/resortData'
import { useLocale } from '../contexts/LocaleContext'
import { useChartData } from '../hooks/useChartData'
import { RootState } from '../store'
import { MetricType } from '../types/chart'
import { getFormattedMetricValue } from '../utils/metricUtils'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface SelectedPoint {
    resortName: string
    resortId: string
    date: string
    value: number
    formattedDate: string
}

const ResortChart = () => {
    const { selectedResorts, dateRange, selectedMetric } = useSelector((state: RootState) => ({
        ...state.filters,
        selectedMetric: state.filters.selectedMetric as MetricType,
    }))
    const { t, locale } = useLocale()
    const [showData, setShowData] = useState(true)
    const [showTrend, setShowTrend] = useState(true)
    const [selectedPoint, setSelectedPoint] = useState<SelectedPoint | null>(null)

    const { chartData, chartOptions } = useChartData({
        selectedResorts,
        dateRange,
        selectedMetric,
        showData,
        showTrend,
    })

    const handlePointClick = (event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex
            const pointIndex = elements[0].index

            // Проверяем, что это не точка тренда
            if (datasetIndex < selectedResorts.length) {
                const resortId = selectedResorts[datasetIndex]
                const resortName = chartData.datasets[datasetIndex].label as string
                const date = chartData.labels[pointIndex] as string
                const value = chartData.datasets[datasetIndex].data[pointIndex] as number

                // Преобразуем название месяца в дату
                const currentYear = new Date().getFullYear()
                let monthIndex: number

                // Маппинг русских названий месяцев
                const ruMonths: { [key: string]: number } = {
                    'январь': 0, 'февраль': 1, 'март': 2, 'апрель': 3,
                    'май': 4, 'июнь': 5, 'июль': 6, 'август': 7,
                    'сентябрь': 8, 'октябрь': 9, 'ноябрь': 10, 'декабрь': 11,
                }

                // Маппинг английских названий месяцев
                const enMonths: { [key: string]: number } = {
                    'january': 0, 'february': 1, 'march': 2, 'april': 3,
                    'may': 4, 'june': 5, 'july': 6, 'august': 7,
                    'september': 8, 'october': 9, 'november': 10, 'december': 11,
                }

                const monthName = date.toLowerCase()
                monthIndex = locale === 'ru' ? ruMonths[monthName] : enMonths[monthName]
                
                if (monthIndex === undefined) {
                    console.error('Could not parse month:', date)
                    monthIndex = new Date().getMonth() // Используем текущий месяц как запасной вариант
                }

                // Используем текущий год для тестовых данных
                const formattedDate = `2024-${String(monthIndex + 1).padStart(2, '0')}-15`

                console.log('Date conversion:', {
                    original: date,
                    monthName,
                    monthIndex,
                    formattedDate,
                })

                setSelectedPoint({
                    resortName,
                    resortId,
                    date,
                    value,
                    formattedDate,
                })
            }
        }
    }

    const handleCloseModal = () => {
        setSelectedPoint(null)
    }

    const renderAdditionalInfo = () => {
        if (!selectedPoint) return null

        const resortInfo = getResortData(selectedPoint.resortId, selectedPoint.formattedDate)
        if (!resortInfo) return null

        return (
            <>
                <Divider sx={{ my: 2 }} />
                {resortInfo.news.length > 0 && (
                    <>
                        <Typography variant='h6' gutterBottom>
                            {t('common.news')}
                        </Typography>
                        <List>
                            {resortInfo.news.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.title[locale]}
                                        secondary={item.description[locale]}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                {resortInfo.facts.length > 0 && (
                    <>
                        <Typography variant='h6' gutterBottom>
                            {t('common.facts')}
                        </Typography>
                        <List>
                            {resortInfo.facts.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.title[locale]}
                                        secondary={item.description[locale]}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
                {resortInfo.recommendations.length > 0 && (
                    <>
                        <Typography variant='h6' gutterBottom>
                            {t('common.recommendations')}
                        </Typography>
                        <List>
                            {resortInfo.recommendations.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={item.title[locale]}
                                        secondary={item.description[locale]}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </>
        )
    }

    return (
        <Paper elevation={3} sx={{ p: 3, height: '600px', mt: 4 }}>
            <Box sx={{ height: '100%', position: 'relative' }}>
                {selectedResorts.length > 0 ? (
                    <>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Button
                                variant={showData ? 'contained' : 'outlined'}
                                onClick={() => setShowData(!showData)}
                                sx={{
                                    borderRadius: 2,
                                    minWidth: '140px',
                                    '&:hover': {
                                        backgroundColor: showData ? 'primary.main' : 'transparent',
                                    },
                                }}
                            >
                                {showData ? t('common.hideData') : t('common.showData')}
                            </Button>
                            <Button
                                variant={showTrend ? 'contained' : 'outlined'}
                                onClick={() => setShowTrend(!showTrend)}
                                sx={{
                                    borderRadius: 2,
                                    minWidth: '140px',
                                    '&:hover': {
                                        backgroundColor: showTrend ? 'primary.main' : 'transparent',
                                    },
                                }}
                            >
                                {showTrend ? t('common.hideTrends') : t('common.showTrends')}
                            </Button>
                        </Box>
                        <Box sx={{ height: 'calc(100% - 100px)' }}>
                            <Line
                                options={{
                                    ...chartOptions,
                                    onClick: handlePointClick,
                                }}
                                data={chartData}
                            />
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: 'rgba(255, 0, 0, 0.8)',
                                        borderRadius: '50%',
                                    }}
                                />
                                <Typography variant='body2' color='white'>
                                    {t('common.unfavorableConditions')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                    sx={{
                                        width: 12,
                                        height: 12,
                                        backgroundColor: 'rgba(255, 165, 0, 0.8)',
                                        borderRadius: '50%',
                                    }}
                                />
                                <Typography variant='body2' color='white'>
                                    {t('common.notRecommended')}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                        }}
                    >
                        <Typography variant='h6'>{t('common.selectResortsMessage')}</Typography>
                    </Box>
                )}
            </Box>

            <Dialog
                open={!!selectedPoint}
                onClose={handleCloseModal}
                maxWidth='sm'
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        backgroundImage: 'none',
                    },
                }}
            >
                <DialogTitle>
                    {selectedPoint?.resortName}
                </DialogTitle>
                <DialogContent>
                    <Typography variant='subtitle1' gutterBottom>
                        {selectedPoint?.date}
                    </Typography>
                    <Typography variant='body1' gutterBottom>
                        {t(`metrics.${selectedMetric}`)}: {getFormattedMetricValue(selectedMetric, selectedPoint?.value || 0, locale)}
                    </Typography>
                    {renderAdditionalInfo()}
                </DialogContent>
            </Dialog>
        </Paper>
    )
}

export default ResortChart
