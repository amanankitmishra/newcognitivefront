// BOQ.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddBOQForm from './AddBoqForm';

const BOQ = () => {
  const columns = [
    { field: 'id', headerName: 'SL. No.', flex: 1 },
    { field: 'itemHead', headerName: 'Item Head', flex: 1 },
    { field: 'specification', headerName: 'Specification', flex: 1 },
    { field: 'make', headerName: 'Make', flex: 1 },
    { field: 'quantity', headerName: 'Qty', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'remark', headerName: 'Remark', flex: 1 },
  ];

  const boqData = [
    {
      id: 1,
      itemHead: 'Head 1',
      specification: 'Spec 1',
      make: 'Make 1',
      quantity: '10',
      uom: 'Unit',
      remark: 'Lorem ipsum dolor sit amet',
    },

    // Add more BOQ data as needed
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddBOQ = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);

    // Add logic to update BOQ data state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='BOQ 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add BOQ
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={boqData}
                  columns={columns}
                  pageSizeOptions={[5]}
                  slots={{ toolbar: GridToolbar }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Sidebar show={open} sx={{ padding: 5 }} direction='right'>
        <AddBOQForm onSubmit={handleAddBOQ} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default BOQ;
