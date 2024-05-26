import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { logInWithEmailAndPassword } from 'src/firebase'
import Swal from 'sweetalert2'

const Login = () => {

  const history = useHistory();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  console.log(signInData)
  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setSignInData({ ...signInData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = signInData.email
    const password = signInData.password

    try {
      const response = await logInWithEmailAndPassword(email, password)
      console.log(response)

      history.push('/')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }


  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      {/*  */}
                      <CInput
                        onChange={handleInputChange}
                        type="email"
                        name='email'
                        value={signInData.email}
                        placeholder="Email"
                        autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        onChange={handleInputChange}
                        type="password"
                        name='password'
                        value={signInData.password}
                        placeholder="Password"
                        autoComplete="password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type='submit' color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0"><Link to="/dashboard">Forgot password?</Link></CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
