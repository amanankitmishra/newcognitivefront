import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from 'src/@core/components/sidebar';
import ClientForm from './AddClientForm';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconDotsVertical, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import Router from 'next/router';
import { fetchClients, createClient } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';
import toast from 'react-hot-toast';


const ClientsMain = () => {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState([]);

  const fetchClientsData = async () => {
    try {
      const clientsDataFromServer = await fetchClients();

      const clientsDataWithId = clientsDataFromServer.data.allClients.map((row) => ({
        ...row,
        id: row._id,
        lastVisit: formatTimestamp(row.lastVisit),
        nextVisit: formatTimestamp(row.nextVisit),
      }));

      setClients(clientsDataWithId);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);




  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleAddClient = async (formData) => {
    try {
      const response = await createClient(formData);
      if (response.status === 201) {

        // Show success notification

        toast.success('Client added successfully', { duration: 3000 });
        fetchClientsData();

      } else {

        // Show error notification
        toast.error('Error adding client', { duration: 3000 });
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast.error('Error adding client', { duration: 3000 });
    }

    // Close the sidebar in both success and error cases
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
    { field: 'nature', headerName: 'Nature Of Client', flex: 1 },
    { field: 'lastVisit', headerName: 'Last Visit', flex: 1 },
    { field: 'nextVisit', headerName: 'next Visit', flex: 1 },
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


  return (
    <div>
      <Grid container spacing={6}>
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
                  rows={clients}
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
        <ClientForm onSubmit={handleAddClient}
          onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default ClientsMain;
