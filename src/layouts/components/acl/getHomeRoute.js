/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'client') return '/acl'
  else if (role === 'sales') return '/clients'
  else if (role === 'accounts') return '/sales-order'
  else if (role === 'tendering') return '/sales-order'
  else return '/home'
}

export default getHomeRoute
