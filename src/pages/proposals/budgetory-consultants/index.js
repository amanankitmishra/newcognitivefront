// BudgetaryConsultantsProposal.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddBudgetaryConsultantsProposalForm from './AddBudgetoryConsultantProposal';

const BudgetaryConsultantsProposal = () => {
  const columns = [
    { field: 'id', headerName: 'S.No.', flex: 1 },
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'project', headerName: 'Project', flex: 1 },
    { field: 'spvSwh', headerName: 'SPV / SWH', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'quotedValue', headerName: 'Quoted Value', flex: 1 },
    { field: 'ratePerWatt', headerName: 'Rate Per Watt', flex: 1 },
    { field: 'profitMargin', headerName: 'Profit Margin', flex: 1 },
    { field: 'profitValue', headerName: 'Profit Value', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
    { field: 'remarks', headerName: 'Remarks', flex: 1 },
  ];

  const proposals = [
    {
      id: 1,
      client: 'ABC Corp',
      project: 'Consultant Project 1',
      spvSwh: 'SPV',
      capacity: '100 kW',
      uom: 'KWp',
      quotedValue: '$10,000',
      ratePerWatt: '$0.95',
      profitMargin: '8%',
      profitValue: '$800',
      contactPerson: 'Alice Johnson',
      contactNumber: '111-222-3333',
      remarks: 'Lorem ipsum dolor sit amet',
    },

    // Add more proposal data as needed
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddProposal = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);

    // Add logic to update proposals state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Budgetary Consultants Proposals 📊'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Budgetary Consultants Proposal
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={proposals}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        endCustomer: false,
                        capacity: false,
                        siteAddress: false,
                        profitValue: false,
                        designation: false,
                        contactEmail: false,
                        contactNumber: false,
                        contactPerson: false,
                        leadSource: false
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
        <AddBudgetaryConsultantsProposalForm onSubmit={handleAddProposal} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default BudgetaryConsultantsProposal;
