import React, { useState, useEffect } from 'react'
import { Grid, Typography, Container, Button } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Sidebar from 'src/@core/components/sidebar'
import { Card, CardHeader, CardContent } from '@mui/material'
import { IconDotsVertical, IconEye, IconX } from '@tabler/icons-react'
import VendorForm from './AddVendorForm'
import Link from 'next/link'
import Router from 'next/router'
import { fetchVendors, createVendor, deleteVendor } from 'src/utility/api'
import { formatTimestamp } from 'src/utility/utility'
import toast from 'react-hot-toast'
import ConfirmationDialog from 'src/utility/confirmation'

const VendorsMain = () => {
  const [vendors, setVendors] = useState([])
  const [open, setOpen] = useState(false)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [deleteVendorId, setDeleteVendorId] = useState(null)

  const toggleSidebar = () => {
    setOpen(!open)
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'vendorName', headerName: 'Vendor Name', flex: 1 },
    {
      field: 'officeAddress',
      headerName: 'Office Address',
      flex: 1
    },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <div
          style={{
            display: 'inline-flex'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              paddingRight: '5px'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => handleViewVendor(params.row.id)}
          >
            <IconEye />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.5s',
              color: 'red'
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => handleDelete(params.row.id)}
          >
            <IconX />
          </div>
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false
    }
  ]

  const getAllVendors = async () => {
    const response = await fetchVendors()

    const ccc = response.data.allVendors.map(row => ({
      ...row,
      id: row._id
    }))
    setVendors(ccc)
  }

  const handleAddVendor = async formData => {
    try {
      const response = await createVendor(formData)
      if (response.status === 201) {
        // Show success notification

        toast.success('Vendor added successfully', { duration: 3000 })
        getAllVendors()
      } else {
        // Show error notification
        toast.error('Error adding vendor', { duration: 3000 })
      }
    } catch (error) {
      console.error('Error adding vendor:', error)
      toast.error('Error adding vendor', { duration: 3000 })
    }

    // Close the sidebar in both success and error cases
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleDelete = id => {
    setDeleteVendorId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      // console.log(deleteEnquiryId)
      await deleteVendor(deleteVendorId)
      toast.success('Vendor deleted successfully', { duration: 3000 })
      getAllVendors()
    } catch {
      toast.error('Error deleting vendor', { duration: 3000 })
    } finally {
      setConfirmationDialogOpen(false)
    }
  }

  const handleViewVendor = vendorId => {
    Router.push(`/vendors/view?id=${vendorId}`)
  }

  useEffect(() => {
    getAllVendors()
  }, [])

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Vendors 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Vendor
                </Button>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={vendors}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        officeAddress: false,
                        officeLocation: false,
                        designation: false
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
      <Sidebar show={open} sx={{ padding: 5 }}>
        <VendorForm onSubmit={handleAddVendor} onCancel={handleCancel} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  )
}

VendorsMain.acl = {
  action: 'read',
  subject: 'vendor'
}

export default VendorsMain
