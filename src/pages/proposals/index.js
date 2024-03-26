import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Sidebar from 'src/@core/components/sidebar'
import { Button } from '@mui/material'
import AddProposalForm from './AddProposalForm'
import EditProposalForm from './EditProposalForm'
import { createProposal, fetchProposals, editProposal, deleteProposal } from 'src/utility/api'
import toast from 'react-hot-toast'
import Router from 'next/router'
import { IconEye, IconEdit, IconX } from '@tabler/icons-react'
import ConfirmationDialog from 'src/utility/confirmation'

const Proposals = () => {
  const handleViewProposal = clientId => {
    Router.push(`/proposals/view?id=${clientId}`)
  }

  const handleViewClient = clientId => {
    Router.push(`/clients/view?id=${clientId}`)
  }

  const columns = [
    { field: 'id', headerName: 'S.No.', flex: 1 },
    { field: 'quotationNumber', headerName: 'Quotation Number', flex: 1 },
    {
      field: 'clientName',
      headerName: 'Client',
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
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: params => (
        <div
          style={{
            color: params.row.status === 'LIVE' ? 'green' : params.row.status === 'LIVE-HOT' ? 'red' : 'black',
            fontWeight: 'bold'
          }}
        >
          {params.row.status}
        </div>
      )
    },
    { field: 'project', headerName: 'Project', flex: 1 },
    { field: 'projectType', headerName: 'SPV / SWH', flex: 1 },
    { field: 'capacity', headerName: 'Capacity', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'quotedValue', headerName: 'Quoted Value', flex: 1 },
    { field: 'ratePerWatt', headerName: 'Rate Per Watt', flex: 1 },
    { field: 'quotedMarginValue', headerName: 'Quoted Margin Value', flex: 1 },
    { field: 'quotedMarginPercentage', headerName: 'Quoted Margin Percentage', flex: 1 },
    { field: 'remark', headerName: 'Remarks', flex: 1 },
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
            onClick={() => handleViewProposal(params.row.id)}
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

  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [allProposals, setAllProposals] = useState([])
  const [deleteProposalId, setDeleteProposalId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState(null)

  const getAllProposals = async () => {
    const res = await fetchProposals()

    const ccc = res.data.map(row => ({
      ...row,
      id: row._id,
      clientId: row.clientId._id,
      clientName: row.clientId.clientName
    }))
    setAllProposals(ccc)
  }

  useEffect(() => {
    getAllProposals()
  }, [])

  const toggleSidebar = () => setOpen(!open)

  const handleAddProposal = async formData => {
    try {
      const res = await createProposal(formData)
      toast.success('Proposal Added Successfully.', { duration: 3000 })
      getAllProposals()
    } catch {
      toast.error('Error creating Proposal', { duration: 3000 })
    }

    setOpen(false)

    // Add logic to update live proposals state or send data to API
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleEditCancel = () => {
    setEditOpen(false)
  }

  const handleEdit = rowData => {
    setSelectedRowData(rowData)
    setEditOpen(true)
  }

  const handleEditProposal = async (id, editedData) => {
    try {
      const response = await editProposal(id, editedData)

      toast.success('Proposal Updated successfully', { duration: 3000 })
    } catch {
      toast.error('Error in updating Proposal', { duration: 3000 })
    }

    // Close the edit modal
    setEditOpen(false)
    getAllProposals()
  }

  const handleDelete = id => {
    setDeleteProposalId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      await deleteProposal(deleteProposalId)
      toast.success('Proposal deleted successfully', { duration: 3000 })
    } catch {
      toast.error('Error deleting proposal', { duration: 3000 })
    } finally {
      getAllProposals()
      setConfirmationDialogOpen(false)
    }
  }

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='All Proposals 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add Proposal
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={allProposals}
                  columns={columns}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        id: false,
                        quotedMarginValue: false,
                        quotedMarginPercentage: false,
                        projectType: false,
                        uom: false,
                        remark: false
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
        <AddProposalForm onSubmit={handleAddProposal} onCancel={handleCancel} />
      </Sidebar>
      <Sidebar show={editOpen} sx={{ padding: 5 }}>
        <EditProposalForm data={selectedRowData} onSubmit={handleEditProposal} onCancel={handleEditCancel} />
      </Sidebar>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  )
}

Proposals.acl = {
  action: 'read',
  subject: 'solarProposal'
}

export default Proposals
