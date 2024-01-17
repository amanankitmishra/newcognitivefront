import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { getClientList } from 'src/utility/api';

const EditEnquiryForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    capacity: '',
    clientId: '',
    offerSubmissionDate: '',
    offerSubmitted: '',
    project: '',
    projectType: '',
    quotedMarginPercentage: '',
    quotedMarginValue: '',
    quotedValue: '',
    ratePerWatt: '',
    remark: '',
    revision: '',
    uom: '',
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
    fetchClientList();
    if (data) {
      setFormData({
        capacity: data.capacity || '',
        clientId: data.clientId || '',
        offerSubmissionDate: data.offerSubmissionDate || '',
        offerSubmitted: data.offerSubmitted || '',
        project: data.project || '',
        projectType: data.projectType || '',
        quotedMarginPercentage: data.quotedMarginPercentage || '',
        quotedMarginValue: data.quotedMarginValue || '',
        quotedValue: data.quotedValue || '',
        ratePerWatt: data.ratePerWatt || '',
        remark: data.remark || '',
        revision: data.revision || '',
        uom: data.uom || '',
      })
    }
  }, [data])

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
          <TextField label='Offer Submission Date' type='date' name='offerSubmissionDate' value={formData.offerSubmissionDate} onChange={handleChange} fullWidth InputLabelProps={{
            shrink: true,
          }}
            InputProps={{
              placeholder: 'dd/mm/yyyy',
            }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Quoted Value' name='quotedValue' value={formData.quotedValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Quoted Margin Percentage' name='quotedMarginPercentage' value={formData.quotedMarginPercentage} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Quoted Margin Value' name='quotedMarginValue' value={formData.quotedMarginValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Revision'
            name='revision'
            select
            value={formData.revision}
            onChange={handleChange}
            fullWidth>
            <MenuItem key={1} value={"R1"}>
              R1
            </MenuItem>
            <MenuItem key={2} value={"R2"}>
              R2
            </MenuItem>
            <MenuItem key={3} value={"R3"}>
              R3
            </MenuItem>
            <MenuItem key={4} value={"R4"}>
              R4
            </MenuItem>
            <MenuItem key={5} value={"R5"}>
              R5
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Rate Per Watt'
            name='ratePerWatt'
            value={formData.ratePerWatt}
            onChange={handleChange}
            fullWidth />
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

EditEnquiryForm.acl = {
  action: 'read',
  subject: 'enquiry'
}

export default EditEnquiryForm;
