// ** MUI Imports
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Sidebar from 'src/@core/components/sidebar'
import { Button } from '@mui/material';
import AddOleadsForm from './AddOleadsForm';

const Oleads = () => {

  const columns = [
    {
      field: 'id',
      headerName: 'S.No.',
      flex: 1,
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1,

    },
    {
      field: 'endCustomer',
      headerName: 'End Customer',
      flex: 1
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
      field: 'contactName',
      headerName: 'Contact Name',
      flex: 1,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
    },
    {
      field: 'contactEmail',
      headerName: 'Contact Email',
      flex: 1,
    },
    {
      field: 'contactMobile',
      headerName: 'Contact Mobile',
      flex: 1,
    },
    {
      field: 'opportunityFor',
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
  ];

  const oleads = [
    {
      id: 1,
      client: 'Client 1',
      endCustomer: 'End Customer 1',
      project: 'project 1',
      siteAddress: 'Site Address 1',
      siteLocation: 'Site Location 1',
      contactName: 'Contact Name',
      designation: 'Designation',
      contactEmail: 'Contact email',
      contactMobile: 'Contact Mobile',
      opportunityFor: 'Opportunity for',
      enquiryExpectedBy: 'Enquiry nExpected By',
      leadSource: 'Lead Source 1',
      leadDate: ' Lead Date 1'
    },
    {
      id: 2,
      client: 'Client 2',
      endCustomer: 'End Customer 2',
      project: 'project 2',
      siteAddress: 'Site Address 2',
      siteLocation: 'Site Location 2',
      contactName: 'Contact Name',
      designation: 'Designation',
      contactEmail: 'Contact email',
      contactMobile: 'Contact Mobile',
      opportunityFor: 'Opportunity for',
      enquiryExpectedBy: 'Enquiry nExpected By',
      leadSource: 'Lead Source 2',
      leadDate: ' Lead Date 2'
    },
    {
      id: 3,
      client: 'Client 3',
      endCustomer: 'End Customer 3',
      project: 'project 3',
      siteAddress: 'Site Address 3',
      siteLocation: 'Site Location 3',
      contactName: 'Contact Name',
      designation: 'Designation',
      contactEmail: 'Contact email',
      contactMobile: 'Contact Mobile',
      opportunityFor: 'Opportunity for',
      enquiryExpectedBy: 'Enquiry nExpected By',
      leadSource: 'Lead Source 3',
      leadDate: ' Lead Date 3'
    }
  ]
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);

  const handleAddOlead = (formData) => {
    console.log('Form submitted:', formData);

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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
    </div>
  )
}

export default Oleads
