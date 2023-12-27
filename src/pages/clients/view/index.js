import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import Router from 'next/router';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconPhoneCheck, IconMailFilled } from '@tabler/icons-react';
import { fetchClientById } from 'src/utility/api';

const ViewClient = () => {

  const { id } = Router.query;
  const client =



  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <CardHeader title={client.clientName}></CardHeader>
          <CardContent>
            <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 2 }}>
              Last Visit : {client.lastVisit}
            </Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 2 }}>
              Next Visit : {client.nextVisit}
            </Typography>
            <Typography variant='body1' sx={{ fontWeight: 'bold', mb: 2 }}>
              Office Address :
            </Typography>
            <Typography variant='body1'>
              {client.officeAddress}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          {client.contactPersons.map((contactPerson, index) => (
            <Grid item xs={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>{contactPerson.contactPerson}</Typography>
                  <Typography variant="body1" sx={{ p: 2 }}><IconPhoneCheck size={16} /> {contactPerson.contactNumber}</Typography>
                  <Typography variant="body1" sx={{ p: 2 }}><IconMailFilled size={16} /> {contactPerson.contactEmail}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid >


  );
};

export default ViewClient;
