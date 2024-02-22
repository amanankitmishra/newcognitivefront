import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import ProductForm from './AddProductForm';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconDotsVertical, IconEye, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import Router from 'next/router';
import { fetchProducts, createProduct, deleteProduct } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';
import toast from 'react-hot-toast';
import ConfirmationDialog from 'src/utility/confirmation';



const Products = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

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

  const handleAddProduct = async (formData) => {
    try {
      const response = await createProduct(formData);
      if (response.status === 201) {

        // Show success notification

        toast.success('Product added successfully', { duration: 3000 });
        fetchProductsData();

      } else {

        // Show error notification
        toast.error('Error adding product', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Error adding product', { duration: 3000 });
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteProduct(deleteProductId);
      toast.success('Product deleted successfully', { duration: 3000 });
      fetchProductsData();
    } catch {
      toast.error('Error deleting product', { duration: 3000 });
    } finally {
      setConfirmationDialogOpen(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
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
            color: 'red'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <IconX onClick={() => handleDelete(params.row.id)} />
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    }
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
        <ProductForm onSubmit={handleAddProduct}
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
  subject: 'product'
}

export default Products;
