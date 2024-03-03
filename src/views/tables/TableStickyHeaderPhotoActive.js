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
  { id: 'foto', label: 'foto' },
  { id: 'judul foto', label: 'judul foto' },
  { id: 'deskripsi foto', label: 'deskripsi foto' },
  { id: 'username', label: 'username', align: 'right' },
  { id: 'tanggal upload', label: 'tanggal upload',   },
  { id: 'status', label: 'status',  } ,
  { id: '', label: '',  } ,
];

const TableStickyHeader = ({ imageData }) => { 
  
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
  "2": { color: 'primary' }, 
  "3": { color: 'warning' },
};

const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return 'Pending';
    case 1:
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
    case 0:
      return statusObj[0].color;
    case 1:
      return statusObj[1].color;
    default:
      return 'default';
  }
};

  const formatRegistrationDate = (createdAt) => {
  return createdAt ? moment(createdAt).format('MMMM Do YYYY, h:mm:ss a') : '-';
  };
  
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleSelectPhoto = (foto_id) => {
    if (selectedPhotos.includes(foto_id)) {
      setSelectedPhotos(selectedPhotos.filter(id => id !== foto_id));
    } else {
      setSelectedPhotos([...selectedPhotos, foto_id]);
    }
  };

  const handleDeactivePhoto = async () => {
    try {
      const payload = {
        foto_ids : selectedPhotos
      }
      const response = await client.post(`v3/update-photo-deactive`, payload);
      console.log(response?.data)
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    } catch (error) {
      console.error(error)
    }
  }

  console.log(selectedPhotos, 'PHOTO SELECTED')

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Photo Active</h1>
        <div>
        <Button
          variant="contained"
          style={{ marginLeft: 12, backgroundColor: "red", color: 'white', opacity: selectedPhotos.length === 0 ? 0.3 : 1 }}
          disabled={selectedPhotos.length === 0}
          onClick={handleDeactivePhoto}
        >
          Deactive
        </Button>
         {/* <Button
          variant="contained"
          style={{ marginLeft: 12, backgroundColor: "Red", color: 'white', opacity: selectedPhotos.length === 0 ? 0.3 : 1}}
          disabled={selectedPhotos.length === 0}
        >
          Deactive
        </Button> */}
        </div>
      </div>
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
          {imageData?.length > 0 ? 
          imageData.map(row => (
          <TableRow hover role='checkbox' tabIndex={-1} key={row?.foto_id}>
                  <TableCell>
                      <img src={row?.lokasi_file} alt={row?.judul_foto} style={{ width:"100%",maxWidth: '100px', maxHeight: '100px', borderRadius: '16px', objectFit:"cover", objectPosition:"center" }} />
                    </TableCell>
                  <TableCell>{row?.judul_foto}</TableCell>
                  <TableCell>{row?.deskripsi_foto}</TableCell>
                  <TableCell align="right">{row?.user?.username || '-'}</TableCell>
                  <TableCell>{formatRegistrationDate(row?.created_at)}</TableCell>
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
                <input
                type="checkbox"
                onChange={() => handleSelectPhoto(row?.foto_id)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '8px',
                  backgroundColor: selectedPhotos.includes(row?.foto_id) ? 'purple' : 'transparent',
                }}
              />
            </TableCell>
        </TableRow>
  )) 
  : renderNoDataMessage()
}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={imageData?.length || 0} 
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
