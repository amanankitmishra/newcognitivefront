// LiveHotProposals.jsx
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddLiveHotProposalForm from './AddLiveHotProposalForm';

const LiveHotProposals = () => {
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

  const liveHotProposals = [
    {
      id: 1,
      client: 'ABC Corp',
      project: 'Hot Project 1',
      spvSwh: 'SPV',
      capacity: '120 kW',
      uom: 'KWp',
      quotedValue: '$12,000',
      ratePerWatt: '$1.10',
      profitMargin: '18%',
      profitValue: '$2,160',
      contactPerson: 'Alice Johnson',
      contactNumber: '111-222-3333',
      remarks: 'Lorem ipsum dolor sit amet',
    },

    // Add more live hot proposal data as needed
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddLiveHotProposal = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);

    // Add logic to update live hot proposals state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Live Hot Proposals 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Live Hot Proposal
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={liveHotProposals}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        endCustomer: false,
                        profitValue: false,
                        siteAddress: false,
                        designation: false,
                        contactEmail: false,
                        contactNumber: false,
                        contactPerson: false,
                        leadSource: false,
                        remarks: false
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
        <AddLiveHotProposalForm onSubmit={handleAddLiveHotProposal} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default LiveHotProposals;
