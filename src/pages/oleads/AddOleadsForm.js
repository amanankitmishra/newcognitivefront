import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography, MenuItem } from '@mui/material';
import { getClientList } from 'src/utility/api';

const AddOleadsForm = ({ onSubmit, onCancel }) => {
  const [clientList, setClientList] = useState([]);

  const initialFormData = {
    clientId: '',
    project: '',
    siteAddress: '',
    siteLocation: '',
    oleadFor: '',
    enquiryExpectedBy: '',
    leadSource: '',
    leadDate: '',
    remark: '',
  }

  const [formData, setFormData] = useState(initialFormData);

  const fetchClientList = async () => {
    try {
      const response = await getClientList();
      setClientList(response.data);
    } catch (error) {
      console.log('Error fetching client list:', error);
    }
  };

  useEffect(() => {
    fetchClientList();
  }, []);

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
    setFormData(initialFormData);
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
            select
            fullWidth
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            required
          >
            {clientList.map((client) => (
              <MenuItem key={client._id} value={client._id}>
                {client.clientName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Project"
            fullWidth
            name="project"
            value={formData.project}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Site Address"
            fullWidth
            name="siteAddress"
            value={formData.siteAddress}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Site Location"
            fullWidth
            name="siteLocation"
            value={formData.siteLocation}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Opportunity For"
            fullWidth
            name="oleadFor"
            value={formData.oleadFor}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Enquiry Expected By"
            type="date"
            fullWidth
            name="enquiryExpectedBy"
            value={formData.enquiryExpectedBy}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Lead Source"
            fullWidth
            name="leadSource"
            value={formData.leadSource}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Lead Date"
            type="date"
            fullWidth
            name="leadDate"
            value={formData.leadDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Remark"
            fullWidth
            name="remark"
            value={formData.remark}
            onChange={handleChange}
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
