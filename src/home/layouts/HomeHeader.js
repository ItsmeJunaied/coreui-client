import React, { useState } from 'react'
import {
  CNavbar,
  CToggler,
  CNavbarBrand,
  CCollapse,
  CNavbarNav,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { auth, logout } from 'src/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth)
  // console.log('user', user.email)
  const history = useHistory();

  const handleLogout = () => {
    logout();
  }
  return (
    <CNavbar expandable="md" className='navbar navbar-expand-lg navbar-light'>
      <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />
      <CNavbarBrand>
        <CNavLink className="navbar-logo">WiSYZ</CNavLink>
      </CNavbarBrand>
      <CCollapse show={isOpen} navbar>
        <CNavbarNav className="ml-auto">
          <CNavLink className="my-auto navbar-menu-item">Home</CNavLink>
          <CNavLink className="my-auto navbar-menu-item">Link</CNavLink>
          <CDropdown
            inNav
            className="my-auto mr-4 navbar-menu-item"
          >
            <CDropdownToggle color="primary" >
              Dropdown
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>Action</CDropdownItem>
              <CDropdownItem>Another action</CDropdownItem>
              <CDropdownItem divider />
              <CDropdownItem>Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {user ? (
            <CDropdown inNav className="navbar-user">
              <CDropdownToggle caret color="dark">
                {user.displayName.toUpperCase()}
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={handleLogout}>Log Out</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ) : (
            <CNavLink>
              <CButton color="dark" variant="outline" className="navbar-btn-signin" onClick={() => history.push('/login')}>
                Sign In
              </CButton>
            </CNavLink>
          )}

        </CNavbarNav>
      </CCollapse>
    </CNavbar>
  )
}

export default HomeHeader