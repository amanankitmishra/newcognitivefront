import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { getClientList } from 'src/utility/api';
import { MenuItem } from '@mui/material';

const AddEnquiryForm = ({ onSubmit, onCancel }) => {

  const [clientList, setClientList] = useState([]);

  const initialFormData = {
    clientId: '',
    project: '',
    projectType: '',
    capacity: '',
    uom: '',
    offerSubmitted: '',
    enquiryDate: '',
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
    if (name === 'projectType') {
      const uom = value === 'SPV' ? 'KWP' : value === 'SWH' ? 'LPD' : '';
      setFormData((prevData) => ({
        ...prevData,
        uom,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add New Enquiry</Typography>
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
          <TextField label='Project' name='project' value={formData.project} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Project Type'
            select
            name='projectType'
            value={formData.projectType}
            onChange={handleChange}
            fullWidth>
            <MenuItem key={1} value={"SPV"}>
              SPV
            </MenuItem>
            <MenuItem key={2} value={"SWH"}>
              SWH
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField label='Capacity' name='capacity' value={formData.capacity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='UOM'
            select
            disabled
            name='uom'
            value={formData.uom}
            onChange={handleChange}
            fullWidth>
            <MenuItem key={1} value={"KWP"}>
              KWP
            </MenuItem>
            <MenuItem key={2} value={"LPD"}>
              LPD
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Offer Submitted"
            select
            fullWidth
            name="offerSubmitted"
            value={formData.offerSubmitted}
            onChange={handleChange}
          >
            <MenuItem key={1} value={"YES"}>
              YES
            </MenuItem>
            <MenuItem key={2} value={"NO"}>
              NO
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField label='Enquiry Date' type='date' name='enquiryDate' value={formData.enquiryDate} onChange={handleChange} fullWidth InputLabelProps={{
            shrink: true,
          }}
            InputProps={{
              placeholder: 'dd/mm/yyyy',
            }} />
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

AddEnquiryForm.acl = {
  action: 'read',
  subject: 'solarEnquiry'
}

export default AddEnquiryForm;
