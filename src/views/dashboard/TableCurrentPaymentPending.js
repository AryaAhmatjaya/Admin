// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import moment from 'moment';
import Button from '@mui/material/Button' 
import useClient from 'src/utils/router'

const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj = {
  success: { color: 'success' },
  pending: { color: 'info' },
  declined: { color: 'error' }
};



const getStatusLabel = (status) => {
  switch (status) {
    case "success":
      return 'Success';
    case "pending":
      return 'Pending';
    case "declined":
      return 'Declined';
    default:
      return 'Undefined';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'success':
      return statusObj.success.color;
    case 'pending':
      return statusObj.pending.color;
    case 'declined':
      return statusObj.declined.color;
    default:
      return 'default';
  }
};

const formatRegistrationDate = (createdAt) => {
  return createdAt ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') : '-';
};


const renderNoDataMessage = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <Typography variant="body1">No data available</Typography>
      </TableCell>
    </TableRow>
  );
};




const DashboardTable = ({ paymentPending }) => {
  
  const client = useClient()
  console.log(paymentPending)

  const handleAcceptPayment = async (riwayat_id, user_id) => {
    try {
      const payload = {
        riwayat_id: riwayat_id,
        user_id: String(user_id)
      }
      const response = await client.post(`v3/accept-payment-history`, payload)
      console.log(response?.data)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error)
    }
    console.log(riwayat_id, user_id)
}

  return (
    <>
    <h1>Payment Pending</h1>
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Riwayat ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Payment Gateway</TableCell>
              <TableCell>Nominal</TableCell>
              <TableCell>Tanggal Pembayaran</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentPending?.length > 0 ? (
            paymentPending?.map(row => (
              <TableRow hover key={row?.riwayat_id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row?.riwayat_id}</Typography>
                    <Typography variant='caption'></Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.user?.username}</TableCell>
                <TableCell>{row?.payment_gateway || '-'}</TableCell>
                <TableCell>
                  {row?.nominal_pembayaran}
                </TableCell>
                <TableCell>
                  {formatRegistrationDate(row?.created_at)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(row?.status)}
                    color={getStatusColor(row?.status)}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{ color: 'white' }} onClick={() => handleAcceptPayment(row?.riwayat_id, row?.user?.user_id)}>Accept</Button>
                </TableCell>
              </TableRow>
            ))
            ) : (
            renderNoDataMessage()
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </>
  )
}

export default DashboardTable
