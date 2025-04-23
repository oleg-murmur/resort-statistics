import { render, screen } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'

test('renders resort dashboard', () => {
    const component = (
        <Provider store={store}>
            <App />
        </Provider>
    )
    render(component as any)
    const chartElement = screen.getByText(/Resort Statistics/i)
    expect(chartElement).toBeInTheDocument()
})
