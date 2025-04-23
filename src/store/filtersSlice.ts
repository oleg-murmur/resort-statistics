import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
    selectedResorts: string[]
    dateRange: {
        start: string
        end: string
    }
    selectedMetric: string
}

const getLastYearDateRange = () => {
    const end = new Date()
    const start = new Date()
    start.setFullYear(end.getFullYear() - 1)
    return {
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
    }
}

const initialState: FilterState = {
    selectedResorts: ['1'], // По умолчанию выбран Бали
    dateRange: getLastYearDateRange(),
    selectedMetric: 'visitorCount',
}

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addResortToComparison: (state, action: PayloadAction<string>) => {
            if (
                !state.selectedResorts.includes(action.payload) &&
                state.selectedResorts.length < 3
            ) {
                state.selectedResorts.push(action.payload)
            }
        },
        removeResortFromComparison: (state, action: PayloadAction<string>) => {
            state.selectedResorts = state.selectedResorts.filter((id) => id !== action.payload)
        },
        setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
            state.dateRange = action.payload
        },
        setSelectedMetric: (state, action: PayloadAction<string>) => {
            state.selectedMetric = action.payload
        },
    },
})

export const {
    addResortToComparison,
    removeResortFromComparison,
    setDateRange,
    setSelectedMetric,
} = filtersSlice.actions
export default filtersSlice.reducer
