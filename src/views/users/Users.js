import React, { useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCollapse
} from '@coreui/react'

import usersData from './UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = [
  { key: 'name', _style: { width: '40%' } },
  'registered',
  { key: 'role', _style: { width: '20%' } },
  { key: 'status', _style: { width: '20%' } },
  {
    key: 'show_details',
    label: '',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
]

const Users = () => {
  const [details, setDetails] = useState([])

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  // https://coreui.io/react/docs/3.3/components/CDataTable
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader className="Custom-CCardHeader">
              Users
              <CButton color="primary" className="float-right text-light">Add User</CButton>
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={usersData}
                fields={fields}
                tableFilter
                hover
                sorter
                striped
                bordered
                itemsPerPageSelect
                itemsPerPage={20}
                pagination
                scopedSlots={{
                  'name':
                    (item) => (
                      <td>
                        <div>{item.name}</div>
                        <div className="small text-muted">
                          <span>{item.type}</span> | {item.registered}
                        </div>
                      </td>

                    ),
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {item.status}
                        </CBadge>
                      </td>
                    ),
                  'show_details':
                    (item, index) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => { toggleDetails(index) }}
                          >
                            {details.includes(index) ? 'Hide' : 'Show'}
                          </CButton>
                        </td>
                      )
                    },
                  'details':
                    (item, index) => {
                      return (
                        <CCollapse show={details.includes(index)}>
                          <CCardBody>
                            <h4>
                              {item.username}
                            </h4>
                            <p className="text-muted">
                              Name: {item.name}<br></br>
                              Email: {item.email}<br></br>
                              Phone: {item.phone}<br></br>
                              Status: {item.status}<br></br>
                              Role: {item.role}<br></br>
                              User since: {item.registered}<br></br>
                            </p>
                            <CButton size="sm" color="info">
                              Update
                              </CButton>
                            <CButton size="sm" color="danger" className="ml-1">
                              Delete
                              </CButton>
                          </CCardBody>
                        </CCollapse>
                      )
                    }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Users
