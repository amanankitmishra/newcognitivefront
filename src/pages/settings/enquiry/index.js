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
import { fetchEnquiryNumbers, addEnquiryNumber, markActiveEnquiryNumber, deleteEnquiryNumber } from 'src/utility/api'
import Tooltip from '@mui/material/Tooltip'

const EnquirySettings = () => {
  const initialAddATENFormData = {
    prefix: '',
    startingNumber: ''
  }

  const [tradingEnquiryNumbers, setTradingEnquiryNumbers] = useState([])
  const [openATEN, setOpenATEN] = useState(false)

  const [formData, setFormData] = useState(initialAddATENFormData)

  const getTradingEnquiryNumbers = async () => {
    const response = await fetchEnquiryNumbers()

    const ccc = response.data.map(row => ({
      ...row,
      id: row._id
    }))
    setTradingEnquiryNumbers(ccc)
  }

  const handleATENInputChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleMarkActive = async id => {
    try {
      const response = await markActiveEnquiryNumber(id)
      toast.success('Sequence Activated', { duration: 3000 })
      getTradingEnquiryNumbers()
    } catch {
      toast.success('Error in Activating Sequence', { duration: 3000 })
    }
  }

  const handleDeleteTEN = async id => {
    try {
      const response = await deleteEnquiryNumber(id)
      toast.success('Sequence Deleted', { duration: 3000 })
    } catch {
      toast.error('Error in Deleting Sequence', { duration: 3000 })
    }
    getTradingEnquiryNumbers()
  }

  const ColumnsTradingEnquiry = [
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
            <IconX onClick={() => handleDeleteTEN(params.row.id)} />
          </div>
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false
    }
  ]

  useEffect(() => {
    getTradingEnquiryNumbers()
  }, [])

  const onATENClose = () => {
    setOpenATEN(false)
  }

  const onATENOpen = () => {
    setOpenATEN(true)
  }

  const handleATENSave = async () => {
    try {
      const response = await addEnquiryNumber(formData)
      toast.success('Successfully Added Sequence', { duration: 3000 })
      getTradingEnquiryNumbers()
      setFormData(initialAddATENFormData)
    } catch {
      toast.error('Error while Adding Sequence', { duration: 3000 })
    }
    onATENClose()
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Enquiries Sequence'></CardHeader>
            <CardContent>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={tradingEnquiryNumbers}
                  columns={ColumnsTradingEnquiry}
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
              <Button onClick={onATENOpen}>Add</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openATEN} onClose={onATENClose}>
        <DialogTitle>Add Trading Enquiry Number</DialogTitle>
        <DialogContent>
          <TextField
            label='Prefix'
            name='prefix'
            value={formData.prefix}
            onChange={handleATENInputChange}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Starting Number'
            name='startingNumber'
            value={formData.startingNumber}
            onChange={handleATENInputChange}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onATENClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleATENSave} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

EnquirySettings.acl = {
  action: 'manage',
  subject: 'settings'
}

export default EnquirySettings
