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
import { fetchSalesOrderById } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';

const ViewSalesOrder = () => {
  const { id } = Router.query;
  const [salesOrder, setSalesOrder] = useState([])

  const getSalesorder = async () => {
    const response = await fetchSalesOrderById(id)
    setSalesOrder(response.data)
  }

  useEffect(() => {
    getSalesorder()
  }, [])
  const handleViewClient = (clientId) => {
    Router.push(`/clients/view?id=${clientId}`);
  };



  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Sales Order Details" />
            <CardContent>
              {Object.keys(salesOrder).map((property, index) => (
                <div key={index}>
                  <Typography variant="subtitle1">{`${property}: ${salesOrder[property]}`}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default ViewSalesOrder
