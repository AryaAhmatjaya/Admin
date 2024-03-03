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


// ** Custom Data Import
import PropTypes from 'prop-types';
import moment from 'moment';

const columns = [
  { id: 'nama_ruang', label: 'Nama Ruangan' },
  { id: 'deskripsi_ruang', label: 'Deskripsi' },
  { id: 'owner', label: 'Pemilik', align: 'right' },
  { id: 'created_at', label: 'Tanggal Dibuat', align: 'right' },
  { id: 'action', label: 'Action', align: 'right' } 
];

const TableStickyHeader = ({ roomData }) => { 
  
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

  const handleDeleteRoom = async (ruang_id) => {
    console.log(ruang_id)
    try {
      const payload = {
        ruang_id: ruang_id
      }
      const response = await client.post(`v3/delete-room`, payload);
      console.log(response?.data);
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.error(error)
    }

  }

const renderNoDataMessage = () => {
  return (
    <TableRow>
      <TableCell colSpan={6} align="center">
        <Typography variant="body1">No data available</Typography>
      </TableCell>
    </TableRow>
  );
};

  return (
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
            {roomData?.map(row => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row?.ruang_id}>
                <TableCell>{row?.nama_ruang}</TableCell>
                <TableCell>{row?.deskripsi_ruang}</TableCell>
                <TableCell align="right">{row?.owner?.username}</TableCell>
                <TableCell align="right">{formatCreatedAtDate(row?.created_at)}</TableCell>
                <TableCell align="right">
                <Button
                  variant="contained"
                  style={{  backgroundColor:"red",color: 'white' }}
                  onClick={() => handleDeleteRoom(row?.ruang_id)}
                >
                  Delete
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={roomData?.length || 0} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

TableStickyHeader.propTypes = {
  roomData: PropTypes.arrayOf(PropTypes.shape({
    nama_ruang: PropTypes.string.isRequired,
    deskripsi_ruang: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      username: PropTypes.string.isRequired
    }),
    created_at: PropTypes.string.isRequired
  }))
};

export default TableStickyHeader;
