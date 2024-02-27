import React, { useState, useEffect, useRef } from 'react';
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
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { TimelineOppositeContent } from '@mui/lab';
import Router from 'next/router';
import { fetchProposalById, addRevisionToProposal, getStaticFileUrl } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';

const ViewProposal = () => {
  const { id } = Router.query;
  const [proposal, setProposal] = useState([]);
  const [openAddRevisionDialog, setOpenAddRevisionDialog] = useState(false);
  const [revisionNumber, setRevisionNumber] = useState('');
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);


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

    // Clear the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleAddRevision = async () => {
    try {
      const myFormData = new FormData();

      myFormData.append('revisionNumber', revisionNumber);
      myFormData.append('comment', comment);

      files.forEach((file, index) => {
        myFormData.append('files', file);
      });

      const response = await addRevisionToProposal(id, myFormData);

      toast.success('Revision added successfully');
      getProposal();
      setRevisionNumber('');
      setComment('');
      setOpenAddRevisionDialog(false);
      setFiles([]);
    } catch (error) {
      console.error('Error adding revision:', error);
      setOpenAddRevisionDialog(false);
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

        <Grid item xs={4}>
          <Card>
            <CardHeader title="Revisions" />
            <CardContent>
              <Button onClick={() => setOpenAddRevisionDialog(true)} variant="contained" color="primary">
                Add Revision
              </Button>
              {proposal.revisions && proposal.revisions.length > 0 && (
                <Timeline position="alternate">
                  {proposal.revisions.map((revision, index) => (
                    <TimelineItem key={index}>
                      <TimelineOppositeContent>
                        <Typography variant="body2" color="textSecondary">
                          {formatTimestamp(revision.timestamp)}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color='primary' />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="h6">{`Revision ${revision.revisionNumber}`}</Typography>
                        <Typography>{`Comment: ${revision.comment}`}</Typography>
                        {revision.files && revision.files.length > 0 && (
                          <ul>
                            {revision.files.map((file, fileIndex) => (
                              <li key={fileIndex}>
                                <a href={getStaticFileUrl(file)} target="_blank" rel="noopener noreferrer">
                                  FILE {fileIndex + 1}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
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
            <Input
              id="file-input"
              type="file"
              accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .zip"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              inputProps={{ multiple: true }}
              name='files'
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
