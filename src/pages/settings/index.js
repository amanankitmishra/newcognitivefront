import { useState, useEffect } from "react"
import { Grid, Card, CardHeader, CardContent } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { fetchTradingEnquiryNumbers } from "src/utility/api"

const Settings = () => {

  const [tradingEnquiryNumbers, setTradingEnquiryNumbers] = useState([])
  const [openATEN, setOpenATEN] = useState(false)

  const getTradingEnquiryNumbers = async () => {
    const response = await fetchTradingEnquiryNumbers()
    const ccc = response.data.map((row) => ({
      ...row,
      id: row._id,
    }))
    setTradingEnquiryNumbers(ccc)
  }

  const ColumnsTradingEnquiry = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'prefix', headerName: 'Prefix', flex: 1 },
    { field: 'currentNumber', headerName: 'Current Number', flex: 1 }
  ]

  useEffect(() => {
    getTradingEnquiryNumbers()
  }, [])


  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title="Trading Enquiries Sequence"></CardHeader>
            <CardContent>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={tradingEnquiryNumbers}
                  columns={ColumnsTradingEnquiry}
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
      <Dialog open={openATEN} onClose={onClose}>
        <DialogTitle>{tradingEnquiryNumber ? 'Edit' : 'Create'} Trading Enquiry Number</DialogTitle>
        <DialogContent>
          <TextField
            label="Prefix"
            name="prefix"
            value={formData.prefix}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Current Number"
            name="currentNumber"
            value={formData.currentNumber}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}


Settings.acl = {
  action: 'manage',
  subject: 'settings'
}

export default Settings
