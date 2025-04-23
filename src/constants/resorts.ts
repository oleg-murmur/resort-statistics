export interface Resort {
    id: string
    name: {
        en: string
        ru: string
    }
}

export const resorts: Resort[] = [
    { 
        id: '1', 
        name: {
            en: 'Bali, Indonesia',
            ru: 'Бали, Индонезия',
        },
    },
    { 
        id: '2', 
        name: {
            en: 'Phuket, Thailand',
            ru: 'Пхукет, Таиланд',
        },
    },
    { 
        id: '3', 
        name: {
            en: 'Cancun, Mexico',
            ru: 'Канкун, Мексика',
        },
    },
    { 
        id: '4', 
        name: {
            en: 'Maldives',
            ru: 'Мальдивы',
        },
    },
]
