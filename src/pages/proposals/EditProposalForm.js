import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import { getClientList } from 'src/utility/api';

const EditProposalForm = ({ data, onSubmit, onCancel }) => {
  const initialFormData = {
    clientId: '',
    status: '',
    project: '',
    projectType: '',
    capacity: '',
    uom: '',
    quotedValue: '',
    quotedMarginPercentage: '',
    quotedMarginValue: '',
    ratePerWatt: '',
    remark: '',
  }

  const [formData, setFormData] = useState(initialFormData);
  const [clientList, setClientList] = useState([])

  const fetchClientList = async () => {
    const res = await getClientList()
    setClientList(res.data)
  }

  useEffect(() => {
    fetchClientList()
    if (data) {
      setFormData({

        clientId: data.clientId || '',
        status: data.status || '',
        project: data.project || '',
        projectType: data.projectType || '',
        capacity: data.capacity || '',
        uom: data.uom || '',
        quotedValue: data.quotedValue || '',
        quotedMarginPercentage: data.quotedMarginPercentage || '',
        quotedMarginValue: data.quotedMarginValue || '',
        ratePerWatt: data.ratePerWatt || '',
        remark: data.remark || '',
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'quotedMarginValue' || name === 'quotedValue') {
      const quotedMarginValue = parseFloat(formData.quotedMarginValue) || 0;
      const quotedValue = parseFloat(formData.quotedValue) || 1;

      const calculatedQuotedMarginPercentage = (quotedMarginValue / quotedValue) * 100;

      setFormData((prevData) => ({
        ...prevData,
        quotedMarginPercentage: isNaN(calculatedQuotedMarginPercentage) ? '' : calculatedQuotedMarginPercentage.toFixed(2),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data._id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth="sm">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="h5">Edit New Proposal</Typography>
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
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
            required
            select
          >
            <MenuItem key={1} value="LIVE">LIVE</MenuItem>
            <MenuItem key={2} value="LIVE-HOT">LIVE HOT</MenuItem>
            <MenuItem key={3} value="CONSULTANT">CONSULTANT</MenuItem>
            <MenuItem key={4} value="CONTRACTOR">CONTRACTOR</MenuItem>
          </TextField>
        </Grid>



        <Grid item xs={6}>
          <TextField
            label="Project Type"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            fullWidth
            required
            select
          >
            <MenuItem key={1} value="SPV">SPV</MenuItem>
            <MenuItem key={2} value="SWH">SWH</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField label="Project" name="project" value={formData.project} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Capacity" name="capacity" value={formData.capacity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="UOM"
            name="uom"
            value={formData.uom}
            onChange={handleChange}
            fullWidth
            required
            select
          >
            <MenuItem key={1} value="KWP">KWP</MenuItem>
            <MenuItem key={2} value="LPD">LPD</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Quoted Value" name="quotedValue" value={formData.quotedValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Quoted Margin Value" name="quotedMarginValue" value={formData.quotedMarginValue} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField disabled label="Quoted Margin Percentage" name="quotedMarginPercentage" value={formData.quotedMarginPercentage} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Rate Per Watt" name="ratePerWatt" value={formData.ratePerWatt} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} fullWidth multiline />
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

EditProposalForm.acl = {
  action: 'read',
  subject: 'proposal'
}

export default EditProposalForm;
