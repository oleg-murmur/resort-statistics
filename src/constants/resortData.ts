export interface ResortData {
    id: string
    news: {
        date: string
        title: {
            en: string
            ru: string
        }
        description: {
            en: string
            ru: string
        }
    }[]
    facts: {
        date: string
        title: {
            en: string
            ru: string
        }
        description: {
            en: string
            ru: string
        }
    }[]
    recommendations: {
        date: string
        title: {
            en: string
            ru: string
        }
        description: {
            en: string
            ru: string
        }
    }[]
}

export const resortData: Record<string, ResortData> = {
    '1': {
        id: '1',
        news: [
            {
                date: '2024-01-15',
                title: {
                    en: 'New Beach Cleanup Initiative',
                    ru: 'Новая инициатива по очистке пляжей',
                },
                description: {
                    en: 'Local community launches a new program to keep Bali beaches clean and beautiful.',
                    ru: 'Местное сообщество запускает новую программу по поддержанию чистоты и красоты пляжей Бали.',
                },
            },
            {
                date: '2024-02-01',
                title: {
                    en: 'Cultural Festival Announced',
                    ru: 'Анонсирован культурный фестиваль',
                },
                description: {
                    en: 'Annual cultural festival to showcase traditional Balinese arts and crafts.',
                    ru: 'Ежегодный культурный фестиваль представит традиционные балийские искусства и ремесла.',
                },
            },
            {
                date: '2024-04-15',
                title: {
                    en: 'Spring Festival Season',
                    ru: 'Весенний фестивальный сезон',
                },
                description: {
                    en: 'Bali welcomes spring with a series of cultural festivals and events.',
                    ru: 'Бали встречает весну серией культурных фестивалей и мероприятий.',
                },
            },
        ],
        facts: [
            {
                date: '2024-01-15',
                title: {
                    en: 'Record Visitor Numbers',
                    ru: 'Рекордное количество посетителей',
                },
                description: {
                    en: 'Bali welcomed a record number of visitors this month, surpassing previous records.',
                    ru: 'Бали принял рекордное количество посетителей в этом месяце, превзойдя предыдущие показатели.',
                },
            },
            {
                date: '2024-04-15',
                title: {
                    en: 'Perfect Weather Conditions',
                    ru: 'Идеальные погодные условия',
                },
                description: {
                    en: 'April brings perfect weather conditions with moderate temperatures and low humidity.',
                    ru: 'Апрель приносит идеальные погодные условия с умеренной температурой и низкой влажностью.',
                },
            },
        ],
        recommendations: [
            {
                date: '2024-01-15',
                title: {
                    en: 'Best Time to Visit Temples',
                    ru: 'Лучшее время для посещения храмов',
                },
                description: {
                    en: 'Early morning visits to temples are recommended to avoid crowds and heat.',
                    ru: 'Рекомендуется посещать храмы ранним утром, чтобы избежать толп и жары.',
                },
            },
            {
                date: '2024-04-15',
                title: {
                    en: 'Spring Activities Guide',
                    ru: 'Гид по весенним активностям',
                },
                description: {
                    en: 'Take advantage of perfect weather for outdoor activities and water sports.',
                    ru: 'Воспользуйтесь идеальной погодой для активного отдыха и водных видов спорта.',
                },
            },
        ],
    },
    '2': {
        id: '2',
        news: [
            {
                date: '2024-01-20',
                title: {
                    en: 'New Marine Protection Zone',
                    ru: 'Новая зона морской защиты',
                },
                description: {
                    en: 'Local authorities establish new protected areas for marine life conservation.',
                    ru: 'Местные власти создают новые охраняемые зоны для сохранения морской жизни.',
                },
            },
        ],
        facts: [
            {
                date: '2024-01-20',
                title: {
                    en: 'Coral Reef Recovery',
                    ru: 'Восстановление коралловых рифов',
                },
                description: {
                    en: 'Scientists report significant recovery of coral reefs in the area.',
                    ru: 'Ученые сообщают о значительном восстановлении коралловых рифов в этом районе.',
                },
            },
        ],
        recommendations: [
            {
                date: '2024-01-20',
                title: {
                    en: 'Best Snorkeling Spots',
                    ru: 'Лучшие места для снорклинга',
                },
                description: {
                    en: 'Recommended snorkeling spots with the best visibility and marine life.',
                    ru: 'Рекомендуемые места для снорклинга с лучшей видимостью и морской жизнью.',
                },
            },
        ],
    },
    '3': {
        id: '3',
        news: [
            {
                date: '2024-01-25',
                title: {
                    en: 'New Resort Development',
                    ru: 'Развитие нового курорта',
                },
                description: {
                    en: 'Major resort chain announces new eco-friendly development in Cancun.',
                    ru: 'Крупная сеть курортов объявляет о новом экологически чистом проекте в Канкуне.',
                },
            },
        ],
        facts: [
            {
                date: '2024-01-25',
                title: {
                    en: 'Mayan Heritage Celebration',
                    ru: 'Празднование наследия майя',
                },
                description: {
                    en: 'Annual celebration of Mayan culture attracts thousands of visitors.',
                    ru: 'Ежегодное празднование культуры майя привлекает тысячи посетителей.',
                },
            },
        ],
        recommendations: [
            {
                date: '2024-01-25',
                title: {
                    en: 'Cultural Tour Guide',
                    ru: 'Гид по культурным достопримечательностям',
                },
                description: {
                    en: 'Recommended guided tours to explore Mayan ruins and local culture.',
                    ru: 'Рекомендуемые экскурсии с гидом для изучения руин майя и местной культуры.',
                },
            },
        ],
    },
    '4': {
        id: '4',
        news: [
            {
                date: '2024-01-30',
                title: {
                    en: 'Sustainable Tourism Award',
                    ru: 'Премия за устойчивый туризм',
                },
                description: {
                    en: 'Maldives receives international recognition for sustainable tourism practices.',
                    ru: 'Мальдивы получают международное признание за практику устойчивого туризма.',
                },
            },
        ],
        facts: [
            {
                date: '2024-01-30',
                title: {
                    en: 'Marine Biodiversity',
                    ru: 'Морское биоразнообразие',
                },
                description: {
                    en: 'Record number of marine species observed in local waters this month.',
                    ru: 'Рекордное количество морских видов наблюдается в местных водах в этом месяце.',
                },
            },
        ],
        recommendations: [
            {
                date: '2024-01-30',
                title: {
                    en: 'Best Diving Conditions',
                    ru: 'Лучшие условия для дайвинга',
                },
                description: {
                    en: 'Current conditions are perfect for diving with excellent visibility.',
                    ru: 'Текущие условия идеальны для дайвинга с отличной видимостью.',
                },
            },
        ],
    },
}

export const getResortData = (resortId: string, date: string) => {
    const data = resortData[resortId]
    if (!data) return null

    const eventDate = new Date(date)
    const monthStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1)
    const monthEnd = new Date(eventDate.getFullYear(), eventDate.getMonth() + 1, 0)

    console.log('Resort Data Debug:', {
        resortId,
        date,
        eventDate,
        monthStart,
        monthEnd,
    })

    const filterByDate = (items: any[]) => {
        const filtered = items.filter(
            (item) => {
                const itemDate = new Date(item.date)
                const isInRange = itemDate >= monthStart && itemDate <= monthEnd
                console.log('Item date check:', {
                    itemDate,
                    isInRange,
                    monthStart,
                    monthEnd,
                })
                return isInRange
            }
        )
        return filtered
    }

    const result = {
        news: filterByDate(data.news),
        facts: filterByDate(data.facts),
        recommendations: filterByDate(data.recommendations),
    }

    console.log('Filtered result:', result)
    return result
} 