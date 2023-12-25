// VisitPlan.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddVisitPlanForm from './AddVisitPlanForm';

const VisitPlan = () => {
  const columns = [
    { field: 'id', headerName: 'SL. No.', flex: 1 },
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'visitDate', headerName: 'Visit Date', flex: 1 },
    { field: 'visitBy', headerName: 'Visit By', flex: 1 },
    { field: 'natureOfVisit', headerName: 'Nature of Visit', flex: 1 },
    { field: 'remark', headerName: 'Remark', flex: 1 },
  ];

  const visitPlanData = [
    {
      id: 1,
      client: 'ABC Corp',
      location: 'Office A',
      visitDate: '2023-01-20',
      visitBy: 'John Doe',
      natureOfVisit: 'Courtesy',
      remark: 'Met to discuss upcoming project',
    }
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddVisitPlan = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false)
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Visit Plan 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Visit Plan
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={visitPlanData}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                      },
                    },
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  slots={{ toolbar: GridToolbar }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Sidebar show={open} sx={{ padding: 5 }}>
        <AddVisitPlanForm onSubmit={handleAddVisitPlan} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default VisitPlan;
