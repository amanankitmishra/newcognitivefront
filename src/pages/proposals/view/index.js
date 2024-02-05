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
  CardHeader,
  Input,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import Router from 'next/router';
import { fetchProposalById, addRevisionToProposal } from 'src/utility/api'; // Update with your API functions
import { formatTimestamp } from 'src/utility/utility';

const ViewProposal = () => {
  const { id } = Router.query;
  const [proposal, setProposal] = useState([]);
  const [openAddRevisionDialog, setOpenAddRevisionDialog] = useState(false);
  const [revisionNumber, setRevisionNumber] = useState('');
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);

  const getProposal = async () => {
    try {
      const response = await fetchProposalById(id);
      setProposal(response.data);
    } catch (error) {
      console.error('Error fetching proposal:', error);
      toast.error('Failed to fetch proposal');
    }
  };

  useEffect(() => {
    getProposal();
  }, []);

  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };

  const handleFileInputChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
  };

  const handleAddRevision = async () => {
    try {
      const formData = new FormData();
      formData.append('revisionNumber', revisionNumber);
      formData.append('comment', comment);

      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const response = await addRevisionToProposal(id, formData);
      toast.success('Revision added successfully');
      getProposal(); // Refresh proposal data
      setOpenAddRevisionDialog(false);
      setFiles([]); // Clear selected files
    } catch (error) {
      console.error('Error adding revision:', error);
      toast.error('Failed to add revision');
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card>
            <CardHeader title="Proposal Details" />
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Project</TableCell>
                        <TableCell>{proposal.project}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{proposal.status}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>UOM</TableCell>
                        <TableCell>{proposal.uom}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quoted Margin Percentage</TableCell>
                        <TableCell>{proposal.quotedMarginPercentage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rate Per Watt</TableCell>
                        <TableCell>{proposal.ratePerWatt}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={6}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Project Type</TableCell>
                        <TableCell>{proposal.projectType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Capacity</TableCell>
                        <TableCell>{proposal.capacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quoted Value</TableCell>
                        <TableCell>{proposal.quotedValue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quoted Margin Value</TableCell>
                        <TableCell>{proposal.quotedMarginValue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Remark</TableCell>
                        <TableCell>{proposal.remark}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Button sx={{ margin: '20px' }} onClick={() => handleViewClient(proposal.clientId)}>View Client</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right side with Revisions and Add Revision Button */}
        <Grid item xs={4}>
          <Card>
            <CardHeader title="Revisions" />
            <CardContent>
              <Button onClick={() => setOpenAddRevisionDialog(true)} variant="contained" color="primary">
                Add Revision
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openAddRevisionDialog} onClose={() => setOpenAddRevisionDialog(false)}>
        <DialogTitle>Add Revision</DialogTitle>
        <DialogContent>
          <TextField
            label="Revision Number"
            variant="outlined"
            fullWidth
            value={revisionNumber}
            onChange={(e) => setRevisionNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="file-input">Files</InputLabel>
            <Input
              id="file-input"
              type="file"
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .zip"
              multiple
              onChange={handleFileInputChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddRevisionDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRevision} color="primary">
            Add Revision
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ViewProposal.acl = {
  action: 'read',
  subject: 'proposal',
};

export default ViewProposal;
