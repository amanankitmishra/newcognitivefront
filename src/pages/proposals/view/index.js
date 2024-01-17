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
} from '@mui/material';
import Router from 'next/router';
import { fetchProposalById } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';

const ViewProposal = () => {
  const { id } = Router.query;
  const [proposal, setProposal] = useState([])

  const getProposal = async () => {
    const response = await fetchProposalById(id)
    setProposal(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getProposal()
  }, [])
  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };



  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
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
      </Grid>
    </div>
  )
}

ViewProposal.acl = {
  action: 'read',
  subject: 'proposal'
}

export default ViewProposal
