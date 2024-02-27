import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material'
import { getClientList, getProductList, getVendorList } from 'src/utility/api'

const AddProposalForm = ({ onSubmit, onCancel }) => {
  const initialFormData = {
    status: '',
    project: '',
    productId: '',
    quantity: '',
    uom: '',
    clientId: '',
    quotedValueToClient: '',
    vendorId: '',
    quotedValueToVendor: '',
    marginValue: '',
    marginPercentage: '',
    currentStatus: '',
    actionPlan: '',
    remarks: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [clientList, setClientList] = useState([])
  const [productList, setProductList] = useState([])
  const [vendorList, setVendorList] = useState([])

  const fetchClientList = async () => {
    const res = await getClientList()
    setClientList(res.data)
  }

  const fetchProductList = async () => {
    const res = await getProductList()
    setProductList(res.data)
  }

  const fetchVendorList = async () => {
    const res = await getVendorList()
    setVendorList(res.data)
  }

  useEffect(() => {
    fetchClientList()
    fetchProductList()
    fetchVendorList()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))

    if (name === 'quotedValueToClient' || name === 'quotedValueToVendor') {
      setFormData(prevData => {
        const QC = parseFloat(prevData.quotedValueToClient) || 0
        const QV = parseFloat(prevData.quotedValueToVendor) || 0

        const MV = QC - QV
        const MP = MV / QC

        return {
          ...prevData,
          marginValue: isNaN(MV) ? '' : MV.toFixed(2),
          marginPercentage: isNaN(MP) ? '' : (MP * 100).toFixed(2)
        }
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formData)
    setFormData(initialFormData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='sm'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add New Proposal</Typography>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label='Status'
            name='status'
            value={formData.status}
            onChange={handleChange}
            fullWidth
            required
            select
          >
            <MenuItem key={1} value='LIVE'>
              LIVE
            </MenuItem>
            <MenuItem key={2} value='LIVE-HOT'>
              LIVE HOT
            </MenuItem>
            <MenuItem key={4} value='CONTRACTOR'>
              CONTRACTOR
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            label='Project'
            name='project'
            value={formData.project}
            onChange={handleChange}
            fullWidth
            required
          />
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
          <TextField label='Quantity' name='quantity' value={formData.quantity} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='UOM' name='uom' value={formData.uom} onChange={handleChange} fullWidth required></TextField>
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
            label='Quoted Value - Client'
            name='quotedValueToClient'
            value={formData.quotedValueToClient}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Vendor'
            select
            fullWidth
            name='vendorId'
            value={formData.vendorId}
            onChange={handleChange}
            required
          >
            {vendorList.map(vendor => (
              <MenuItem key={vendor._id} value={vendor._id}>
                {vendor.vendorName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Quoted Value - Vendor'
            name='quotedValueToVendor'
            value={formData.quotedValueToVendor}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled
            label='Margin Value'
            name='marginValue'
            value={formData.marginValue}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            disabled
            label='Margin Percentage'
            name='marginPercentage'
            value={formData.marginPercentage}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Status'
            name='currentStatus'
            value={formData.currentStatus}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Action Plan'
            name='actionPlan'
            value={formData.actionPlan}
            onChange={handleChange}
            fullWidth
            multiline
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label='Remarks'
            name='remarks'
            value={formData.remarks}
            onChange={handleChange}
            fullWidth
            multiline
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
    </form>
  )
}

AddProposalForm.acl = {
  action: 'read',
  subject: 'proposal'
}

export default AddProposalForm
