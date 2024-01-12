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
import { fetchOleadById } from 'src/utility/api';
import { formatTimestamp } from 'src/utility/utility';



const ViewOlead = () => {

  const { id } = Router.query
  const [olead, setOlead] = useState({})

  const getOlead = async () => {
    const response = await fetchOleadById(id)
    setOlead(response.data)
  }

  useEffect(() => {
    getOlead()
  }, [])


  return (
    <div>

    </div>
  )
}

export default ViewOlead
