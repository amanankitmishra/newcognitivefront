import React, { useEffect, useState } from 'react';
import { fetchMeetings, fetchClients, createMeeting } from 'src/utility/api';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import { IconCalendarPlus } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { formatTimestamp } from 'src/utility/utility';


const DashboardCalendar = () => {

  const newMeeting = {
    clientId: '',
    clientName: '',
    location: '',
    meetingDate: '',
    agenda: ''
  }

  const [meetings, setMeetings] = useState([])
  const [clients, setClients] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(newMeeting);


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'clientId') {
      const selectedClient = clients.find((client) => client._id === value);
      setFormData((prevData) => ({
        ...prevData,
        clientId: value,
        clientName: selectedClient ? selectedClient.clientName : '',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const toggleAddMeeting = () => setOpen(!open);


  const getAllMeetings = async () => {
    try {
      const response = await fetchMeetings();
      const ccc = response.data.meetings.map((row) => ({
        ...row,
        id: row._id,
        meetingDate: formatTimestamp(row.meetingDate)
      }));
      setMeetings(ccc)
    }
    catch {
      console.log("error fetching meetings")
    }
  }

  const getAllClients = async () => {
    try {
      const response = await fetchClients();

      setClients(response.data.allClients)
    }
    catch {
      console.log("error fetching clients")
    }
  }

  const handleAddMeetingSubmit = async () => {
    try {
      const response = await createMeeting(formData);
      toast.success('Meeting Created successfully', { duration: 3000 });
      getAllMeetings();
      setFormData(newMeeting);

    } catch (e) {
      console.log(e)
      toast.error('Error Creating Meeting', { duration: 3000 });
    }

    toggleAddMeeting();

  }

  useEffect(() => {
    getAllClients();
    getAllMeetings();
  }, []);

  const meetingColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'clientName', headerName: 'Client', flex: 1 },
    { field: 'meetingDate', headerName: 'Date', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'agenda', headerName: 'Agenda', flex: 1 }
  ]

  return (
    <div>
      <Card>
        <CardHeader title='Meetings 🚀'></CardHeader>
        <CardContent>
          <div style={{ textAlign: "right", marginBottom: '15px' }}>
            <Button onClick={toggleAddMeeting} variant='contained' color='primary'>
              <IconCalendarPlus size={18} />
            </Button>
          </div>
          <div style={{ height: '300px' }}>
            <DataGrid
              rows={meetings}
              columns={meetingColumns}
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
            >
            </DataGrid>
          </div>

        </CardContent>
      </Card>
      <Dialog open={open} onClose={toggleAddMeeting}>
        <DialogTitle>Add Meeting</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} maxWidth="sm">
            <Grid item xs={6}>
              <TextField
                label="Client"
                select
                fullWidth
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
              >
                {clients.map((client) => (
                  <MenuItem key={client._id} value={client._id}>
                    {client.clientName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Meeting Date"
                fullWidth
                type="date"
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Agenda"
                fullWidth
                name="agenda"
                value={formData.agenda}
                onChange={handleChange}
              />
            </Grid>
          </Grid>



        </DialogContent>
        <DialogActions>
          <Button onClick={toggleAddMeeting} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddMeetingSubmit} color="primary">
            Add Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  )
}

DashboardCalendar.acl = {
  action: 'read',
  subject: 'dashboard-calendar'
}

export default DashboardCalendar;
