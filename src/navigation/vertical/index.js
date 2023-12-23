const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Opportunity Leads',
      path: '/oleads',
      icon: 'tabler:loader-quarter'
    },
    {
      title: 'Enquiries',
      path: '/enquiries',
      icon: 'tabler:loader-2'
    },
    {
      title: 'Proposals',
      icon: 'tabler:fidget-spinner',
      children: [

        {
          title: 'Live',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/live'
        },
        {
          title: 'Live Hot',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/live-hot'
        },
        {
          title: 'Budgetory Consultants',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/budgetory-consultants'
        },
        {
          title: 'Budgetory Contractors',
          icon: 'tabler:fidget-spinner',
          path: '/proposals/budgetory-contractors'
        },
      ]
    },
    {
      title: 'Customers',
      path: '/customers',
      icon: 'tabler:user-search'
    },
    {
      title: 'Visits',
      path: '/visits-tracker',
      icon: 'tabler:adjustments-bolt'
    },
    {
      title: 'Visit Plan',
      path: '/visit-plan',
      icon: 'tabler:plane-inflight'
    },
    {
      title: 'Sales Order',
      path: '/sales-order',
      icon: 'tabler:report-money'
    },
    {
      title: 'BOQ',
      path: '/boq',
      icon: 'tabler:book-2'
    }
  ]
}

export default navigation
