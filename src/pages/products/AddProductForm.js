import React, { useState } from 'react';
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const initialFormData = {
  name: '',
  description: ''
};

const ProductForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ pb: 2 }}>Add Product</Typography>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12}>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
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
    </form >
  );
};

ProductForm.acl = {
  action: 'read',
  subject: 'client'
}

export default ProductForm;
