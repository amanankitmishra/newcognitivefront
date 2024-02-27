import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material'
import { getClientList, getProductList } from 'src/utility/api'

const EditEnquiryForm = ({ data, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    project: '',
    productId: '',
    offerSubmitted: '',
    offerSubmissionDate: '',
    enquiryDate: '',
    remark: ''
  })

  const [clientList, setClientList] = useState([])
  const [productList, setProductList] = useState([])

  const fetchClientList = async () => {
    try {
      const response = await getClientList()
      setClientList(response.data)
    } catch (error) {
      console.log('Error fetching client list:', error)
    }
  }

  const fetchProductList = async () => {
    try {
      const response = await getProductList()
      setProductList(response.data)
    } catch (error) {
      console.log('Error fetching product list:', error)
    }
  }

  useEffect(() => {
    fetchClientList()
    fetchProductList()
    if (data) {
      setFormData({
        clientId: data.clientId || '',
        project: data.project || '',
        productId: data.productId || '',
        offerSubmitted: data.offerSubmitted || '',
        offerSubmissionDate: data.offerSubmissionDate || '',
        enquiryDate: data.enquiryDate || '',
        remark: data.remark || ''
      })
    }
  }, [data])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(data._id, formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add New Enquiry</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Client'
            select
            fullWidth
            name='clientId'
            value={formData.clientId}
            onChange={handleChange}
            required
          >
            {clientList.map(client => (
              <MenuItem key={client._id} value={client._id}>
                {client.clientName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Enquiry Date'
            type='date'
            name='enquiryDate'
            value={formData.enquiryDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              placeholder: 'dd/mm/yyyy'
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Project' name='project' value={formData.project} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Product'
            select
            fullWidth
            name='productId'
            value={formData.productId}
            onChange={handleChange}
            required
          >
            {productList.map(product => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label='Offer Submitted'
            select
            fullWidth
            name='offerSubmitted'
            value={formData.offerSubmitted}
            onChange={handleChange}
          >
            <MenuItem key={1} value={'YES'}>
              YES
            </MenuItem>
            <MenuItem key={2} value={'NO'}>
              NO
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Offer Submission Date'
            type='date'
            name='offerSubmissionDate'
            value={formData.offerSubmissionDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              placeholder: 'dd/mm/yyyy'
            }}
          />
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
  )
}

EditEnquiryForm.acl = {
  action: 'read',
  subject: 'enquiry'
}

export default EditEnquiryForm
