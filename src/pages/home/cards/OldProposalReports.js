import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { fetchProposalReports } from 'src/utility/api';

const ProposalReports = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProposalReports();
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const statusCounts = {};
  data.forEach((proposal) => {
    const { status } = proposal;
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const chartData = {
    series: Object.keys(statusCounts).map((status) => ({ data: [statusCounts[status]] })),
    height: 290,
    xAxis: [{ data: Object.keys(statusCounts), scaleType: 'band' }],
    margin: { top: 10, bottom: 30, left: 40, right: 10 },
  };

  return <BarChart {...chartData} />;
}

export default ProposalReports
