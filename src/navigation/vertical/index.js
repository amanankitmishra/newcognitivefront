const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
      action: 'read',
      subject: 'dashboard'
    },
    {
      title: 'Clients',
      path: '/clients',
      icon: 'tabler:briefcase',
      action: 'read',
      subject: 'client'
    },
    {
      title: 'Products',
      path: '/products',
      icon: 'tabler:building-store',
      action: 'read',
      subject: 'product'
    },
    {
      title: 'Vendors',
      path: '/vendors',
      icon: 'tabler:building-warehouse',
      action: 'read',
      subject: 'vendor'
    },
    {
      title: 'Opportunity Leads',
      path: '/oleads',
      icon: 'tabler:loader-quarter',
      action: 'read',
      subject: 'olead'
    },
    {
      title: 'Enquiries',
      icon: 'tabler:loader-2',
      children: [
        {
          title: 'Solar',
          icon: 'tabler:loader-2',
          path: '/enquiries',
          action: 'read',
          subject: 'solarEnquiry'
        },
        {
          title: 'Trading',
          icon: 'tabler:loader-2',
          path: '/trading-enquiries',
          action: 'read',
          subject: 'tradingEnquiries'
        }
      ]
    },
    {
      title: 'Proposals',
      icon: 'tabler:fidget-spinner',
      children: [
        {
          title: 'Solar',
          icon: 'tabler:fidget-spinner',
          children: [
            {
              title: 'All',
              icon: 'tabler:fidget-spinner',
              path: '/proposals',
              action: 'read',
              subject: 'solarProposal'
            },
            {
              title: 'Live',
              icon: 'tabler:fidget-spinner',
              path: '/proposals/live',
              action: 'read',
              subject: 'solarProposal'
            },
            {
              title: 'Live Hot',
              icon: 'tabler:fidget-spinner',
              path: '/proposals/live-hot',
              action: 'read',
              subject: 'solarProposal'
            },
            {
              title: 'Budgetory Consultants',
              icon: 'tabler:fidget-spinner',
              path: '/proposals/budgetory-consultants',
              action: 'read',
              subject: 'solarProposal'
            },
            {
              title: 'Budgetory Contractors',
              icon: 'tabler:fidget-spinner',
              path: '/proposals/budgetory-contractors',
              action: 'read',
              subject: 'solarProposal'
            }
          ]
        },
        {
          title: 'Trading',
          icon: 'tabler:fidget-spinner',
          children: [
            {
              title: 'All',
              icon: 'tabler:fidget-spinner',
              path: '/trading-proposals',
              action: 'read',
              subject: 'tradingProposal'
            },
            {
              title: 'Live',
              icon: 'tabler:fidget-spinner',
              path: '/trading-proposals/live',
              action: 'read',
              subject: 'tradingProposal'
            },
            {
              title: 'Live Hot',
              icon: 'tabler:fidget-spinner',
              path: '/trading-proposals/live-hot',
              action: 'read',
              subject: 'tradingProposal'
            },
            {
              title: 'Budgetory Contractors',
              icon: 'tabler:fidget-spinner',
              path: '/trading-proposals/budgetory-contractors',
              action: 'read',
              subject: 'tradingProposal'
            }
          ]
        }
      ]
    },
    {
      title: 'Sales Order',
      icon: 'tabler:report-money',
      children: [
        {
          title: 'Solar',
          icon: 'tabler:report-money',
          path: '/sales-order',
          action: 'read',
          subject: 'salesorder'
        },
        {
          title: 'Trading',
          icon: 'tabler:report-money',
          path: '/trading-sales-order',
          action: 'read',
          subject: 'salesorder'
        }
      ]
    },
    {
      title: 'BOQ',
      path: '/boq',
      icon: 'tabler:book-2',
      action: 'read',
      subject: 'boq'
    },
    {
      title: 'Users',
      path: '/users',
      icon: 'tabler:users-plus',
      action: 'read',
      subject: 'user'
    },
    {
      title: 'Meetings',
      path: '/meetings',
      icon: 'tabler:calendar-time',
      action: 'read',
      subject: 'meetings'
    },
    {
      title: 'Calendar',
      path: '/calendar',
      icon: 'tabler:calendar-month',
      action: 'read',
      subject: 'calendar'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'tabler:settings',
      action: 'manage',
      subject: 'settings'
    }
  ]
}

export default navigation
