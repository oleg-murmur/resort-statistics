import React, { createContext, useContext, useState, ReactNode } from 'react'

import en from '../locales/en.json'
import ru from '../locales/ru.json'

type Locale = 'en' | 'ru'
type Translations = typeof en

interface LocaleContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const translations: Record<Locale, Translations> = {
    en,
    ru,
}

export const LocaleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('en')

    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations[locale]

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k]
            } else {
                return key
            }
        }

        return value || key
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
    )
}

export const useLocale = (): LocaleContextType => {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider')
    }
    return context
}
