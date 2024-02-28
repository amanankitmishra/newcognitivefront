import React, { useState } from 'react'
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
  FormControl
} from '@mui/material'
import { IconPlus, IconMinus } from '@tabler/icons-react'

const initialFormData = {
  vendorName: '',
  officeAddress: '',
  city: '',
  state: '',
  contactPersons: [
    {
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      contactDesignation: ''
    }
  ]
}

const VendorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialFormData)

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }))
  }

  const handleContactPersonChange = (index, field, value) => {
    const updatedContactPersons = [...formData.contactPersons]
    updatedContactPersons[index] = {
      ...updatedContactPersons[index],
      [field]: value
    }

    setFormData(prevData => ({
      ...prevData,
      contactPersons: updatedContactPersons
    }))
  }

  const addContactPerson = () => {
    setFormData(prevData => ({
      ...prevData,
      contactPersons: [
        ...prevData.contactPersons,
        {
          contactPerson: '',
          contactNumber: '',
          contactEmail: '',
          contactDesignation: ''
        }
      ]
    }))
  }

  const removeContactPerson = index => {
    const updatedContactPersons = [...formData.contactPersons]
    updatedContactPersons.splice(index, 1)

    setFormData(prevData => ({
      ...prevData,
      contactPersons: updatedContactPersons
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)

    setFormData(initialFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant='h5' sx={{ pb: 2 }}>
        Add Vendor
      </Typography>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12}>
          <TextField
            label='Vendor Name'
            fullWidth
            value={formData.vendorName}
            onChange={e => handleInputChange('vendorName', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Office Address'
            fullWidth
            value={formData.officeAddress}
            onChange={e => handleInputChange('officeAddress', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='City'
            fullWidth
            value={formData.city}
            onChange={e => handleInputChange('city', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='State'
            fullWidth
            value={formData.state}
            onChange={e => handleInputChange('state', e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Contact Persons</Typography>
        </Grid>
        <Grid item xs={12}>
          {formData.contactPersons.map((contactPerson, index) => (
            <Grid container spacing={2} key={index} sx={{ pb: 2 }}>
              <Grid item xs={3}>
                <TextField
                  label='Contact Person'
                  fullWidth
                  value={contactPerson.contactPerson}
                  onChange={e => handleContactPersonChange(index, 'contactPerson', e.target.value)}
                  InputProps={{
                    startAdornment: index > 0 && (
                      <InputAdornment position='start'>
                        <IconButton onClick={() => removeContactPerson(index)}>
                          <IconMinus />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label='Contact Number'
                  fullWidth
                  value={contactPerson.contactNumber}
                  onChange={e => handleContactPersonChange(index, 'contactNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label='Contact Email'
                  fullWidth
                  value={contactPerson.contactEmail}
                  onChange={e => handleContactPersonChange(index, 'contactEmail', e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label='Contact Designation'
                  fullWidth
                  value={contactPerson.contactDesignation}
                  onChange={e => handleContactPersonChange(index, 'contactDesignation', e.target.value)}
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
    </form>
  )
}

VendorForm.acl = {
  action: 'read',
  subject: 'vendor'
}

export default VendorForm
