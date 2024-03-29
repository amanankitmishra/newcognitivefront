// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TodaysMeetings from './cards/TodaysMeetings'
import ProposalReports from './cards/ProposalReports'
import EnquiryReports from './cards/EnquiryReports'

const Home = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TodaysMeetings />
      </Grid>
      <Grid item xs={12}>
        <EnquiryReports />
      </Grid>
      <Grid item xs={12}>
        <ProposalReports />
      </Grid>
    </Grid>
  )
}

Home.acl = {
  action: 'read',
  subject: 'dashboard'
}

export default Home
