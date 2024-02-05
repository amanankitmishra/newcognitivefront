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
import EditEnquiryForm from './EditEnquiryForm';
import { createEnquiry, fetchEnquiries, editEnquiry, deleteEnquiry } from 'src/utility/api';
import toast from 'react-hot-toast';
import Router from 'next/router';
import { formatTimestamp } from 'src/utility/utility';
import { IconEdit, IconEye, IconX } from '@tabler/icons-react';
import ConfirmationDialog from 'src/utility/confirmation';

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
    { field: 'projectType', headerName: 'Type', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'offerSubmitted', headerName: "Offer Submitted", flex: 1 },
    { field: 'enquiryDate', headerName: "Enquiry Date", flex: 1 },
    { field: 'remark', headerName: 'Remark', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '5px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => handleViewEnquiry(params.row.id)}
          >
            <IconEye />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconEdit onClick={() => handleEdit(params.row)} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px',
              color: 'red'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconX onClick={() => handleDelete(params.row.id)} />
          </div>

        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    }

  ];


  const [open, setOpen] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteEnquiryId, setDeleteEnquiryId] = useState(null);

  const getEnquiries = async () => {
    try {
      const res = await fetchEnquiries();
      const ccc = res.data.map((row) => ({
        ...row,
        id: row._id,
        clientId: row.clientId._id,
        clientName: row.clientId.clientName,
        enquiryDate: formatTimestamp(row.enquiryDate)
      }));
      setEnquiries(ccc);
      // console.log(ccc);
    } catch (e) {
      console.log(e);
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
      getEnquiries();
    } catch {
      toast.error('Error Creating Enquiry', { duration: 3000 })
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };
  const handleViewEnquiry = (id) => {
    Router.push(`/enquiries/view?id=${id}`);
  };
  const handleDelete = (id) => {
    setDeleteEnquiryId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteEnquiry(deleteEnquiryId);
      toast.success('Enquiry deleted successfully', { duration: 3000 });
      getEnquiries();
    } catch {
      toast.error('Error deleting enquiry', { duration: 3000 });
    } finally {
      setConfirmationDialogOpen(false);
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (id, editedData) => {

    try {
      const response = await editEnquiry(id, editedData)

      toast.success('Enquiry Updated successfully', { duration: 3000 });

    } catch {
      toast.error('Error in updating Enquiry', { duration: 3000 });
    }

    // Close the edit modal
    setEditModalOpen(false);
    getEnquiries();
  };

  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };

  const getRowId = (row) => row.id;
  const getRowClassName = (params) => {
    const offerSubmitted = params.row.offerSubmitted;
    // return status ? 'activeRow' : 'inactiveRow';
    if (offerSubmitted === 'YES') {
      return 'activeRow'
    }

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
                        enquiryDate: false,
                        quotedMarginValue: false,
                        ratePerWatt: false
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
                  getRowId={getRowId}
                  getRowClassName={getRowClassName}
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
      <Sidebar
        show={editModalOpen}
        sx={{
          padding: 5
        }}
      >
        <EditEnquiryForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  );
};

Enquiries.acl = {
  action: 'read',
  subject: 'enquiry'
}

export default Enquiries;
