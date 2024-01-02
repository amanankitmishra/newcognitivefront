// BOQ.jsx
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Sidebar from 'src/@core/components/sidebar';
import { Button } from '@mui/material';
import AddBOQForm from './AddBoqForm';
import { createBoq, fetchBoqs, editBoq } from 'src/utility/api';
import toast from 'react-hot-toast';
import { IconEdit } from '@tabler/icons-react';
import EditBoqForm from './EditBoqForm';

const BOQ = () => {

  const columns = [
    { field: 'id', headerName: 'SL. No.', flex: 1 },
    { field: 'itemHead', headerName: 'Item Head', flex: 1 },
    { field: 'specification', headerName: 'Specification', flex: 1 },
    { field: 'make', headerName: 'Make', flex: 1 },
    { field: 'quantity', headerName: 'Qty', flex: 1 },
    { field: 'uom', headerName: 'UOM', flex: 1 },
    { field: 'remark', headerName: 'Remark', flex: 1 },
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <IconEdit onClick={() => handleEdit(params.row)} />
        </div>
      ),
      editable: false,
      sortable: false,
      filterable: false,
    }
  ];


  const [open, setOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const [boqs, setboqs] = useState([]);

  const getBoqs = async () => {
    const response = await fetchBoqs();

    const ccc = response.data.map((row) => ({
      ...row,
      id: row._id,
    }));
    setboqs(ccc)
  }

  useEffect(() => {
    getBoqs()
  }, [])

  const toggleSidebar = () => setOpen(!open);

  const handleAddBOQ = async (formData) => {

    try {
      const response = await createBoq(formData);
      toast.success('BOQ Added successfully.', { duration: 3000 })
      getBoqs()
    }
    catch {
      console.log("error")
      toast.error('Error in adding BOQ', { duration: 3000 })
    }
    setOpen(false);

    // Add logic to update BOQ data state or send data to API
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleEdit = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async (id, editedData) => {

    try {
      const response = await editBoq(id, editedData)

      toast.success('BOQ Updated successfully', { duration: 3000 });

    } catch (e) {
      toast.error('Error in updating BOQ', { duration: 3000 });
      console.log(e)
    }

    // Close the edit modal
    setEditModalOpen(false);
    getBoqs();
  };

  return (
    <div>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='BOQ 🚀'></CardHeader>
            <CardContent>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={toggleSidebar} variant='contained' color='primary'>
                  Add BOQ
                </Button>
              </div>
              <div style={{ height: '400px' }}>
                <DataGrid
                  rows={boqs}
                  columns={columns} initialState={{
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
      <Sidebar show={open} sx={{ padding: 5 }}>
        <AddBOQForm onSubmit={handleAddBOQ} onCancel={handleCancel} />
      </Sidebar>
      <Sidebar
        show={editModalOpen}
        sx={{
          padding: 5
        }}
      >
        <EditBoqForm data={selectedRowData} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} />
      </Sidebar>
    </div>
  );
};

export default BOQ;
