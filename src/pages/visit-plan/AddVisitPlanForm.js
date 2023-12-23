// AddVisitPlanForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const AddVisitPlanForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    client: '',
    location: '',
    visitDate: '',
    visitBy: '',
    natureOfVisit: '',
    remark: '',
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
          <Typography variant='h5'>Add Visit Plan</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Client'
            name='client'
            value={formData.client}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Location'
            name='location'
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Visit Date'
            name='visitDate'
            type='date'
            value={formData.visitDate}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Visit By'
            name='visitBy'
            value={formData.visitBy}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Nature of Visit'
            name='natureOfVisit'
            value={formData.natureOfVisit}
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

export default AddVisitPlanForm;
