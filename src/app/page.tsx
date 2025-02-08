'use client'

import { PageBlock } from '@/components'
import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Fab,
  Grid2 as Grid,
  IconButton,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'

function TestPage() {
  const timers = [
    {
      id: 1,
      name: 'Birthday',
      startDate: dayjs('2002-08-20'),
      endDate: dayjs('2078-08-20'),
    },
    {
      id: 2,
      name: 'Test1',
      startDate: dayjs('2002-08-20'),
      endDate: dayjs('2078-08-20'),
    },
    {
      id: 3,
      name: 'Test2',
      startDate: dayjs('2002-08-20'),
      endDate: dayjs('2078-08-20'),
    },
    {
      id: 4,
      name: 'asd',
      startDate: dayjs('2002-08-20'),
      endDate: dayjs('2078-08-20'),
    },
  ]

  return (
    <>
      <Fab
        color={'primary'}
        sx={{
          visibility: { md: 'hidden', xs: 'visible' },
          position: 'absolute',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
      <PageBlock>
        <CardHeader
          action={
            <Button
              sx={{ visibility: { md: 'visible', xs: 'hidden' } }}
              startIcon={<AddIcon />}
              variant={'contained'}
            >
              Create
            </Button>
          }
          title={
            <Typography variant={'h4'} fontWeight={'bold'}>
              Your clocks
            </Typography>
          }
        />
        <Grid container spacing={2} columns={{ xs: 4, sm: 8 }}>
          {timers.map((timer) => (
            <Grid key={timer.id} size={4}>
              <Card variant={'outlined'}>
                <CardActionArea component={Link} href={`/clocks/${timer.id}`}>
                  <CardHeader
                    title={
                      <Typography
                        textAlign={'center'}
                        component='div'
                        variant={'body1'}
                        sx={{ color: 'text.secondary', px: 6 }}
                      >
                        {timer.name}
                      </Typography>
                    }
                    action={
                      <IconButton
                        size={'small'}
                        sx={{
                          position: 'absolute',
                          right: (theme) => theme.spacing(1),
                          top: (theme) => theme.spacing(1),
                        }}
                        onTouchStart={(e) => {
                          e.stopPropagation()
                        }}
                        onMouseDown={(e) => {
                          e.stopPropagation()
                        }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <MoreVertIcon fontSize={'small'} />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant={'h4'}
                      fontWeight={'bold'}
                      textAlign={'center'}
                    >
                      10:50
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageBlock>
    </>
  )
}

export default TestPage
