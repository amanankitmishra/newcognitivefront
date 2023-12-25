import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';
import Router from 'next/router';
import { Card, CardHeader, CardContent } from '@mui/material';
import { IconPhoneCheck, IconMailFilled } from '@tabler/icons-react';

const ViewClient = () => {

  const { id } = Router.query;
  console.log(id)

  const client = {
    id: 1, clientName: 'Client A', officeAddress: 'Address A', contactPersons: [
      {
        contactPerson: 'Aman',
        contactNumber: '9155616116',
        contactEmail: 'aman@aman.com'
      }
    ]
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card>
          <CardHeader title={client.clientName}></CardHeader>
          <CardContent>
            <Typography variant='body1'>
              {client.officeAddress}
            </Typography>
            <Typography variant='h6' sx={{ pt: 3, pb: 3 }}>Contact Persons</Typography>

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


          </CardContent>
        </Card>
      </Grid>
    </Grid >


  );
};

export default ViewClient;
