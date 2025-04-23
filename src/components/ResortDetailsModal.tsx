import CloseIcon from '@mui/icons-material/Close'
import EventIcon from '@mui/icons-material/Event'
import GroupsIcon from '@mui/icons-material/Groups'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
} from '@mui/material'
import React from 'react'

import { useLocale } from '../contexts/LocaleContext'
import { MetricType } from '../types/chart'
import { getFormattedMetricValue } from '../utils/metricUtils'

interface ResortEvent {
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
}

interface ResortDetailsModalProps {
    open: boolean
    onClose: () => void
    resortName: string
    date: string
    metrics: {
        temperature: number
        humidity: number
        precipitation: number
        visitorCount: number
    }
    events: ResortEvent[]
}

const ResortDetailsModal: React.FC<ResortDetailsModalProps> = ({
    open,
    onClose,
    resortName,
    date,
    metrics,
    events,
}) => {
    const { t, locale } = useLocale()

    const getMetricIcon = (metric: MetricType) => {
        switch (metric) {
            case 'temperature':
                return <ThermostatIcon />
            case 'humidity':
                return <WaterDropIcon />
            case 'precipitation':
                return <WaterDropIcon />
            case 'visitorCount':
                return <GroupsIcon />
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='md'
            fullWidth
            PaperProps={{
                sx: {
                    backgroundColor: 'background.paper',
                    backgroundImage: 'none',
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h6' component='div'>
                    {resortName}
                </Typography>
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Typography variant='subtitle1' gutterBottom>
                    {date}
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant='h6' gutterBottom>
                        {t('common.weatherConditions')}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        {(Object.keys(metrics) as MetricType[]).map((metric) => (
                            <Box
                                key={metric}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    p: 1,
                                    borderRadius: 1,
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                }}
                            >
                                {getMetricIcon(metric)}
                                <Typography>
                                    {getFormattedMetricValue(metric, metrics[metric], locale)}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Typography variant='h6' gutterBottom>
                    {t('common.eventsAndNews')}
                </Typography>
                <List>
                    {events.map((event) => (
                        <ListItem
                            key={event.id}
                            sx={{
                                mb: 1,
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 1,
                            }}
                        >
                            <ListItemIcon>
                                {event.type === 'event' ? <EventIcon /> : <NewspaperIcon />}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography>{event.title[locale]}</Typography>
                                        <Chip
                                            label={t(`common.${event.type}`)}
                                            size='small'
                                            sx={{
                                                backgroundColor:
                                                    event.type === 'event'
                                                        ? 'primary.main'
                                                        : 'secondary.main',
                                            }}
                                        />
                                    </Box>
                                }
                                secondary={event.description[locale]}
                            />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default ResortDetailsModal 