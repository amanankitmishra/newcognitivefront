import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  InputAdornment,
} from '@mui/material';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const initialFormData = {
  clientName: '',
  officeAddress: '',
  contactPersons: [
    {
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
    },
  ],
};

const ClientForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (index, field, value) => {
    const updatedContactPersons = [...formData.contactPersons];
    updatedContactPersons[index][field] = value;

    setFormData((prevData) => ({
      ...prevData,
      contactPersons: updatedContactPersons,
    }));
  };

  const addContactPerson = () => {
    setFormData((prevData) => ({
      ...prevData,
      contactPersons: [
        ...prevData.contactPersons,
        {
          contactPerson: '',
          contactNumber: '',
          contactEmail: '',
        },
      ],
    }));
  };

  const removeContactPerson = (index) => {
    const updatedContactPersons = [...formData.contactPersons];
    updatedContactPersons.splice(index, 1);

    setFormData((prevData) => ({
      ...prevData,
      contactPersons: updatedContactPersons,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ pb: 2 }}>Add Client</Typography>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12}>
          <TextField
            label="Client Name"
            fullWidth
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Office Address"
            fullWidth
            value={formData.officeAddress}
            onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Contact Persons</Typography>
        </Grid>
        <Grid item xs={12}>
          {formData.contactPersons.map((contactPerson, index) => (
            <Grid container spacing={2} key={index} sx={{ pb: 2 }}>
              <Grid item xs={4}>
                <TextField
                  label="Contact Person"
                  fullWidth
                  value={contactPerson.contactPerson}
                  onChange={(e) => handleInputChange(index, 'contactPerson', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      index > 0 && (
                        <InputAdornment position="start">
                          <IconButton onClick={() => removeContactPerson(index)}>
                            <IconMinus />
                          </IconButton>
                        </InputAdornment>
                      )
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Contact Number"
                  fullWidth
                  value={contactPerson.contactNumber}
                  onChange={(e) => handleInputChange(index, 'contactNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Contact Email"
                  fullWidth
                  value={contactPerson.contactEmail}
                  onChange={(e) => handleInputChange(index, 'contactEmail', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12}>
          <IconButton onClick={addContactPerson}>
            <IconPlus />
          </IconButton>
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
    </form >
  );
};

export default ClientForm;
