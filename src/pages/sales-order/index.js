// Import necessary dependencies
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddSalesOrderForm from './AddSalesOrderForm';

// Sample data for Sales Order
const salesOrders = [
  {
    id: 1,
    salesOrderNo: 'SO123',
    client: 'ABC Corp',
    project: 'Project X',
    siteLocation: 'Site A',
    orderStatus: 'Running',
    poReceived: true,
    poReceivingDate: '2023-01-15',
    fy: '2023-2024',
    clientAddress: '123 Main St, Cityville',
    panNo: 'ABCDE1234F',
    gstNo: 'GSTIN1234567890',
    poNo: 'PO456',
    poDate: '2023-01-12',
    billToAddress: '456 Business Ave, Townsville',
    shipToAddress: '789 Shipping St, Villageland',
    clientContactPerson: 'John Doe',
    contactNo: '123-456-7890',
    spvSwh: 'SPV',
    poValue: '$20,000',
    paymentTerms: 'Net 30 Days',
    document: 'Invoice',
    creditAmount: '$5,000',
    dueAmtWithGst: '$15,000',
    pendingToInvoice: '$10,000',
    percentBillingDone: '80%',
    percentBillingPending: '20%',
    remark: 'Lorem ipsum dolor sit amet',
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
  },

  // Add more sales orders as needed
];

const columns = [
  {
    field: 'id',
    headerName: 'S. No.',
    flex: 1,
  },
  {
    field: 'salesOrderNo',
    headerName: 'Sales Order No',
    flex: 1,
  },
  {
    field: 'client',
    headerName: 'Client',
    flex: 1,
  },
  {
    field: 'project',
    headerName: 'Project',
    flex: 1,
  },
  {
    field: 'siteLocation',
    headerName: 'Site Location',
    flex: 1,
  },
  {
    field: 'orderStatus',
    headerName: 'Order Status',
    flex: 1,
  },
  {
    field: 'POReceived',
    headerName: 'PO Received',
    flex: 1,
  },
  {
    field: 'POReceivingDate',
    headerName: 'PO Receiving Date',
    flex: 1,
  },
  {
    field: 'FY',
    headerName: 'FY',
    flex: 1,
  },
  {
    field: 'clientAddress',
    headerName: 'Client Address',
    flex: 1,
  },
  {
    field: 'PANNo',
    headerName: 'PAN No.',
    flex: 1,
  },
  {
    field: 'GSTNo',
    headerName: 'GST No.',
    flex: 1,
  },
  {
    field: 'PONo',
    headerName: 'PO No',
    flex: 1,
  },
  {
    field: 'PODate',
    headerName: 'PO Date',
    flex: 1,
  },
  {
    field: 'billToAddress',
    headerName: 'Bill To Address',
    flex: 1,
  },
  {
    field: 'shipToAddress',
    headerName: 'Ship To Address',
    flex: 1,
  },
  {
    field: 'clientContactPerson',
    headerName: 'Client Contact Person',
    flex: 1,
  },
  {
    field: 'contactNo',
    headerName: 'Contact No',
    flex: 1,
  },
  {
    field: 'SPVSWH',
    headerName: 'SPV/SWH',
    flex: 1,
  },
  {
    field: 'POValue',
    headerName: 'PO Value',
    flex: 1,
  },
  {
    field: 'paymentTerms',
    headerName: 'Payment Terms',
    flex: 1,
  },
  {
    field: 'document',
    headerName: 'Document',
    flex: 1,
  },
  {
    field: 'creditAmount',
    headerName: 'Credit Amount',
    flex: 1,
  },
  {
    field: 'dueAmtWithGST',
    headerName: 'Due Amt. with GST',
    flex: 1,
  },
  {
    field: 'pendingToInvoice',
    headerName: 'Pending to Invoice',
    flex: 1,
  },
  {
    field: 'percentBillingDone',
    headerName: '% Billing Done',
    flex: 1,
  },
  {
    field: 'percentBillingPending',
    headerName: '% Billing Pending',
    flex: 1,
  },
  {
    field: 'remark',
    headerName: 'Remark',
    flex: 1,
  },
  {
    field: 'totalWOGST',
    headerName: 'Total W/O GST',
    flex: 1,
  },
  {
    field: 'valueForGSTPercent',
    headerName: 'Value For GST %',
    flex: 1,
  },
  {
    field: 'applicableGSTPercent',
    headerName: 'Applicable GST %',
    flex: 1,
  },
  {
    field: 'GSTValue',
    headerName: 'GST Value',
    flex: 1,
  },
  {
    field: 'withGSTPercent',
    headerName: 'With GST %',
    flex: 1,
  },
  {
    field: 'WOGST',
    headerName: 'W/O GST',
    flex: 1,
  },
  {
    field: 'withGST',
    headerName: 'With GST',
    flex: 1,
  },
  {
    field: 'stage',
    headerName: 'Stage',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
  },
  {
    field: 'valueWOGST',
    headerName: 'Value W/O GST',
    flex: 1,
  },
  {
    field: 'valueWithGST',
    headerName: 'Value With GST',
    flex: 1,
  },
  {
    field: 'docNo',
    headerName: 'Doc. No.',
    flex: 1,
  },
  {
    field: 'dated',
    headerName: 'Dated',
    flex: 1,
  },
  {
    field: 'WOGSTForPayment',
    headerName: 'W/O GST For Payment',
    flex: 1,
  },
  {
    field: 'withGSTForPayment',
    headerName: 'With GST For Payment',
    flex: 1,
  },
];


const SalesOrder = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen(!open);

  const handleAddSalesOrder = (formData) => {
    console.log('Form submitted:', formData);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Sales Orders 📑'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Sales Order
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={salesOrders}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                      },
                    },
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  slots={{ toolbar: GridToolbar }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Sidebar
        show={open}
        sx={{
          padding: 5,
        }}
        direction='right'
      >
        <AddSalesOrderForm onSubmit={handleAddSalesOrder} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

export default SalesOrder;
