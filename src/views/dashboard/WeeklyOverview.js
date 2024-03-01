// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  const theme = useTheme()

  const options = {
    chart: {
      height:400,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '30%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 1,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: true },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 8,
      labels: {
        offsetX: -17,
        formatter: value => `${value > 99 ? `${(value / 999).toFixed(0)}` : value}`
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Weekly Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={450} options={options}
          series={
          [
              {
              name:"Membership Purchased by user",
              data: [
                37,
                2,
                45,
                75,
                57,
                40,
                65
              ]
            }
          ]
        } 

        />
        <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            45%
          </Typography>
          <Typography variant='body2'>Your sales performance is 45% better compared to last month</Typography>
        </Box>
        {/* <Button fullWidth variant='contained'>
          Details
        </Button> */}
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
