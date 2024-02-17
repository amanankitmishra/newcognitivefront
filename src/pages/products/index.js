import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import ProductForm from './AddProductForm';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconDotsVertical, IconEye, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import Router from 'next/router';
import { fetchProducts } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';
import toast from 'react-hot-toast';
import ConfirmationDialog from 'src/utility/confirmation';



const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteClientId, setDeleteClientId] = useState(null);

  const fetchProductsData = async () => {
    try {
      const response = await fetchProducts();

      const ccc = response.data.map((row) => ({
        ...row,
        id: row._id,
      }));

      setProducts(ccc)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProductsData()
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

  const handleDelete = (id) => {
    setDeleteClientId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteClient(deleteClientId);
      toast.success('Client deleted successfully', { duration: 3000 });
      fetchClientsData();
    } catch {
      toast.error('Error deleting client', { duration: 3000 });
    } finally {
      setConfirmationDialogOpen(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
  ];


  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Products 🛍️'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Product
                </Button>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={products}
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
        <ProductForm onSubmit={handleAddClient}
          onCancel={handleCancel} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  );
};

Products.acl = {
  action: 'read',
  subject: 'client'
}

export default Products;
