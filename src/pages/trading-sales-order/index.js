// Import necessary dependencies
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Sidebar from 'src/@core/components/sidebar'
import { Button } from '@mui/material'
import AddSalesOrderForm from './AddSalesOrderForm'
import {
  createTradingSalesOrder,
  fetchTradingSalesOrder,
  editTradingSalesOrder,
  deleteTradingSalesOrder
} from 'src/utility/api'
import toast from 'react-hot-toast'
import Router from 'next/router'
import { IconEye, IconEdit, IconX } from '@tabler/icons-react'
import EditSalesOrderForm from './EditSalesOrderForm'
import ConfirmationDialog from 'src/utility/confirmation'

const TradingSalesOrder = () => {
  const [salesOrders, setSalesOrder] = useState([])
  const [editOpen, setEditOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [deleteSalesOrderId, setDeleteSalesorderId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  const toggleSidebar = () => setOpen(!open)

  const handleViewClient = clientId => {
    Router.push(`/clients/view?id=${clientId}`)
  }

  const handleViewSalesOrder = clientId => {
    Router.push(`/trading-sales-order/view?id=${clientId}`)
  }

  const handleEditCancel = () => {
    setEditOpen(false)
  }

  const handleEdit = rowData => {
    setSelectedRowData(rowData)
    setEditOpen(true)
  }

  const handleEditSalesOrder = async (id, editedData) => {
    try {
      const response = await editTradingSalesOrder(id, editedData)

      toast.success('Sales Order Updated successfully', { duration: 3000 })
    } catch {
      toast.error('Error in updating Sales Order', { duration: 3000 })
    }

    // Close the edit modal
    setEditOpen(false)
    getSalesOrder()
  }

  const handleDelete = id => {
    setDeleteSalesorderId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      await deleteTradingSalesOrder(deleteProposalId)
      toast.success('Sales Order deleted successfully', { duration: 3000 })
    } catch {
      toast.error('Error deleting Sales order', { duration: 3000 })
    } finally {
      getSalesOrder()
      setConfirmationDialogOpen(false)
    }
  }

  const columns = [
    {
      field: 'clientName',
      headerName: 'Client Name',
      flex: 1,
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
          onClick={() => handleViewClient(params.row.clientId)}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {params.row.clientName}
        </div>
      )
    },
    {
      field: 'project',
      headerName: 'Project',
      flex: 1
    },
    {
      field: 'siteLocation', // Add this line for siteLocation
      headerName: 'Site Location',
      flex: 1
    },
    {
      field: 'orderStatus',
      headerName: 'Order Status',
      flex: 1
    },
    {
      field: 'fy',
      headerName: 'FY',
      flex: 1
    },
    {
      field: 'paymentStage',
      headerName: 'Payment Stage',
      flex: 1
    },
    {
      field: 'creditAmount',
      headerName: 'Credit Amount',
      flex: 1
    },
    {
      field: 'remark',
      headerName: 'Remark',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '5px'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => handleViewSalesOrder(params.row.id)}
          >
            <IconEye />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconEdit onClick={() => handleEdit(params.row)} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '7px',
              color: 'red'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <IconX onClick={() => handleDelete(params.row.id)} />
          </div>
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false
    }
  ]

  const getSalesOrder = async () => {
    const res = await fetchTradingSalesOrder()

    const ccc = res.data.map(row => ({
      ...row,
      id: row._id,
      clientId: row.clientId._id,
      clientName: row.clientId.clientName
    }))
    setSalesOrder(ccc)
  }

  useEffect(() => {
    getSalesOrder()
  }, [])

  const handleAddSalesOrder = async formData => {
    try {
      const res = await createTradingSalesOrder(formData)
      toast.success('Sales Order Added Successfully.', { duration: 3000 })
    } catch {
      toast.error('Error creating Sales Order', { duration: 3000 })
    }
    getSalesOrder()
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

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
                        id: false
                      }
                    },
                    pagination: {
                      paginationModel: {
                        pageSize: 5
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
          padding: 5
        }}
      >
        <AddSalesOrderForm onSubmit={handleAddSalesOrder} onCancel={handleCancel} />
      </Sidebar>
      <Sidebar show={editOpen} sx={{ padding: 5 }}>
        <EditSalesOrderForm data={selectedRowData} onSubmit={handleEditSalesOrder} onCancel={handleEditCancel} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  )
}

TradingSalesOrder.acl = {
  action: 'read',
  subject: 'salesorder'
}

export default TradingSalesOrder
