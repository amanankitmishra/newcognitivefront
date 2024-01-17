// ** MUI Imports
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Sidebar from 'src/@core/components/sidebar'
import { Button } from '@mui/material';
import AddOleadsForm from './AddOleadsForm';
import EditOleadsForm from './EditOleadsForm';
import { IconEdit } from '@tabler/icons-react';
import { createOlead, fetchOleads, editOlead } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';
import toast from 'react-hot-toast';

const Oleads = () => {



  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'S.No.',
      flex: 1,
    },
    {
      field: 'clientName',
      headerName: 'Client',
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
          onClick={() => handleViewClient(params.row.clientId)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {params.row.clientName}
        </div>
      ),

    },
    {
      field: 'project',
      headerName: 'Project',
      flex: 1,
    },
    {
      field: 'siteAddress',
      headerName: 'Site Address',
      flex: 1,
    },
    {
      field: 'siteLocation',
      headerName: 'Site Location',
      flex: 1,
    },
    {
      field: 'oleadFor',
      headerName: 'Opportunity For',
      flex: 1,
    },
    {
      field: 'enquiryExpectedBy',
      headerName: 'Enquiry Expected By',
      flex: 1,
    },
    {
      field: 'leadSource',
      headerName: 'Lead Source',
      flex: 1,
    },
    {
      field: 'leadDate',
      headerName: 'Lead Date',
      flex: 1,
    },
    {
      field: 'remark',
      headerName: 'Remark',
      flex: 1
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
        >
          <IconEdit onClick={() => handleEdit(params.row)} />
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    }
  ];


  const [open, setOpen] = useState(false);
  const [oleads, setOleads] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const toggleSidebar = () => setOpen(!open);

  const handleAddOlead = async (formData) => {

    try {
      const response = await createOlead(formData);
      toast.success('Opportunity Lead added successfully', { duration: 3000 });
      getOleads()
    } catch {
      console.log("error")
      toast.error('Could not add opportunity lead.', { duration: 3000 });
    }

    setOpen(false);
  };

  const getOleads = async () => {
    try {
      const response = await fetchOleads();

      const ccc = response.data.allOleads.map((row) => ({
        ...row,
        id: row._id,
        clientId: row.clientId._id,
        clientName: row.clientId.clientName,
        enquiryExpectedBy: formatTimestamp(row.enquiryExpectedBy),
        leadDate: formatTimestamp(row.leadDate)
      }));
      setOleads(ccc)
    } catch {
      console.log("oleads not fetched")
    }
  }

  useEffect(() => {
    getOleads()
  }, [])

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (id, editedData) => {

    try {
      const response = await editOlead(id, editedData)

      toast.success('Opportunity Lead Edited successfully', { duration: 3000 });

    } catch {
      toast.error('Error in updating Opportunity Lead', { duration: 3000 });
    }

    // Close the edit modal
    setEditModalOpen(false);
    getOleads();
  };


  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Opportunity Leads 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: "right" }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Opportunity Lead
                </Button>
              </div>
              <div style={{ height: "400px" }}>
                <DataGrid
                  rows={oleads}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        endCustomer: false,
                        siteAddress: false,
                        designation: false,
                        contactEmail: false,
                        contactMobile: false,
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
                >
                </DataGrid>
              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <Sidebar
        show={open}
        sx={{
          padding: 5
        }}
      >
        <AddOleadsForm onSubmit={handleAddOlead} onCancel={handleCancel} />
      </Sidebar>
      <Sidebar
        show={editModalOpen}
        sx={{
          padding: 5
        }}
      >
        <EditOleadsForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} />
      </Sidebar>
    </div>
  )
}

Oleads.acl = {
  action: 'read',
  subject: 'olead'
}

export default Oleads
