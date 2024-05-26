import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Orders = React.lazy(() => import('./views/orders/Orders'));
const Customers = React.lazy(() => import('./views/customers/Customers'));
const Users = React.lazy(() => import('./views/users/Users'));
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/orders', name: 'Orders', component: Orders },
  { path: '/customers', name: 'Customers', component: Customers },
  { path: '/orders', name: 'Order', component: Customers },
  { path: '/base/breadcrumbs', name: 'Settings', component: Breadcrumbs },
  { path: '/users', name: 'Users', component: Users }
];

export default routes;
