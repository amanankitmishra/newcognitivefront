import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { MenuItem } from '@mui/material'
import { getClientList, getProductList } from 'src/utility/api'

const EditSalesOrderForm = ({ data, onSubmit, onCancel }) => {
  const initialFormData = {
    clientId: '',
    salesOrderNo: '',
    project: '',
    siteLocation: '',
    orderStatus: '',
    poReceived: '',
    poReceivingDate: '',
    fy: '',
    pan: '',
    gst: '',
    poNumber: '',
    poDate: '',
    billToAddress: '',
    shipToAddress: '',
    productId: '',
    quantity: 0,
    uom: '',
    totalWithoutGst: 0,
    valueForGstPercentage: 0,
    applicableGstPercentage: 0,
    gstValue: 0,
    totalWithGst: 0,
    paymentPercentage: 0,
    paymentWithoutGst: 0,
    paymentWithGst: 0,
    paymentStage: '',
    documentType: '',
    documentValueWithoutGst: 0,
    documentValueWithGst: 0,
    documentNumber: '',
    documentDated: '',
    creditAmount: 0,
    dueAmountWithGST: 0,
    pendingToInvoiceWithoutGst: 0,
    pendingToInvoiceWithGst: 0,
    billingPercentageDone: 0,
    billingPercentagePending: 0,
    remark: ''
  }

  const [formData, setFormData] = useState(initialFormData)
  const [clientList, setClientList] = useState([])
  const [productList, setProductList] = useState([])

  const fetchClientList = async () => {
    const res = await getClientList()
    setClientList(res.data)
  }

  const fetchProductList = async () => {
    const res = await getProductList()
    setProductList(res.data)
  }

  useEffect(() => {
    fetchClientList()
    fetchProductList()
    if (data) {
      setFormData({
        clientId: data.clientId || '',
        salesOrderNo: data.salesOrderNo || '',
        project: data.project || '',
        siteLocation: data.siteLocation || '',
        orderStatus: data.orderStatus || '',
        poReceived: data.poReceived || '',
        poReceivingDate: data.poReceivingDate || '',
        fy: data.fy || '',
        pan: data.pan || '',
        gst: data.gst || '',
        poNumber: data.poNumber || '',
        poDate: data.poDate || '',
        billToAddress: data.billToAddress || '',
        shipToAddress: data.shipToAddress || '',
        productId: data.productId || '',
        quantity: data.quantity || 0,
        uom: data.uom || '',
        totalWithoutGst: data.totalWithoutGst || 0,
        valueForGstPercentage: data.valueForGstPercentage || 0,
        applicableGstPercentage: data.applicableGstPercentage || 0,
        gstValue: data.gstValue || 0,
        totalWithGst: data.totalWithGst || 0,
        paymentPercentage: data.paymentPercentage || 0,
        paymentWithoutGst: data.paymentWithoutGst || 0,
        paymentWithGst: data.paymentWithGST || 0,
        paymentStage: data.paymentStage || '',
        documentType: data.documentType || '',
        documentValueWithoutGst: data.documentValueWithoutGst || 0,
        documentValueWithGst: data.documentValueWithGST || 0,
        documentNumber: data.documentNumber || '',
        documentDated: data.documentDated || '',
        creditAmount: data.creditAmount || 0,
        dueAmountWithGST: data.dueAmountWithGST || 0,
        pendingToInvoiceWithoutGst: data.pendingToInvoiceWithoutGst || 0,
        pendingToInvoiceWithGst: data.pendingToInvoiceWithGST || 0,
        billingPercentageDone: data.billingPercentageDone || 0,
        billingPercentagePending: data.billingPendingPercentage || 0,
        remark: data.remark || ''
      })
    }
    calculateFields()
  }, [data])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
    calculateFields()
  }

  const calculateFields = () => {
    setFormData(prevData => {
      const { totalWithoutGst, applicableGstPercentage, documentValueWithGst, documentValueWithoutGst, creditAmount } =
        prevData

      const valueForGstPercentage = totalWithoutGst * 0.7
      const gstValue = valueForGstPercentage * (applicableGstPercentage / 100)
      const totalWithGst = valueForGstPercentage + gstValue
      const dueAmountWithGST = documentValueWithGst - creditAmount
      const pendingToInvoiceWithoutGst = valueForGstPercentage - documentValueWithoutGst
      const pendingToInvoiceWithGst = totalWithGst - documentValueWithGst

      return {
        ...prevData,
        valueForGstPercentage,
        gstValue,
        totalWithGst,
        dueAmountWithGST,
        pendingToInvoiceWithoutGst,
        pendingToInvoiceWithGst
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(data._id, formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='xl'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add Sales Order</Typography>
        </Grid>
        <Grid item xs={2}>
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
        <Grid item xs={2}>
          <TextField
            label='Sales Order No.'
            fullWidth
            name='salesOrderNo'
            value={formData.salesOrderNo}
            onChange={handleChange}
            required
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='Project'
            fullWidth
            name='project'
            value={formData.project}
            onChange={handleChange}
            required
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='Site Location'
            fullWidth
            name='siteLocation'
            value={formData.siteLocation}
            onChange={handleChange}
            required
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='Order Status'
            select
            fullWidth
            name='orderStatus'
            value={formData.orderStatus}
            onChange={handleChange}
            required
          >
            <MenuItem key={1} value={'Running'}>
              Running
            </MenuItem>
            <MenuItem key={2} value={'Completed'}>
              Completed
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='PO Received'
            select
            fullWidth
            name='poReceived'
            value={formData.poReceived}
            onChange={handleChange}
            required
          >
            <MenuItem key={1} value={'Yes'}>
              Yes
            </MenuItem>
            <MenuItem key={2} value={'No'}>
              No
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='PO Receiving Date'
            type='date'
            fullWidth
            name='poReceivingDate'
            value={formData.poReceivingDate}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              placeholder: 'dd/mm/yyyy'
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label='Financial Year' fullWidth name='fy' value={formData.fy} onChange={handleChange} required />
        </Grid>
        <Grid item xs={2}>
          <TextField label='PAN' fullWidth name='pan' value={formData.pan} onChange={handleChange} required />
        </Grid>
        <Grid item xs={2}>
          <TextField label='GST' fullWidth name='gst' value={formData.gst} onChange={handleChange} required />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='PO No.'
            fullWidth
            name='poNumber'
            value={formData.poNumber}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='PO Date'
            fullWidth
            name='poDate'
            type='date'
            value={formData.poDate}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              placeholder: 'dd/mm/yyyy'
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label='Bill To Address'
                fullWidth
                name='billToAddress'
                value={formData.billToAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Ship To Address'
                fullWidth
                name='shipToAddress'
                value={formData.shipToAddress}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
              <TextField
                label='Quantity'
                fullWidth
                name='quantity'
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField label='UOM' fullWidth name='uom' value={formData.uom} onChange={handleChange} required />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ padding: '10px' }}>
              <Typography variant='body1'>PO Value</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Total Without GST'
                fullWidth
                name='totalWithoutGst'
                value={formData.totalWithoutGst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Value For GST %'
                fullWidth
                name='valueForGstPercentage'
                value={formData.valueForGstPercentage}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Applicable GST %'
                fullWidth
                name='applicableGstPercentage'
                value={formData.applicableGstPercentage}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='GST Value'
                fullWidth
                name='gstValue'
                value={formData.gstValue}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Total With GST'
                fullWidth
                name='totalWithGst'
                value={formData.totalWithGst}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ padding: '10px' }}>
              <Typography variant='body1'>Payment Terms</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Payment Percentage'
                fullWidth
                name='paymentPercentage'
                value={formData.paymentPercentage}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Payment Without Gst'
                fullWidth
                name='paymentWithoutGst'
                value={formData.paymentWithoutGst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Payment With GST'
                fullWidth
                name='paymentWithGst'
                value={formData.paymentWithGst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Payment Stage'
                fullWidth
                name='paymentStage'
                value={formData.paymentStage}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ padding: '10px' }}>
              <Typography variant='body1'>Document</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Document Type'
                select
                fullWidth
                name='documentType'
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                <MenuItem key={1} value={'PI'}>
                  PI
                </MenuItem>
                <MenuItem key={2} value={'TAX-INVOICE'}>
                  TAX INVOICE
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Document Value Without GST'
                fullWidth
                name='documentValueWithoutGst'
                value={formData.documentValueWithoutGst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Document Value With GST'
                fullWidth
                name='documentValueWithGst'
                value={formData.documentValueWithGst}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Document Number'
                fullWidth
                name='documentNumber'
                value={formData.documentNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Document Dated'
                fullWidth
                name='documentDated'
                type='date'
                value={formData.documentDated}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  placeholder: 'dd/mm/yyyy'
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label='Credit Amount'
                fullWidth
                name='creditAmount'
                value={formData.creditAmount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Due Amount With GST'
                fullWidth
                name='dueAmountWithGst'
                value={formData.dueAmountWithGST}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Pending To Invoice Without GST'
                fullWidth
                name='pendingToInvoiceWithoutGst'
                value={formData.pendingToInvoiceWithoutGst}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Pending To Invoice With GST'
                fullWidth
                name='pendingToInvoiceWithGst'
                value={formData.pendingToInvoiceWithGst}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Billing % Done'
                fullWidth
                name='billingPercentageDone'
                value={formData.billingPercentageDone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Billing % Pending'
                fullWidth
                name='billingPercentagePending'
                value={formData.billingPercentagePending}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label='Remark'
                fullWidth
                name='remark'
                value={formData.remark}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
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

EditSalesOrderForm.acl = {
  action: 'read',
  subject: 'salesorder'
}

export default EditSalesOrderForm
