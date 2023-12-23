import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const AddOleadsForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    client: '',
    endCustomer: '',
    project: '',
    siteAddress: '',
    siteLocation: '',
    contactName: '',
    designation: '',
    contactEmail: '',
    contactMobile: '',
    opportunityFor: '',
    enquiryExpectedBy: '',
    leadSource: '',
    leadDate: '',
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
          <Typography variant="h5">Add New Opportunity Lead</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="End Customer"
            name="endCustomer"
            value={formData.endCustomer}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Site Address"
            name="siteAddress"
            value={formData.siteAddress}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Site Location"
            name="siteLocation"
            value={formData.siteLocation}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Contact Name"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Contact Email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Contact Mobile"
            name="contactMobile"
            value={formData.contactMobile}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Opportunity For"
            name="opportunityFor"
            value={formData.opportunityFor}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Enquiry Expected By"
            name="enquiryExpectedBy"
            value={formData.enquiryExpectedBy}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Lead Source"
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Lead Date"
            name="leadDate"
            value={formData.leadDate}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
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
    </form>
  );
};

export default AddOleadsForm;
