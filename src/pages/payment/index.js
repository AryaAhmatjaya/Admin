'use client'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import useClient from 'src/utils/router'

// ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// // ** Custom Components Imports
// import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TableCurrentPaymentPending from 'src/views/dashboard/TableCurrentPaymentPending'
import TableCurrentPaymentSuccess from 'src/views/dashboard/TableCurrentPaymentSuccess'

// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const client = useClient()

  const [paymentPending, setPaymentPending] = useState(null)
  const [paymentSuccess, setPaymentSuccess] = useState(null)

  const getAllPaymentPending = async () => {
    try {
      const response = await client.get(`v3/get-payment-history-pending`)
      setPaymentPending(response?.data)
    } catch (error) {
      console.error(error)      
    }
  }

  const getAllPaymentSuccess = async () => {
    try {
      const response = await client.get(`v3/get-payment-history-success`)
      console.log(response?.data)
      setPaymentSuccess(response?.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllPaymentPending()
    getAllPaymentSuccess()
  }, [])
  
  // console.log(statisticData)
  console.log(paymentSuccess)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableCurrentPaymentPending paymentPending={paymentPending} />
        </Grid>
        <Grid item xs={12}>
          <TableCurrentPaymentSuccess paymentSuccess={paymentSuccess} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
