import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddEnquiryForm from './AddEnquiriesForm';
import { createEnquiry, fetchEnquiries } from 'src/utility/api';
import toast from 'react-hot-toast';

const Enquiries = () => {
  const columns = [
    { field: 'id', headerName: 'S.No.', flex: 1 },
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
    { field: 'project', headerName: 'Project', flex: 1 },
    { filed: 'projectType', headerName: 'Type', flex: 1 }
  ];


  const [open, setOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([])

  const getEnquiries = async () => {
    try {
      const res = await fetchEnquiries();

      const ccc = res.data.allEnquiries.map((row) => ({
        ...row,
        id: row._id,
        clientId: row.clientId._id,
        clientName: row.clientId.clientName,
      }));
      setEnquiries(ccc);
    } catch {
      console.log("error getting enquiries");
    }
  }

  useEffect(() => {
    getEnquiries();
  }, [])

  const toggleSidebar = () => setOpen(!open);

  const handleAddEnquiry = async (formData) => {

    try {
      const response = createEnquiry(formData)
      toast.success('Enquiry Created Successfully', { duration: 3000 })
    } catch {
      toast.error('Error Creating Enquiry', { duration: 3000 })
    }
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
