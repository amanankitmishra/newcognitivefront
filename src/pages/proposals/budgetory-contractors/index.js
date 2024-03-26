// LiveProposals.jsx
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddProposalForm from '../AddProposalForm';
import { createProposal, fetchcontractorproposals } from 'src/utility/api';
import toast from 'react-hot-toast';
import Router from 'next/router';

const ContractorProposals = () => {

  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };

  const columns = [
    { field: 'id', headerName: 'S.No.', flex: 1 },
    {
      field: 'clientName', headerName: 'Client', flex: 1, renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase'
          }}
          onClick={() => handleViewClient(params.row.clientId)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {params.row.clientName}
        </div>
      ),
    },
    {
      field: 'status', headerName: 'Status', flex: 1, renderCell: (params) => (
        <div
          style={{
            color: params.row.status === 'LIVE' ? 'green' : params.row.status === 'LIVE-HOT' ? 'red' : 'black',
            fontWeight: 'bold',
          }}
        >
          {params.row.status}
        </div>
      ),
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
  ];



  const [open, setOpen] = useState(false);
  const [allProposals, setAllProposals] = useState([]);

  const getAllProposals = async () => {
    const res = await fetchcontractorproposals()
    console.log(res.data)

    const ccc = res.data.map((row) => ({
      ...row,
      id: row._id,
      clientId: row.clientId._id,
      clientName: row.clientId.clientName,
    }));
    setAllProposals(ccc)
  }

  useEffect(() => {
    getAllProposals();
  }, [])

  const toggleSidebar = () => setOpen(!open);

  const handleAddProposal = async (formData) => {

    try {
      const res = await createProposal(formData)
      toast.success("Proposal Added Successfully.", { duration: 3000 })
      getAllProposals()
    } catch {
      toast.error("Error creating Proposal", { duration: 3000 })
    }

    setOpen(false);

    // Add logic to update live proposals state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Contractor Proposals 🚀'></CardHeader>
            <CardContent>

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
      <Sidebar show={open} sx={{ padding: 5 }}>
        <AddProposalForm onSubmit={handleAddProposal} onCancel={handleCancel} />
      </Sidebar>
    </div>
  );
};

ContractorProposals.acl = {
  action: 'read',
  subject: 'solarProposal'
}

export default ContractorProposals;
