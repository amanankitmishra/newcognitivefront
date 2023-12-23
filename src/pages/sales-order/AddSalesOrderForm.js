// AddSalesOrderForm.jsx
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const AddSalesOrderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    salesOrderNo: '',
    client: '',
    project: '',
    siteLocation: '',
    orderStatus: '',
    poReceived: false,
    poReceivingDate: '',
    fy: '',
    clientAddress: '',
    panNo: '',
    gstNo: '',
    poNo: '',
    poDate: '',
    billToAddress: '',
    shipToAddress: '',
    clientContactPerson: '',
    contactNo: '',
    spvSwh: '',
    capacity: '',
    uom: '',
    remark: '',
    totalWOGST: '',
    valueForGSTPercent: '',
    applicableGSTPercent: '',
    GSTValue: '',
    withGSTPercent: '',
    WOGST: '',
    withGST: '',
    stage: '',
    type: '',
    valueWOGST: '',
    valueWithGST: '',
    docNo: '',
    dated: '',
    WOGSTForPayment: '',
    withGSTForPayment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='lg'>
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>Add Sales Order</Typography>
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Sales Order No.'
            name='salesOrderNo'
            value={formData.salesOrderNo}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Client'
            name='client'
            value={formData.client}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Project'
            name='project'
            value={formData.project}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Site Location'
            name='siteLocation'
            value={formData.siteLocation}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Order Status'
            name='orderStatus'
            value={formData.orderStatus}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PO Received'
            name='poReceived'
            value={formData.poReceived}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PO Receiving Date'
            name='poReceivingDate'
            value={formData.poReceivingDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='FY'
            name='fy'
            value={formData.fy}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Client Address'
            name='clientAddress'
            value={formData.clientAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PAN No.'
            name='panNo'
            value={formData.panNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='GST No.'
            name='gstNo'
            value={formData.gstNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PO No.'
            name='poNo'
            value={formData.poNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PO Date'
            name='poDate'
            value={formData.poDate}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Bill To Address'
            name='billToAddress'
            value={formData.billToAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Ship To Address'
            name='shipToAddress'
            value={formData.shipToAddress}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Client Contact Person'
            name='clientContactPerson'
            value={formData.clientContactPerson}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Contact No.'
            name='contactNo'
            value={formData.contactNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='SPV/SWH'
            name='spvSwh'
            value={formData.spvSwh}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='PO Value'
            name='poValue'
            value={formData.poValue}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Payment Terms'
            name='paymentTerms'
            value={formData.paymentTerms}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Document'
            name='document'
            value={formData.document}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Credit Amount'
            name='creditAmount'
            value={formData.creditAmount}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Due Amt. with GST'
            name='dueAmtWithGst'
            value={formData.dueAmtWithGst}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Pending to Invoice'
            name='pendingToInvoice'
            value={formData.pendingToInvoice}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='% Billing Done'
            name='percentBillingDone'
            value={formData.percentBillingDone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='% Billing Pending'
            name='percentBillingPending'
            value={formData.percentBillingPending}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Remark'
            name='remark'
            value={formData.remark}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Total W/O GST'
            name='totalWOGST'
            value={formData.totalWOGST}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Value For GST %'
            name='valueForGSTPercent'
            value={formData.valueForGSTPercent}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Applicable GST %'
            name='applicableGSTPercent'
            value={formData.applicableGSTPercent}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='GST Value'
            name='GSTValue'
            value={formData.GSTValue}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='With GST %'
            name='withGSTPercent'
            value={formData.withGSTPercent}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='W/O GST'
            name='WOGST'
            value={formData.WOGST}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='With GST'
            name='withGST'
            value={formData.withGST}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Stage'
            name='stage'
            value={formData.stage}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Type'
            name='type'
            value={formData.type}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Value W/O GST'
            name='valueWOGST'
            value={formData.valueWOGST}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Value With GST'
            name='valueWithGST'
            value={formData.valueWithGST}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Doc. No.'
            name='docNo'
            value={formData.docNo}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='Dated'
            name='dated'
            value={formData.dated}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='W/O GST For Payment'
            name='WOGSTForPayment'
            value={formData.WOGSTForPayment}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label='With GST For Payment'
            name='withGSTForPayment'
            value={formData.withGSTForPayment}
            onChange={handleChange}
            fullWidth
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
  );
};

export default AddSalesOrderForm;
