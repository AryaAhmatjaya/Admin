// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Button from '@mui/material/Button';
import useClient from 'src/utils/router'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'


// ** Custom Data Import
import PropTypes from 'prop-types';
import moment from 'moment';

const columns = [
  { id: 'username', label: 'username' },
  { id: 'email', label: 'email' },
  { id: 'nama lengkap', label: 'nama lengkap', align: 'right' },
  { id: 'alamat', label: 'alamat', align: 'right' },
  { id: 'tanggal gabung', label: 'tanggal gabung',  },
  { id: 'status', label: 'status',  } ,
  { id: '', label: '', align: 'right' } 

];

const TableStickyHeader = ({ memberData }) => { 
  
  const client = useClient()

  const formatCreatedAtDate = (createdAt) => {
  return moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
};
  
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
  
  const statusObj = {
  "0": { color: 'warning' }, 
  "1": { color: 'info' }, 
  "2": { color: 'info' }, 
  "3": { color: 'warning' },
};

const getStatusLabel = (status) => {
  switch (status) {
    case "0":
      return 'Suspended';
    case "1":
      return 'Active';
    case "2":
      return 'Active (Member)';
    case "3":
      return 'Admin';
    default:
      return 'Undefined';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "0":
      return statusObj[0].color;
    case "1":
      return statusObj[1].color;
    case "2":
      return statusObj[2].color;
    case "3":
      return statusObj[3].color;
    default:
      return 'default';
  }
};

  const activateMember = async (user_id) => {
    try {
      const response = await client.post(`v3/activate-member/${user_id}`)
      console.log(response?.data);
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.error(error)
    }
  }

  const suspendUser = async (user_id) => {
    try {
      const response = await client.post(`v3/suspend-user/${user_id}`)
      console.log(response?.data);
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.error(error)
    }
  }


  
  const formatRegistrationDate = (createdAt) => {
  return createdAt ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') : '-';
};

  return (
    <>
    <h1>Membership User</h1>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
           {memberData?.length > 0 ? memberData?.map(row => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row?.ruang_id}>
                <TableCell>{row?.username}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell align="right">{row?.nama_lengkap || '-'}</TableCell>
                <TableCell align="right">{row?.alamat || '-'}</TableCell>
                <TableCell>
                  {formatRegistrationDate(row?.created_at)}
               </TableCell>
               <TableCell>
                  <Chip
                    label={getStatusLabel(row.status)}
                    color={getStatusColor(row.status)}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
               <TableCell align="right">
                  <Button
                    variant="contained"
                    style={{  backgroundColor:"Yellow",color: 'black', opacity: row.status === "0" ? 0.4 : 1 }}
                    disabled={row.status === "0"}
                    onClick={() => suspendUser(row?.user_id)}
                 >
                    Suspend
                 </Button>
                 <Button
                    variant="contained"
                    style={{  marginLeft:12,backgroundColor:"Green",color: 'white', opacity: row.status === "2" ? 0.5 : 1 }}
                    disabled={row.status === "2"}
                    onClick={() => activateMember(row?.user_id)}
                 >
                    Activate
                  </Button>
                </TableCell>
              </TableRow>
            )) : renderNoDataMessage()} 
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={memberData?.length || 0} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
};



export default TableStickyHeader;
