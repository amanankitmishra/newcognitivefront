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
import { fetchEnquiryById } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';

const ViewEnquiry = () => {
  const { id } = Router.query;
  const [enquiry, setEnquiry] = useState([])

  const getEnquiry = async () => {
    const response = await fetchEnquiryById(id);
    setEnquiry(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getEnquiry()
  }, [])
  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };


  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Enquiry Details'></CardHeader>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Project</TableCell>
                        <TableCell>{enquiry.project}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Project Type</TableCell>
                        <TableCell>{enquiry.projectType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Capacity</TableCell>
                        <TableCell>{enquiry.capacity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>UOM</TableCell>
                        <TableCell>{enquiry.uom}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Offer Submitted</TableCell>
                        <TableCell>{enquiry.offerSubmitted}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Offer Submission Date</TableCell>
                        <TableCell>{formatTimestamp(enquiry.offerSubmissionDate)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={6}>
                  <Table>
                    <TableBody>

                      <TableRow>
                        <TableCell>Quoted Value</TableCell>
                        <TableCell>{enquiry.quotedValue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quoted Margin Percentage</TableCell>
                        <TableCell>{enquiry.quotedMarginPercentage}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quoted Margin Value</TableCell>
                        <TableCell>{enquiry.quotedMarginValue}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Revision</TableCell>
                        <TableCell>{enquiry.revision}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Rate Per Watt</TableCell>
                        <TableCell>{enquiry.ratePerWatt}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Remark</TableCell>
                        <TableCell>{enquiry.remark}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Button sx={{ margin: '20px' }} onClick={() => handleViewClient(enquiry.clientId)}>View Client</Button>
            </CardContent>

          </Card>
        </Grid>

      </Grid>
    </div>
  )

}

export default ViewEnquiry
