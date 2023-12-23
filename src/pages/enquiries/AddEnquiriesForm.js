import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';

const AddEnquiryForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    quotationNumber: '',
    enquiryDate: '',
    client: '',
    project: '',
    spvSwh: '',
    capacity: '',
    uom: '',
    offerSubmitted: false,
    offerSubmissionDate: '',
    valueQuoted: '',
    revisionNumber: '',
    ratePerWatt: '',
    quotedMargin: '',
    clientContactPerson: '',
    clientContactNumber: '',
    clientContactEmail: '',
    remark: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
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
          <Typography variant='h5'>Add New Enquiry</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField label='Quotation No.' name='quotationNumber' value={formData.quotationNumber} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Enquiry Date' type='date' name='enquiryDate' value={formData.enquiryDate} onChange={handleChange} fullWidth required InputLabelProps={{
            shrink: true,
          }}
            InputProps={{
              placeholder: 'dd/mm/yyyy',
            }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Client' name='client' value={formData.client} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Project' name='project' value={formData.project} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='SPV / SWH' name='spvSwh' value={formData.spvSwh} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Capacity' name='capacity' value={formData.capacity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='UOM' name='uom' value={formData.uom} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Checkbox checked={formData.offerSubmitted} onChange={handleCheckboxChange} name='offerSubmitted' />}
            label='Offer Submitted'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Offer Submission Date' type='date' name='offerSubmissionDate' value={formData.offerSubmissionDate} onChange={handleChange} fullWidth InputLabelProps={{
            shrink: true,
          }}
            InputProps={{
              placeholder: 'dd/mm/yyyy',
            }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Value Quoted' name='valueQuoted' value={formData.valueQuoted} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Revision Number' name='revisionNumber' value={formData.revisionNumber} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Rate Per Watt' name='ratePerWatt' value={formData.ratePerWatt} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Quoted Margin' name='quotedMargin' value={formData.quotedMargin} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Client Contact Person' name='clientContactPerson' value={formData.clientContactPerson} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Client Contact Number' name='clientContactNumber' value={formData.clientContactNumber} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Client Contact Email' type='email' name='clientContactEmail' value={formData.clientContactEmail} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Remark' name='remark' value={formData.remark} onChange={handleChange} fullWidth multiline />
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

export default AddEnquiryForm;
