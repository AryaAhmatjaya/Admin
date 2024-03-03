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
import TableStickyHeaderPhotoPending from 'src/views/tables/TableStickyHeaderPhotoPending.js'
import TableStickyHeaderPhotoActive from 'src/views/tables/TableStickyHeaderPhotoActive.js'

// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useEffect, useState } from 'react'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const client = useClient()

  const [userData, setUserData] = useState(null)
  const [imageData, setImageData] = useState(null)
  const [imageDataActive, setImageDataActive] = useState(null)

  
  const showAllImagePending = async () => {
    try {
      const response = await client.get(`v3/show-all-image-pending`)
      setImageData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }

 const showAllImageActive = async () => {
    try {
      const response = await client.get(`v3/show-all-image-active`)
      setImageDataActive(response?.data)
    } catch (error) {
      console.error(error)
    }
  }


  const showAllUser = async () => {
    try {
      const response = await client.get(`v3/get-all-user`)
      console.log(response?.data)
      setUserData(response?.data)
    } catch (error) {
      console.error(error)
    }
  }
 

  useEffect(() => {
    showAllUser()
    showAllImagePending()
    showAllImageActive()
  }, [])
  
  console.log(imageData, 'image with status 0 (pending)')
  console.log(imageDataActive, 'image with status 1 (active)')

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <TableStickyHeaderPhotoPending imageData={imageData} />
        </Grid>
        <Grid item xs={12}>
          <TableStickyHeaderPhotoActive imageData={imageDataActive} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
