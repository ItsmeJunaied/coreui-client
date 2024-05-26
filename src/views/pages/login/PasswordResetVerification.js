import React from 'react'
import { Link } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const PasswordResetVerification = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-6">
              <CCardBody className="p-4">
                <h1>Forgot Verification Link</h1>
                <p className="text-muted">
                    A varification link has been sent to your email account. Please check your inbox and follow the instruction to
                    <Link to="/login"> LogIn</Link></p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PasswordResetVerification
