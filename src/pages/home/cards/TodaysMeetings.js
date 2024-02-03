import React, { useEffect, useState } from 'react';
import { fetchTodaysMeetings, markMeetingComplete } from 'src/utility/api';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { IconChecks } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { formatTimestamp } from 'src/utility/utility';


const TodaysMeetings = () => {

  const [meetings, setMeetings] = useState([])

  const getAllMeetings = async () => {
    try {
      const response = await fetchTodaysMeetings();
      const ccc = response.data.upcomingMeetings.map((row) => ({
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

  const markComplete = async (id) => {
    try {
      const response = await markMeetingComplete(id)
      toast.success('Meeting Marked Complete', { duration: 3000 })
      getAllMeetings();
    }
    catch {
      toast.success('Error Occured. Please Retry', { duration: 3000 })
    }
  }


  useEffect(() => {
    getAllMeetings();
  }, []);

  const meetingColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'clientName', headerName: 'Client', flex: 1 },
    { field: 'meetingDate', headerName: 'Date', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    { field: 'agenda', headerName: 'Agenda', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.5s',
            color: '#176483'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <IconChecks onClick={() => markComplete(params.row._id)} />
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    }
  ]

  return (
    <div>
      <Card>
        <CardHeader title='Upcoming Meetings 🚀'></CardHeader>
        <CardContent>
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
    </div >

  )
}

TodaysMeetings.acl = {
  action: 'read',
  subject: 'dashboard-calendar'
}

export default TodaysMeetings;
