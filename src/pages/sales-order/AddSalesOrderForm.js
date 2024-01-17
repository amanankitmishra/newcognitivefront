// AddSalesOrderForm.jsx
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Typography, MenuItem } from '@mui/material';
import { getClientList } from 'src/utility/api';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const AddSalesOrderForm = ({ onSubmit, onCancel }) => {

  const initialFormData = {
    client: '',
    salesOrderNo: '',
    project: '',
    siteLocation: '',
    orderStatus: '',
    poReceived: '',
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
    totalWOGST: 0,
    firstValueForGSTPercent: 0,
    firstApplicableGST: 18,
    firstGSTValue: 0,
    firstWithGST: 0,
    secondValueForGSTPercent: 0,
    secondApplicableGST: 12,
    secondGSTValue: 0,
    secondWithGST: 0,
    paymentPercentage: '',
    paymentWOGST: '',
    paymentWithGST: '',
    paymentStage: '',
    documentType: '',
    documentValueWOGST: 0,
    documentValueWithGST: 0,
    documentNo: '',
    documentDated: '',
    creditAmount: 0,
    dueAmountWithGST: 0,
    pendingToInvoiceWOGST: 0,
    pendingToInvoiceWithGST: 0,
    billingDonePercentage: 0,
    billingPendingPercentage: 0

  }

  const [formData, setFormData] = useState(initialFormData);

  const [clientList, setClientList] = useState([])

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
    calculateFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    calculateFields();
  };


  const calculateFields = () => {
    setFormData((prevData) => {
      const { totalWOGST, firstApplicableGST, secondApplicableGST, creditAmount, documentValueWithGST, documentValueWOGST } = prevData;

      const firstValueForGSTPercent = totalWOGST * 0.7;
      const secondValueForGSTPercent = totalWOGST * 0.3;
      const firstGSTValue = firstValueForGSTPercent * firstApplicableGST / 100;
      const secondGSTValue = secondValueForGSTPercent * secondApplicableGST / 100;
      const firstWithGST = firstValueForGSTPercent + firstGSTValue;
      const secondWithGST = secondValueForGSTPercent + secondGSTValue;
      const dueAmountWithGST = documentValueWithGST - creditAmount;
      const pendingToInvoiceWOGST = firstValueForGSTPercent - documentValueWOGST;
      const pendingToInvoiceWithGST = firstWithGST - documentValueWithGST;
      const billingDonePercentage = documentValueWOGST / totalWOGST * 100
      const billingPendingPercentage = 100 - billingDonePercentage

      return {
        ...prevData,
        firstValueForGSTPercent,
        secondValueForGSTPercent,
        firstGSTValue,
        secondGSTValue,
        firstWithGST,
        secondWithGST,
        dueAmountWithGST,
        pendingToInvoiceWOGST,
        pendingToInvoiceWithGST,
        billingDonePercentage,
        billingPendingPercentage
      };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} maxWidth='xl'>

        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant='h5'>
            Add Sales Order
          </Typography>
        </Grid>
        <Grid item xs={2}>
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
        <Grid item xs={2}>
          <TextField
            label="Sales Order No."
            fullWidth
            name="salesOrderNo"
            value={formData.salesOrderNo}
            onChange={handleChange}
            required
          >
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Project"
            fullWidth
            name="project"
            value={formData.project}
            onChange={handleChange}
            required
          >
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Site Location"
            fullWidth
            name="siteLocation"
            value={formData.siteLocation}
            onChange={handleChange}
            required
          >

          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Order Status"
            select
            fullWidth
            name="orderStatus"
            value={formData.orderStatus}
            onChange={handleChange}
            required
          >
            <MenuItem key={1} value={"Running"}>
              Running
            </MenuItem>
            <MenuItem key={2} value={"Completed"}>
              Completed
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="PO Received"
            select
            fullWidth
            name="poReceived"
            value={formData.poReceived}
            onChange={handleChange}
            required
          >
            <MenuItem key={1} value={"Yes"}>
              Yes
            </MenuItem>
            <MenuItem key={2} value={"No"}>
              No
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="PO Receiving Date"
            type='date'
            fullWidth
            name='poReceivingDate'
            value={formData.poReceivingDate}
            onChange={handleChange}
            required

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Financial Year"
            fullWidth
            name='fy'
            value={formData.fy}
            onChange={handleChange}
            required

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="PAN No."
            fullWidth
            name='panNo'
            value={formData.panNo}
            onChange={handleChange}
            required

          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="GST No."
            fullWidth
            name='gstNo'
            value={formData.gstNo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="PO No."
            fullWidth
            name='poNo'
            value={formData.poNo}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="PO Date"
            fullWidth
            name='poDate'
            value={formData.poDate}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>
                PO VALUE
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total Without GST"
                fullWidth
                name='totalWOGST'
                value={formData.totalWOGST}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="First Value For GST %"
                fullWidth
                name='firstValueForGSTPercent'
                value={formData.firstValueForGSTPercent}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="First Applicable GST"
                fullWidth
                name='firstApplicableGST'
                value={formData.firstApplicableGST}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="First GST Value"
                fullWidth
                name='firstGSTValue'
                value={formData.firstGSTValue}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="First With GST"
                fullWidth
                name='firstWithGST'
                value={formData.firstWithGST}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Second Value For GST %"
                fullWidth
                name='secondValueForGSTPercent'
                value={formData.secondValueForGSTPercent}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Second Applicable GST"
                fullWidth
                name='secondApplicableGST'
                value={formData.secondApplicableGST}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Second GST Value"
                fullWidth
                name='secondGSTValue'
                value={formData.secondGSTValue}
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Second With GST"
                fullWidth
                name='secondWithGST'
                value={formData.secondWithGST}
                disabled
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>
                Payment Terms
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Percentage"
                fullWidth
                name='paymentPercentage'
                value={formData.paymentPercentage}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="WO GST"
                fullWidth
                name='paymentWOGST'
                value={formData.paymentWOGST}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="With GST"
                fullWidth
                name='paymentWithGST'
                value={formData.paymentWithGST}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Stage"
                fullWidth
                name='paymentStage'
                value={formData.paymentStage}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1'>
                Document
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Type"
                select
                fullWidth
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                required
              >
                <MenuItem key={1} value={"PI"}>
                  PI
                </MenuItem>
                <MenuItem key={2} value={"TAX INVOICE"}>
                  TAX INVOICE
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Value Without GST"
                fullWidth
                name="documentValueWOGST"
                value={formData.documentValueWOGST}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Value With GST"
                fullWidth
                name="documentValueWithGST"
                value={formData.documentValueWithGST}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Document No."
                fullWidth
                name="documentNo"
                value={formData.documentNo}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Dated"
                fullWidth
                name="documentDated"
                type='date'
                value={formData.documentDated}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Credit Amount"
                fullWidth
                name='creditAmount'
                value={formData.creditAmount}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Due Amount With GST"
                fullWidth
                name='dueAmountWithGST'
                value={formData.dueAmountWithGST}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid xs={12} p={2}>
              <Typography variant='body1'>
                Pending To Invoice
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Without GST"
                fullWidth
                name='pendingToInvoiceWOGST'
                value={formData.pendingToInvoiceWOGST}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="With GST"
                fullWidth
                name='pendingToInvoiceWithGST'
                value={formData.pendingToInvoiceWithGST}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="% Billing Done"
                fullWidth
                name='billingDonePercentage'
                value={formData.billingDonePercentage}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="% Billing Pending"
                fullWidth
                name='billingPendingPercentage'
                value={formData.billingPendingPercentage}
                onChange={handleChange}
                disabled
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
  );
};

export default AddSalesOrderForm;
