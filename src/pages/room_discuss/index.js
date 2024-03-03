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
import TableStickyHeaderRoom from 'src/views/tables/TableStickyHeaderRoom.js'


// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const client = useClient()

  const [roomData, setRoomData] = useState(null)
  
  const showAllRoom = async () => {
    try {
      const response = await client.get(`v3/show-all-room`)
      setRoomData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    showAllRoom()
  }, [])
  

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableStickyHeaderRoom roomData={roomData} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
