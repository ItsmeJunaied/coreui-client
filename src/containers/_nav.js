import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    to: '/orders',
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Merchants',
    to: '/customers',
    icon: <CIcon name="cil-puzzle" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Admin',
    route: '/base',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Settings',
        to: '/base/breadcrumbs',
      }
    ],
  }
]

export default _nav
