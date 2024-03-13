import { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import toast from 'react-hot-toast'
import { IconChecks, IconX } from '@tabler/icons-react'
import {
  fetchProposalNumbers,
  addProposalNumber,
  markActiveProposalNumber,
  deleteProposalNumber
} from 'src/utility/api'
import Tooltip from '@mui/material/Tooltip'

const ProposalSettings = () => {
  const initialAddATPNFormData = {
    prefix: '',
    startingNumber: ''
  }

  const [tradingProposalNumbers, setTradingProposalNumbers] = useState([])
  const [openATPN, setOpenATPN] = useState(false)

  const [formData, setFormData] = useState(initialAddATPNFormData)

  const getTradingProposalNumbers = async () => {
    const response = await fetchProposalNumbers()

    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))
    setTradingProposalNumbers(ccc)
  }

  const handleATPNInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleMarkActive = async id => {
    try {
      const response = await markActiveProposalNumber(id)
      toast.success('Sequence Activated', { duration: 3000 })
      getTradingProposalNumbers()
    } catch {
      toast.success('Error in Activating Sequence', { duration: 3000 })
    }
  }

  const handleDeleteTPN = async id => {
    try {
      const response = await deleteProposalNumber(id)
      toast.success('Sequence Deleted', { duration: 3000 })
    } catch {
      toast.error('Error in Deleting Sequence', { duration: 3000 })
    }
    getTradingProposalNumbers()
  }

  const ColumnsTradingProposal = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'prefix', headerName: 'Prefix', flex: 1 },
    { field: 'currentNumber', headerName: 'Current Number', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <div>
          <Tooltip title='Mark As Active' arrow>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.5s',
                paddingRight: '5px',
                color: params.row.active ? 'green' : 'inherit'
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              onClick={() => handleMarkActive(params.row.id)}
            >
              <IconChecks />
            </div>
          </Tooltip>
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
            <IconX onClick={() => handleDeleteTPN(params.row.id)} />
          </div>
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false
    }
  ]

  useEffect(() => {
    getTradingProposalNumbers()
  }, [])

  const onATPNClose = () => {
    setOpenATPN(false)
  }

  const onATPNOpen = () => {
    setOpenATPN(true)
  }

  const handleATPNSave = async () => {
    try {
      const response = await addProposalNumber(formData)
      toast.success('Successfully Added Sequence', { duration: 3000 })
      getTradingProposalNumbers()
      setFormData(initialAddATPNFormData)
    } catch {
      toast.error('Error while Adding Sequence', { duration: 3000 })
    }
    onATPNClose()
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Proposals Sequence'></CardHeader>
            <CardContent>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={tradingProposalNumbers}
                  columns={ColumnsTradingProposal}
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
              <Button onClick={onATPNOpen}>Add</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openATPN} onClose={onATPNClose}>
        <DialogTitle>Add Trading Proposal Number</DialogTitle>
        <DialogContent>
          <TextField
            label='Prefix'
            name='prefix'
            value={formData.prefix}
            onChange={handleATPNInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Starting Number'
            name='startingNumber'
            value={formData.startingNumber}
            onChange={handleATPNInputChange}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onATPNClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleATPNSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ProposalSettings.acl = {
  action: 'manage',
  subject: 'settings'
}

export default ProposalSettings
