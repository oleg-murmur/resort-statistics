export interface ResortEvent {
    id: string
    title: {
        en: string
        ru: string
    }
    description: {
        en: string
        ru: string
    }
    type: 'event' | 'news'
    date: string
    resortId: string
}

export const MOCK_EVENTS: ResortEvent[] = [
    {
        id: '1',
        title: {
            en: 'Traditional Balinese Festival',
            ru: 'Традиционный балийский фестиваль',
        },
        description: {
            en: 'Experience the vibrant culture of Bali during the annual traditional festival.',
            ru: 'Погрузитесь в яркую культуру Бали во время ежегодного традиционного фестиваля.',
        },
        type: 'event',
        date: '2024-01-15',
        resortId: '1',
    },
    {
        id: '2',
        title: {
            en: 'Beach Cleanup Initiative',
            ru: 'Инициатива по очистке пляжа',
        },
        description: {
            en: 'Join the local community in keeping our beaches clean and beautiful.',
            ru: 'Присоединяйтесь к местному сообществу в поддержании чистоты и красоты наших пляжей.',
        },
        type: 'news',
        date: '2024-01-20',
        resortId: '1',
    },
    {
        id: '3',
        title: {
            en: 'Phuket Vegetarian Festival',
            ru: 'Вегетарианский фестиваль на Пхукете',
        },
        description: {
            en: 'Annual festival celebrating vegetarian cuisine and spiritual cleansing.',
            ru: 'Ежегодный фестиваль, посвященный вегетарианской кухне и духовному очищению.',
        },
        type: 'event',
        date: '2024-02-10',
        resortId: '2',
    },
    {
        id: '4',
        title: {
            en: 'New Marine Protection Zone',
            ru: 'Новая зона морской защиты',
        },
        description: {
            en: 'Local authorities establish new protected areas for marine life conservation.',
            ru: 'Местные власти создают новые охраняемые зоны для сохранения морской жизни.',
        },
        type: 'news',
        date: '2024-02-15',
        resortId: '2',
    },
]

export const getResortEvents = (resortId: string, date: string): ResortEvent[] => {
    const eventDate = new Date(date)
    const monthStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1)
    const monthEnd = new Date(eventDate.getFullYear(), eventDate.getMonth() + 1, 0)

    return MOCK_EVENTS.filter(
        (event) =>
            event.resortId === resortId &&
            new Date(event.date) >= monthStart &&
            new Date(event.date) <= monthEnd,
    )
} 