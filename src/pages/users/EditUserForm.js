import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';

const EditUserForm = ({ data, onSubmit, onCancel }) => {
  const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (data) {
      setFormData({

        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        role: data.role || '',


      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    calculateFields()
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data._id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ pb: 2 }}>Add User</Typography>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Password"
            fullWidth
            value={formData.password}
            type='password'
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Role"
            fullWidth
            select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <MenuItem key={1} value={"sales"}>
              Sales
            </MenuItem>
            <MenuItem key={1} value={"accounts"}>
              Accounts
            </MenuItem>
            <MenuItem key={1} value={"tendering"}>
              Tendering
            </MenuItem>
            <MenuItem key={1} value={"admin"}>
              Admin
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container sx={{ marginTop: 2 }} spacing={2} justifyContent='flex-end'>
        <Grid item>
          <Button type='submit' variant='contained' color='primary'>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button type='button' onClick={onCancel} variant='outlined'>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form >
  );
};

EditUserForm.acl = {
  action: 'read',
  subject: 'user'
}

export default EditUserForm;
