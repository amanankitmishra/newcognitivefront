import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Router from 'next/router';
import { IconUserPlus, IconCalendarPlus } from '@tabler/icons-react'; // Assuming you have a calendar icon
import { fetchClientById, addContactPerson, addVisit } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';

const ViewClient = () => {
  const { id } = Router.query;
  const [client, setClient] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openVisitModal, setOpenVisitModal] = useState(false);

  const [newContactPerson, setNewContactPerson] = useState({
    contactPerson: '',
    contactNumber: '',
    contactEmail: '',
    contactDesignation: ''
  });

  const [newVisit, setNewVisit] = useState({
    visitDate: '',
    purpose: '',
    summary: '',
  });

  const fetchClient = async () => {
    try {
      console.log(id)
      const response = await fetchClientById(id);

      setClient(response.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  useEffect(() => {

    fetchClient();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenVisit = () => {
    setOpenVisitModal(true);
  }

  const handleCloseVisit = () => {
    setOpenVisitModal(false);
  }

  const handleAddContactPerson = async () => {

    try {

      console.log(newContactPerson)
      const response = await addContactPerson(id, newContactPerson);
      if (response.status === 201) {
        // Show success notification

        toast.success('Contact Person Added', { duration: 3000 });
        fetchClient();

      } else {

        // Show error notification
        toast.error('Error adding contact person', { duration: 3000 });
      }
    } catch (error) {

      toast.error('Error adding contact person', { duration: 3000 });
    }

    // Reset the form
    setNewContactPerson({
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      contactDesignation: ''
    });

    // Close the modal
    handleCloseModal();
  };

  const handleAddVisit = async () => {
    try {
      const response = await addVisit(id, newVisit);
      if (response.status === 201) {
        toast.success('Visit Added', { duration: 3000 });
        fetchClient();
      } else {
        toast.error('Error adding visit', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Error adding visit', { duration: 3000 });
    }


    setNewVisit({
      visitDate: '',
      purpose: '',
      summary: '',
    });

    handleCloseVisit();
    fetchClient();
  };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant='h4'>
                {client.clientName.toUpperCase()}
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '12px' }}>
                {client.nature.toUpperCase()}
              </Typography>
              <Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'uppercase', pt: 4 }}>
                office Address
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '14px' }}>
                {client.officeAddress}
              </Typography>
              <Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'uppercase', pt: 4 }}>Contact Persons</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Contact Person</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Contact Email</TableCell>
                    <TableCell>Designation</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {client.contactPersons.map((contactPerson, index) => (
                    <TableRow key={index}>
                      <TableCell>{contactPerson.contactPerson}</TableCell>
                      <TableCell>{contactPerson.contactNumber}</TableCell>
                      <TableCell>{contactPerson.contactEmail}</TableCell>
                      <TableCell>{contactPerson.contactDesignation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ mt: 2 }}>
                <IconUserPlus />
              </Button>
              <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Add New Contact Person</DialogTitle>
                <DialogContent>
                  {/* Form to add new contact person */}
                  <TextField
                    label="Contact Person"
                    value={newContactPerson.contactPerson}
                    onChange={(e) => setNewContactPerson({ ...newContactPerson, contactPerson: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Contact Number"
                    value={newContactPerson.contactNumber}
                    onChange={(e) => setNewContactPerson({ ...newContactPerson, contactNumber: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Contact Email"
                    value={newContactPerson.contactEmail}
                    onChange={(e) => setNewContactPerson({ ...newContactPerson, contactEmail: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Contact Designation"
                    value={newContactPerson.contactDesignation}
                    onChange={(e) => setNewContactPerson({ ...newContactPerson, contactDesignation: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddContactPerson} color="primary">
                    Add Contact Person
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'uppercase', pt: 4 }}>
                Visits
              </Typography>

              <Timeline position="alternate">
                {client.visits.map((visit, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot color="primary" />
                      {index < client.visits.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="subtitle1">{formatTimestamp(visit.visitDate)}</Typography>
                      <Typography variant="body1">{visit.purpose}</Typography>
                      <Typography variant="body2" color="textSecondary">{visit.summary}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
              <Button variant="contained" color="primary" onClick={handleOpenVisit} sx={{ mt: 2 }}>
                <IconCalendarPlus />
              </Button>
              <Dialog open={openVisitModal} onClose={handleCloseVisit}>
                <DialogTitle>Add New Visit</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Visit Date"
                    type="date"
                    value={newVisit.visitDate}
                    onChange={(e) => setNewVisit({ ...newVisit, visitDate: e.target.value })}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      placeholder: 'dd/mm/yyyy',
                    }}
                  />
                  <TextField
                    label="Purpose"
                    value={newVisit.purpose}
                    onChange={(e) => setNewVisit({ ...newVisit, purpose: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Summary"
                    value={newVisit.summary}
                    onChange={(e) => setNewVisit({ ...newVisit, summary: e.target.value })}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseVisit} color="secondary">
                    Cancel
                  </Button>
                  <Button onClick={handleAddVisit} color="primary">
                    Add Visit
                  </Button>
                </DialogActions>
              </Dialog>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

ViewClient.acl = {
  action: 'read',
  subject: 'client'
}

export default ViewClient;
