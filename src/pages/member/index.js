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
import TableStickyHeaderMember from 'src/views/tables/TableStickyHeaderMember.js'


// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const client = useClient()

  const [MemberData, setMemberData] = useState(null)
  
  const showAllMember = async () => {
    try {
      const response = await client.get(`v3/get-all-member`)
      console.log(response?.data)
      setMemberData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }
 

  useEffect(() => {
    showAllMember()
  }, [])
  

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableStickyHeaderMember memberData={MemberData} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
