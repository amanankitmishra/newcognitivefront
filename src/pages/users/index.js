import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconDotsVertical, IconEye } from '@tabler/icons-react';
import Link from 'next/link';
import Router from 'next/router';
import { fetchAllUsers, createUser } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';
import toast from 'react-hot-toast';
import UserForm from './AddUserForm';


const Users = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsersData = async () => {
    try {
      const response = await fetchAllUsers()

      const userdataWithId = response.data.map((row) => ({
        ...row,
        id: row._id,
      }));

      setUsers(userdataWithId)
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);




  const toggleSidebar = () => {
    setOpen(!open);
  };

  const handleAddUser = async (formData) => {
    try {
      const response = await createUser(formData);
      if (response.status === 201) {

        // Show success notification

        toast.success('User added successfully', { duration: 3000 });
        fetchUsersData();

      } else {

        // Show error notification
        toast.error('Error adding User', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Error adding User', { duration: 3000 });
    }

    // Close the sidebar in both success and error cases
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleViewUser = (userId) => {
    Router.push(`/users/view?id=${userId}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'role',
      headerName: 'User Role',
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
            <CardHeader title='Users 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add User
                </Button>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={users}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
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
        <UserForm onSubmit={handleAddUser} onCancel={handleCancel} />
      </Sidebar>

    </div>
  );
};

export default Users;
