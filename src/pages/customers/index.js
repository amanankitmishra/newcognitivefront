// KeyCustomerDatabase.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddKeyCustomerDatabaseForm from './AddKeyCustomerForm';

const KeyCustomerDatabase = () => {
  const columns = [
    { field: 'id', headerName: 'Sl. No.', flex: 1 },
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'officeAddress', headerName: 'Office Address', flex: 1 },
    { field: 'officeLocation', headerName: 'Office Location', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'contactNo', headerName: 'Contact No', flex: 1 },
    { field: 'emailId', headerName: 'E-Mail id', flex: 1 },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'natureOfClient', headerName: 'Nature of Client', flex: 1 },
    { field: 'lastVisitDate', headerName: 'Last Visit Date', flex: 1 },
    { field: 'nextVisitDate', headerName: 'Next Visit Date', flex: 1 },
  ];

  const keyCustomerData = [
    {
      id: 1,
      customer: 'ABC Corp',
      officeAddress: '123 Main St',
      officeLocation: 'City A',
      contactPerson: 'John Doe',
      contactNo: '123-456-7890',
      emailId: 'john.doe@example.com',
      designation: 'Manager',
      natureOfClient: 'End Client',
      lastVisitDate: '2023-01-01',
      nextVisitDate: '2023-02-01',
    },

    // Add more key customer data as needed
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddKeyCustomer = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);

    // Add logic to update key customer data state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Key Customer Database 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Key Customer
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={keyCustomerData}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        officeAddress: false,
                        officeLocation: false,
                        designation: false,
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
        <AddKeyCustomerDatabaseForm
          onSubmit={handleAddKeyCustomer}
          onCancel={handleCancel}
        />
      </Sidebar>
    </div>
  );
};

export default KeyCustomerDatabase;
