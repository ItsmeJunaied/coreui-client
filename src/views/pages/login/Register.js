import React, { useState } from 'react';
// import {useNavigate} from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerWithEmailAndPassword } from 'src/firebase';


const Register = () => {
  const history = useHistory();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registerData);

    const username = registerData.username
    const email = registerData.email
    const password = registerData.password
    const repeatPassword = registerData.repeatPassword

    // Password length check
    if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long");
      return;
    }

    // Password match check
    if (password !== repeatPassword) {
      setRepeatPasswordError("Passwords do not match");
      return;
    }

    try {
      await registerWithEmailAndPassword(username, email, password)
      history.push('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={handleInputChange}
                      type="text"
                      name='username'
                      value={registerData.username}
                      placeholder="Username"
                      autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={handleInputChange}
                      type="email"
                      name='email'
                      value={registerData.email}
                      placeholder="Email"
                      autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={handleInputChange}
                      type="password"
                      name='password'
                      value={registerData.password}
                      placeholder="Password"
                      autoComplete="new-password" />
                  </CInputGroup>
                  {passwordError && <div className="text-danger">{passwordError}</div>}
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      onChange={handleInputChange}
                      type="password"
                      name='repeatPassword'
                      value={registerData.repeatPassword}
                      placeholder="Repeat password"
                      autoComplete="new-password" />
                  </CInputGroup>
                  {repeatPasswordError && <div className="text-danger">{repeatPasswordError}</div>}
                  <CButton type='submit' color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
