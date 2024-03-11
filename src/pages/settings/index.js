import { useState, useEffect } from 'react'
import Router from 'next/router'
import { Grid, Card, CardHeader, CardContent, Button } from '@mui/material'

const Settings = () => {
  const tradingEnquiry = () => {
    Router.push(`/settings/trading-enquiry`)
  }

  const enquiry = () => {
    Router.push(`/settings/enquiry`)
  }

  const tradingProposal = () => {
    Router.push(`/settings/trading-proposal`)
  }

  const proposal = () => {
    Router.push(`/settings/proposal`)
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Quick Settings'></CardHeader>
            <CardContent>
              <Button
                onClick={tradingEnquiry}
                color='primary'
                variant='contained'
                sx={{ display: 'block', margin: '10px' }}
              >
                Trading Enquiry Sequence
              </Button>
              <Button
                onClick={tradingProposal}
                color='primary'
                variant='contained'
                sx={{ display: 'block', margin: '10px' }}
              >
                Trading Proposal Sequence
              </Button>
              <Button onClick={enquiry} color='primary' variant='contained' sx={{ display: 'block', margin: '10px' }}>
                Enquiry Sequence
              </Button>
              <Button onClick={proposal} color='primary' variant='contained' sx={{ display: 'block', margin: '10px' }}>
                Proposal Sequence
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

Settings.acl = {
  action: 'manage',
  subject: 'settings'
}

export default Settings
