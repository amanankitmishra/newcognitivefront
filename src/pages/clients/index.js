import React, { useState } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import ClientForm from './AddClientForm';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconDotsVertical, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import Router from 'next/router';


const ClientsMain = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleAddClient = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'clientName', headerName: 'Client Name', flex: 1 },
    {
      field: 'officeAddress',
      headerName: 'Office Address',
      flex: 1,

    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.5s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onClick={() => handleViewClient(params.row.id)}
        >
          <IconEye />
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];

  const rows = [
    { id: 1, clientName: 'Client A', officeAddress: 'Address A' },
    { id: 2, clientName: 'Client B', officeAddress: 'Address B' },

    // Add more sample data as needed
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Clients 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Client
                </Button>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{ Toolbar: GridToolbar }}
                />
              </div>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
      <Sidebar show={open} sx={{ padding: 5 }}>
        <ClientForm onSubmit={handleAddClient}
          onCancel={handleCancel} />
      </Sidebar>
    </Container>
  );
};

export default ClientsMain;
