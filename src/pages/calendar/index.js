import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { fetchAllVisits } from 'src/utility/api';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { formatTimestamp } from 'src/utility/utility';

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const getAllVisits = async () => {
    try {
      const res = await fetchAllVisits();

      const formattedEvents = res.data.map((visit) => ({
        title: visit.clientName,
        start: new Date(visit.visitDate),
        end: moment(visit.visitDate).add(1, 'hours').toDate(), // Assuming visits last for 1 hour
        purpose: visit.purpose,
        summary: visit.summary,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  };

  useEffect(() => {
    getAllVisits();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        onSelectEvent={handleEventClick}
        selectable
        style={{ height: 800 }}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>

        <DialogTitle>
          {selectedEvent?.title}
        </DialogTitle>
        <DialogContent>
          <Typography>Purpose: {selectedEvent?.purpose}</Typography>
          <Typography>Summary: {selectedEvent?.summary}</Typography>
          <Typography>Visit Date: {formatTimestamp(selectedEvent?.start)}</Typography>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

MyCalendar.acl = {
  action: 'read',
  subject: 'calendar'
}

export default MyCalendar;
