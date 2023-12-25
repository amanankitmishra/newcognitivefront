import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddEnquiryForm from './AddEnquiriesForm';

const Enquiries = () => {
  const columns = [
    { field: 'id', headerName: 'S.No.', flex: 1 },
    { field: 'quotationNumber', headerName: 'Quotation No.', flex: 1 },
    { field: 'enquiryDate', headerName: 'Enquiry Date', flex: 1 },
    { field: 'client', headerName: 'Client', flex: 1 },
    { field: 'project', headerName: 'Project', flex: 1 },
    { field: 'spvSwh', headerName: 'SPV / SWH', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'offerSubmitted', headerName: 'Offer Submitted', flex: 1 },
    { field: 'offerSubmissionDate', headerName: 'Offer Submission Date', flex: 1 },
    { field: 'valueQuoted', headerName: 'Value Quoted', flex: 1 },
    { field: 'revisionNumber', headerName: 'Revision Number', flex: 1 },
    { field: 'ratePerWatt', headerName: 'Rate Per Watt', flex: 1 },
    { field: 'quotedMargin', headerName: 'Quoted Margin', flex: 1 },
    { field: 'clientContactPerson', headerName: 'Client Contact Person', flex: 1 },
    { field: 'clientContactNumber', headerName: 'Client Contact Number', flex: 1 },
    { field: 'clientContactEmail', headerName: 'Client Contact Email', flex: 1 },
    { field: 'remark', headerName: 'Remark', flex: 1 },
  ];



  const enquiries = [
    {
      id: 1,
      quotationNumber: 'Q123',
      enquiryDate: '2023-01-01',
      client: 'Client 1',
      project: 'Project A',
      spvSwh: 'SPV',
      capacity: '100 kW',
      uom: 'kWh',
      offerSubmitted: true,
      offerSubmissionDate: '2023-01-15',
      valueQuoted: '$50,000',
      revisionNumber: 1,
      ratePerWatt: '$2.50',
      quotedMargin: '15%',
      clientContactPerson: 'John Doe',
      clientContactNumber: '123-456-7890',
      clientContactEmail: 'john@example.com',
      remark: 'Sample remark',
    },
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddEnquiry = (formData) => {
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
            <CardHeader title='Enquiries 📋'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Enquiry
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={enquiries}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        quotationNumber: false,
                        offerSubmitted: false,
                        revisionNumber: false,
                        clientContactEmail: false,
                        clientContactNumber: false,
                        clientContactPerson: false,
                        offerSubmissionDate: false,
                        ratePerWatt: false,
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
      <Sidebar
        show={open}
        sx={{
          padding: 5,
        }}
      >
        <AddEnquiryForm onSubmit={handleAddEnquiry} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default Enquiries;
