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
import TableCurrentUser from 'src/views/dashboard/TableCurrentUser'
// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const client = useClient()

  const [statisticData, setStatisticData] = useState(null)
  const [weeklyOverview, setWeeklyOverview] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)

  const getCurrentUserRegistered = async () => {
    try {
      const response = await client.get(`v3/get-current-user-registered`)
      setCurrentUser(response?.data)
    } catch (error) {
      console.error(error)
    }    
  }

  const getAllStatistic = async () => {
    try {
      const response = await client.get(`v3/get-all-statistic`)
      setStatisticData(response?.data)
    } catch (error) {
      console.error(error)      
    }
  }

  const getWeeklyOverview = async () => {
    try {
      const response = await client.get(`v3/get-weekly-overview`)
      console.log(response?.data)
      setWeeklyOverview(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllStatistic()
    getWeeklyOverview()
    getCurrentUserRegistered()
  }, [])
  
  // console.log(statisticData)
  console.log(currentUser)

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <StatisticsCard statisticData={statisticData} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <WeeklyOverview weeklyOverview={weeklyOverview} />
        </Grid>
        <Grid item xs={12}>
          <TableCurrentUser currentUser={currentUser} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
