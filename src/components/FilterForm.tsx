import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    SelectChangeEvent,
    Typography,
    Paper,
    Button,
    ButtonGroup,
    Chip,
} from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resorts } from '../constants/resorts'
import { useLocale } from '../contexts/LocaleContext'
import { RootState } from '../store'
import {
    addResortToComparison,
    removeResortFromComparison,
    setDateRange,
    setSelectedMetric,
} from '../store/filtersSlice'

interface Metric {
    id: string
    label: string
}

const PRESET_RANGES = [
    { label: 'last50Years', years: 50 },
    { label: 'last20Years', years: 20 },
    { label: 'last10Years', years: 10 },
    { label: 'last5Years', years: 5 },
    { label: 'lastYear', years: 1 },
    { label: 'last6Months', months: 6 },
    { label: 'last3Months', months: 3 },
]

const FilterForm = () => {
    const dispatch = useDispatch()
    const { t, locale } = useLocale()
    const { selectedResorts, dateRange, selectedMetric } = useSelector(
        (state: RootState) => state.filters,
    )

    const handleResortChange = useCallback(
        (event: SelectChangeEvent<string>) => {
            const resortId = event.target.value
            if (!selectedResorts.includes(resortId)) {
                dispatch(addResortToComparison(resortId))
            }
        },
        [dispatch, selectedResorts],
    )

    const handleRemoveResort = useCallback(
        (resortId: string) => {
            dispatch(removeResortFromComparison(resortId))
        },
        [dispatch],
    )

    const handleDateChange = useCallback(
        (field: 'start' | 'end') => (event: React.ChangeEvent<HTMLInputElement>) => {
            const newDate = event.target.value
            const startDate = field === 'start' ? newDate : dateRange.start
            const endDate = field === 'end' ? newDate : dateRange.end

            // Check if the date difference exceeds 50 years
            const start = new Date(startDate)
            const end = new Date(endDate)
            const diffInYears = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365)

            if (diffInYears > 50) {
                // If it exceeds, set the maximum allowed period
                const maxEndDate = new Date(start)
                maxEndDate.setFullYear(start.getFullYear() + 50)

                dispatch(
                    setDateRange({
                        start: startDate,
                        end: maxEndDate.toISOString().split('T')[0],
                    }),
                )
            } else {
                dispatch(
                    setDateRange({
                        ...dateRange,
                        [field]: newDate,
                    }),
                )
            }
        },
        [dispatch, dateRange],
    )

    const handleMetricChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setSelectedMetric(event.target.value))
        },
        [dispatch],
    )

    const handlePresetRange = useCallback(
        (preset: (typeof PRESET_RANGES)[0]) => {
            const endDate = new Date()
            const startDate = new Date()

            if (preset.years) {
                startDate.setFullYear(endDate.getFullYear() - preset.years)
            } else if (preset.months) {
                startDate.setMonth(endDate.getMonth() - preset.months)
            }

            dispatch(
                setDateRange({
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0],
                }),
            )
        },
        [dispatch],
    )

    return (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant='h5' gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                {t('common.resortStats')}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>{t('common.selectResorts')}</InputLabel>
                    <Select
                        value=''
                        onChange={handleResortChange}
                        label={t('common.selectResorts')}
                        sx={{ '& .MuiSelect-select': { py: 1.5 } }}
                    >
                        {resorts.map((resort) => (
                            <MenuItem
                                key={resort.id}
                                value={resort.id}
                                disabled={selectedResorts.includes(resort.id)}
                            >
                                {resort.name[locale]}
                            </MenuItem>
                        ))}
                    </Select>
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedResorts.map((resortId) => {
                            const resort = resorts.find((r) => r.id === resortId)
                            return (
                                <Chip
                                    key={resortId}
                                    label={resort?.name[locale]}
                                    onDelete={() => handleRemoveResort(resortId)}
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '& .MuiChip-deleteIcon': {
                                            color: 'white',
                                        },
                                    }}
                                />
                            )
                        })}
                    </Box>
                </FormControl>

                <Box>
                    <Typography variant='subtitle1' gutterBottom>
                        {t('common.selectPeriod')}
                    </Typography>
                    <ButtonGroup variant='outlined' sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                        {PRESET_RANGES.map((preset) => (
                            <Button
                                key={preset.label}
                                onClick={() => handlePresetRange(preset)}
                                sx={{
                                    borderRadius: 2,
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                    },
                                }}
                            >
                                {t(`common.${preset.label}`)}
                            </Button>
                        ))}
                    </ButtonGroup>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label={t('common.startDate')}
                            type='date'
                            value={dateRange.start}
                            onChange={handleDateChange('start')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    py: 1,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        '& fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                },
                                '& input': {
                                    cursor: 'pointer',
                                },
                            }}
                        />
                        <TextField
                            label={t('common.endDate')}
                            type='date'
                            value={dateRange.end}
                            onChange={handleDateChange('end')}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    py: 1,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        '& fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                },
                                '& input': {
                                    cursor: 'pointer',
                                },
                            }}
                        />
                    </Box>
                </Box>

                <FormControl>
                    <Typography variant='subtitle1' gutterBottom>
                        {t('common.selectMetric')}
                    </Typography>
                    <RadioGroup
                        value={selectedMetric}
                        onChange={handleMetricChange}
                        sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}
                    >
                        {Object.entries(t('metrics')).map(([id, label]) => (
                            <FormControlLabel
                                key={id}
                                value={id}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                }
                                label={label}
                                sx={{
                                    '& .MuiFormControlLabel-label': {
                                        fontSize: '1rem',
                                    },
                                }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Paper>
    )
}

export default FilterForm
