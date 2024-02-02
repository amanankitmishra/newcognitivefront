// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import DashboardCalendar from './cards/dashboardCalendar'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <DashboardCalendar />
      </Grid>
    </Grid>
  )
}

Home.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default Home
