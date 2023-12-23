// AddKeyCustomerDatabaseForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

const AddKeyCustomerDatabaseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: '',
    officeAddress: '',
    officeLocation: '',
    contactPerson: '',
    contactNo: '',
    emailId: '',
    designation: '',
    natureOfClient: '',
    lastVisitDate: '',
    nextVisitDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add Key Customer</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Customer'
            name='customer'
            value={formData.customer}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Office Address'
            name='officeAddress'
            value={formData.officeAddress}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Office Location'
            name='officeLocation'
            value={formData.officeLocation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Contact Person'
            name='contactPerson'
            value={formData.contactPerson}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Contact No'
            name='contactNo'
            value={formData.contactNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='E-Mail id'
            name='emailId'
            value={formData.emailId}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Designation'
            name='designation'
            value={formData.designation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Nature of Client</InputLabel>
            <Select
              name='natureOfClient'
              value={formData.natureOfClient}
              onChange={handleChange}
            >
              <MenuItem value='Contractor'>Contractor</MenuItem>
              <MenuItem value='End Client'>End Client</MenuItem>
              <MenuItem value='Consultant'>Consultant</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Last Visit Date'
            name='lastVisitDate'
            value={formData.lastVisitDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Next Visit Date'
            name='nextVisitDate'
            value={formData.nextVisitDate}
            onChange={handleChange}
            fullWidth
          />
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
    </form>
  );
};

export default AddKeyCustomerDatabaseForm;
