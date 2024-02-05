// EnquiryReports.js

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchEnquiryCounts } from 'src/utility/api';
import { Card, CardHeader, CardContent } from '@mui/material';

const EnquiryReports = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEnquiryCounts();

        const chartData = response.data.map(item => ({
          month: item.month,
          Enquiries: item.count,
          year: item.year
        }));

        setData(chartData);
        console.log(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader title="Enquiries By Month 💡" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Enquiries" fill="#176483" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

EnquiryReports.acl = {
  action: 'read',
  subject: 'enquiry'
}

export default EnquiryReports;
