import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

import {
  Typography,
  Grid,
  Card,
  CardContent,
  TableContainer,
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
  Paper
} from '@mui/material'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Router from 'next/router'
import { IconUserPlus, IconCalendarPlus } from '@tabler/icons-react' // Assuming you have a calendar icon
import {
  getVendorById,
  addContactPersonVendor,
  editContactPersonsVendor,
  deleteContactPersonVendor
} from 'src/utility/api'
import { formatTimestamp } from 'src/utility/utility'
import { IconX, IconEdit } from '@tabler/icons-react'
import ConfirmationDialog from 'src/utility/confirmation'

const ViewClient = () => {
  const { id } = Router.query
  const [vendor, setVendor] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [contactPersons, setContactPersons] = useState([])
  const [editContactPersonId, setEditContactPersonId] = useState(null)
  const [editContactPerson, setEditContactPerson] = useState({})
  const [openEditModal, setOpenEditModal] = useState(false)
  const [deleteContactPersonId, setDeleteContactPersonId] = useState(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)

  const [newContactPerson, setNewContactPerson] = useState({
    contactPerson: '',
    contactNumber: '',
    contactEmail: '',
    contactDesignation: ''
  })

  const getVendorDetails = async () => {
    const response = await getVendorById(id)
    setVendor(response.data.vendor)
    setContactPersons(response.data.vendor.contactPersons)
  }

  useEffect(() => {
    getVendorDetails()
  }, [])

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleAddContactPerson = async () => {
    try {
      const response = await addContactPersonVendor(id, newContactPerson)
      if (response.status === 201) {
        // Show success notification

        toast.success('Contact Person Added', { duration: 3000 })
        getVendorDetails()
      } else {
        // Show error notification
        toast.error('Error adding contact person', { duration: 3000 })
      }
    } catch (error) {
      toast.error('Error adding contact person', { duration: 3000 })
    }

    // Reset the form
    setNewContactPerson({
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      contactDesignation: ''
    })

    // Close the modal
    handleCloseModal()
  }

  const handleEditContactPerson = contact => {
    setEditContactPersonId(contact._id)

    const toBeEdited = {
      contactPerson: contact.contactPerson,
      contactNumber: contact.contactNumber,
      contactEmail: contact.contactEmail,
      contactDesignation: contact.contactDesignation
    }
    setEditContactPerson(toBeEdited)

    setOpenEditModal(true)
  }

  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }

  const handleEditSubmit = async () => {
    try {
      const response = await editContactPersonsVendor(id, editContactPersonId, editContactPerson)
      toast.success('Contact Person Edited', { duration: 3000 })
      getVendorDetails()
    } catch (e) {
      console.log(e)
      toast.error('Error Editing Contact Person', { duration: 3000 })
    }
    setOpenEditModal(false)
  }

  const handleDeleteContactPerson = id => {
    setDeleteContactPersonId(id)
    setConfirmationDialogOpen(true)
  }

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false)
  }

  const handleConfirmationDialogConfirm = async () => {
    try {
      await deleteContactPersonVendor(id, deleteContactPersonId)
      toast.success('Contact Person deleted successfully', { duration: 3000 })
      getVendorDetails()
    } catch {
      toast.error('Error deleting Contact Person', { duration: 3000 })
    } finally {
      setConfirmationDialogOpen(false)
    }
  }

  if (!vendor) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h4'>{vendor.vendorName.toUpperCase()}</Typography>

              <Typography variant='h6' sx={{ fontSize: '16px', textTransform: 'uppercase', pt: 4 }}>
                office Address
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '14px' }}>
                {vendor.officeAddress}
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '14px' }}>
                City : {vendor.city}
              </Typography>
              <Typography variant='body1' sx={{ fontSize: '14px' }}>
                State : {vendor.state}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ marginTop: '10px' }}>
            <CardContent>
              <Typography variant='h5'>Contact Persons</Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handleOpenModal}
                sx={{ padding: '5px', margin: '5px' }}
              >
                <IconUserPlus size={20} />
              </Button>

              {/* Responsive Table */}
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contact Person</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Contact Email</TableCell>
                      <TableCell>Designation</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contactPersons.map(contact => (
                      <TableRow key={contact.id}>
                        <TableCell>{contact.contactPerson}</TableCell>
                        <TableCell>{contact.contactNumber}</TableCell>
                        <TableCell>{contact.contactEmail}</TableCell>
                        <TableCell>{contact.contactDesignation}</TableCell>
                        <TableCell>
                          <div style={{ display: 'inline-flex' }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.5s',
                                marginRight: '5px',
                                color: '#176483'
                              }}
                              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
                              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                              onClick={() => handleEditContactPerson(contact)}
                            >
                              <IconEdit />
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
                              onClick={() => handleDeleteContactPerson(contact._id)}
                            >
                              <IconX />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Add New Contact Person</DialogTitle>
        <DialogContent>
          {/* Form to add new contact person */}
          <TextField
            label='Contact Person'
            value={newContactPerson.contactPerson}
            onChange={e => setNewContactPerson({ ...newContactPerson, contactPerson: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Number'
            value={newContactPerson.contactNumber}
            onChange={e => setNewContactPerson({ ...newContactPerson, contactNumber: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Email'
            value={newContactPerson.contactEmail}
            onChange={e => setNewContactPerson({ ...newContactPerson, contactEmail: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Designation'
            value={newContactPerson.contactDesignation}
            onChange={e => setNewContactPerson({ ...newContactPerson, contactDesignation: e.target.value })}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleAddContactPerson} color='primary'>
            Add Contact Person
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit Contact Person</DialogTitle>
        <DialogContent>
          {/* Form to add new contact person */}
          <TextField
            label='Contact Person'
            value={editContactPerson.contactPerson}
            onChange={e => setEditContactPerson({ ...editContactPerson, contactPerson: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Number'
            value={editContactPerson.contactNumber}
            onChange={e => setEditContactPerson({ ...editContactPerson, contactNumber: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Email'
            value={editContactPerson.contactEmail}
            onChange={e => setEditContactPerson({ ...editContactPerson, contactEmail: e.target.value })}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Contact Designation'
            value={editContactPerson.contactDesignation}
            onChange={e => setEditContactPerson({ ...editContactPerson, contactDesignation: e.target.value })}
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color='primary'>
            Edit Contact Person
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmationDialog
        open={confirmationDialogOpen}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmationDialogConfirm}
      />
    </div>
  )
}

ViewClient.acl = {
  action: 'read',
  subject: 'vendor'
}

export default ViewClient
