import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchProposalReports } from 'src/utility/api';
import { Card, CardHeader, CardContent } from '@mui/material';
import { monthNames } from 'src/utility/utility';

const ProposalReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProposalReports();
        setData(result.data.proposals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Initialize an array with objects representing each month
  const months = Array.from({ length: 12 }, (_, index) => ({
    month: index + 1,
    LIVE: 0,
    'LIVE-HOT': 0,
    CONSULTANT: 0,
    CONTRACTOR: 0,
  }));

  // Populate the array with actual data
  data.forEach((proposal) => {
    const { createdAt, status } = proposal;
    const month = new Date(createdAt).getMonth() + 1; // Assuming createdAt is a valid date

    if (months[month - 1]) {
      months[month - 1][status] += 1;
    }
  });

  // Flatten the array to be suitable for recharts
  const flattenedData = months.map((month) => ({
    month: month.month,
    ...month,
  }));

  return (
    <Card>
      <CardHeader title='Proposals By Status - Monthly 🚀' />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={flattenedData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <XAxis dataKey="month" tickFormatter={(value) => monthNames[value - 1]} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="LIVE" fill="#8884d8" />
            <Bar dataKey="LIVE-HOT" fill="#82ca9d" />
            <Bar dataKey="CONSULTANT" fill="#ffc658" />
            <Bar dataKey="CONTRACTOR" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

ProposalReports.acl = {
  action: 'read',
  subject: 'proposal'
}

export default ProposalReports;
