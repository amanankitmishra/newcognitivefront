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
      title: 'Opportunity Leads',
      path: '/oleads',
      icon: 'tabler:loader-quarter',
      action: 'read',
      subject: 'olead'
    },
    {
      title: 'Enquiries',
      path: '/enquiries',
      icon: 'tabler:loader-2',
      action: 'read',
      subject: 'enquiry'
    },
    {
      title: 'Proposals',
      icon: 'tabler:fidget-spinner',
      children: [
        {
          title: 'All',
          icon: 'tabler:fidget-spinner',
          path: '/proposals',
          action: 'read',
          subject: 'proposal'
        },
        {
          title: 'Live',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/live',
          action: 'read',
          subject: 'proposal'
        },
        {
          title: 'Live Hot',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/live-hot',
          action: 'read',
          subject: 'proposal'
        },
        {
          title: 'Budgetory Consultants',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/budgetory-consultants',
          action: 'read',
          subject: 'proposal'
        },
        {
          title: 'Budgetory Contractors',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/budgetory-contractors',
          action: 'read',
          subject: 'proposal'
        },
      ]
    },
    {
      title: 'Sales Order',
      path: '/sales-order',
      icon: 'tabler:report-money',
      action: 'read',
      subject: 'salesorder'
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
      icon: 'tabler:book-2',
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
  ]
}

export default navigation
