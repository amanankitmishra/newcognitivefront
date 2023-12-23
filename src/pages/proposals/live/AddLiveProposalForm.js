// AddLiveProposalsForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const AddLiveProposalsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: 1,
    client: '',
    project: '',
    spvSwh: '',
    capacity: '',
    uom: '',
    quotedValue: '',
    ratePerWatt: '',
    profitMargin: '',
    profitValue: '',
    contactPerson: '',
    contactNumber: '',
    remarks: '',
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
      <Grid container spacing={2} maxWidth="sm">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="h5">
            Add New Live Proposal
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Client" name="client" value={formData.client} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Project" name="project" value={formData.project} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
          <TextField label="SPV / SWH" name="spvSwh" value={formData.spvSwh} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Capacity" name="capacity" value={formData.capacity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="UOM" name="uom" value={formData.uom} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Quoted Value" name="quotedValue" value={formData.quotedValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Rate Per Watt" name="ratePerWatt" value={formData.ratePerWatt} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Profit Margin" name="profitMargin" value={formData.profitMargin} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Profit Value" name="profitValue" value={formData.profitValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Remarks" name="remarks" value={formData.remarks} onChange={handleChange} fullWidth multiline />
        </Grid>
        <Grid container sx={{ marginTop: 2 }} spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Grid>
          <Grid item>
            <Button type="button" onClick={onCancel} variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddLiveProposalsForm;
