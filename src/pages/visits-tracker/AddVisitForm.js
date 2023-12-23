// AddVisitsTrackerForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';

const AddVisitsTrackerForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    designation: '',
    mobileNo: '',
    visitNo: '',
    visitDate: '',
    discussionSummary: '',
    opportunityForUs: '',
    enquiryExpectedBy: '',
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
          <Typography variant='h5'>Add Visit</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Designation'
            name='designation'
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Mobile No'
            name='mobileNo'
            value={formData.mobileNo}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Visit No'
            name='visitNo'
            value={formData.visitNo}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <TextField
            label='Discussion Summary'
            name='discussionSummary'
            multiline
            rows={4}
            value={formData.discussionSummary}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Opportunity for us</InputLabel>
            <Select
              name='opportunityForUs'
              value={formData.opportunityForUs}
              onChange={handleChange}
            >
              <MenuItem value='SPV'>SPV</MenuItem>
              <MenuItem value='SWH'>SWH</MenuItem>
              <MenuItem value='BOTH'>BOTH</MenuItem>
              <MenuItem value='Others'>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Enquiry Expected By'
            name='enquiryExpectedBy'
            value={formData.enquiryExpectedBy}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Next Visit Date'
            name='nextVisitDate'
            type='date'
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

export default AddVisitsTrackerForm;
