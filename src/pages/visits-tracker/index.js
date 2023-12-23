// VisitsTracker.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddVisitsTrackerForm from './AddVisitForm';

const VisitsTracker = () => {
  const columns = [
    { field: 'id', headerName: 'SL. No.', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'mobileNo', headerName: 'Mobile no', flex: 1 },
    { field: 'visitNo', headerName: 'VISIT No.', flex: 1 },
    { field: 'visitDate', headerName: 'VISIT DATE', flex: 1 },
    { field: 'discussionSummary', headerName: 'Discussion Summary', flex: 1 },
    {
      field: 'opportunityForUs',
      headerName: 'Opportunity for us',
      flex: 1,
    },
    { field: 'enquiryExpectedBy', headerName: 'Enquiry Expected By', flex: 1 },
    { field: 'nextVisitDate', headerName: 'Next Visit Date', flex: 1 },
  ];

  const visitsData = [
    {
      id: 1,
      designation: 'Manager',
      mobileNo: '123-456-7890',
      visitNo: 'V123',
      visitDate: '2023-01-15',
      discussionSummary: 'Met to discuss upcoming project',
      opportunityForUs: 'SPV',
      enquiryExpectedBy: '2023-02-15',
      nextVisitDate: '2023-03-01',
    },

    // Add more visit data as needed
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddVisit = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);

    // Add logic to update visits data state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Visits Tracker 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Visit
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={visitsData}
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
      <Sidebar show={open} sx={{ padding: 5 }} direction='right'>
        <AddVisitsTrackerForm onSubmit={handleAddVisit} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default VisitsTracker;
