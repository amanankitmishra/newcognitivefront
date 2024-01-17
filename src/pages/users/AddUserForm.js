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
  email: '',
  password: '',
  role: ''
};

const UserForm = ({ onSubmit, onCancel }) => {
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
      <Typography variant="h5" sx={{ pb: 2 }}>Add User</Typography>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Password"
            fullWidth
            value={formData.password}
            type='password'
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Role"
            fullWidth
            select
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
          >
            <MenuItem key={1} value={"sales"}>
              Sales
            </MenuItem>
            <MenuItem key={1} value={"accounts"}>
              Accounts
            </MenuItem>
            <MenuItem key={1} value={"tendering"}>
              Tendering
            </MenuItem>
            <MenuItem key={1} value={"admin"}>
              Admin
            </MenuItem>
          </TextField>
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

UserForm.acl = {
  action: 'read',
  subject: 'user'
}

export default UserForm;
