// EditOleadsForm.js

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography, MenuItem } from '@mui/material';
import { getClientList } from 'src/utility/api';

const EditBoqForm = ({ data, onSubmit, onCancel }) => {

  const [formData, setFormData] = useState({
    itemHead: '',
    specification: '',
    make: '',
    quantity: '',
    uom: '',
    remark: '',
  });

  const [clientList, setClientList] = useState([]);

  const fetchClientList = async () => {
    try {
      const response = await getClientList();
      setClientList(response.data);
    } catch (error) {
      console.log('Error fetching client list:', error);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData(
        {
          itemHead: data.itemHead || '',
          specification: data.specification || '',
          make: data.make || '',
          quantity: data.quantity || '',
          uom: data.uom || '',
          remark: data.remark || '',
        });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data._id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add BOQ</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Item Head'
            name='itemHead'
            value={formData.itemHead}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Specification'
            name='specification'
            value={formData.specification}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Make'
            name='make'
            value={formData.make}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Quantity'
            name='quantity'
            type='number'
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='UOM'
            name='uom'
            value={formData.uom}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Remark'
            name='remark'
            multiline
            rows={4}
            value={formData.remark}
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
EditBoqForm.acl = {
  action: 'read',
  subject: 'boq'
}

export default EditBoqForm;
