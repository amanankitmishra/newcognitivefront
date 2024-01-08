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



  return (
    <div>

    </div>
  )
}

export default ViewProposal
