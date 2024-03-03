import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import ImageIcon from 'mdi-material-ui/Image'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/Crown'
import AccountOutline from 'mdi-material-ui/AccountOutline'


const StatisticsCard = ({statisticData}) => {

  const totalRevenueIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(statisticData?.total_pembayaran);

  let totalRevenue30k;
  if (statisticData?.total_pembayaran >= 1000) {
    totalRevenue30k = (statisticData?.total_pembayaran / 1000) + 'k';
  } else {
    totalRevenue30k = statisticData?.total_pembayaran;
  }

  const renderStats = () => {
    if (!statisticData) return null

    const salesData = [
      {
        stats: statisticData.photo_total_data,
        title: 'Photo Active',
        color: 'primary',
        icon: <ImageIcon sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: statisticData.user_total_data,
        title: 'Customers',
        color: 'success',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: statisticData.member_total_data,
        color: 'warning',
        title: 'Member',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
      },
        {
        stats: totalRevenueIDR,
        color: 'info',
        title: 'Revenue (IDR)',
        icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
      },
    ]

    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 34,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `${item.color}.main`
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>{item.title}</Typography>
            <Typography variant='h6'>{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ))
  }

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
    
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total member {statisticData?.member_percent}% growth this month
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
