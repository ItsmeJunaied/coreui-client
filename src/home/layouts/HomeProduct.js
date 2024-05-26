import React from 'react';
import {
  CCard,
  CCol,
  CRow,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardImg,
  CLink
} from '@coreui/react'

const HomeFeatures = () => {
  return (
    <div className="product-section text-center">
      <h1 className="pt-2" >More reasons to choose Rogers</h1>
      <CRow className='w-75 mx-auto py-2'>
        <CCol md={6} lg={3} className="mt-2">
          <CCard className="h-100">
            <CCardImg
              component="svg"
              orientation="top"
              className="docs-placeholder-img"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Image cap"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="../../images/home-banner.jpeg"
            >
            </CCardImg>
            <CCardBody className='text-left'>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </CCardText>
            </CCardBody>
            <CLink color="link" className="my-4" >Learn more &gt;</CLink>
          </CCard>
        </CCol>
        <CCol md={6} lg={3} className="mt-2">
          <CCard className="h-100">
            <CCardImg
              component="svg"
              orientation="top"
              className="docs-placeholder-img"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Image cap"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="../../images/home-banner.jpeg"
            >
            </CCardImg>
            <CCardBody className='text-left'>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                This card has supporting text below as a natural lead-in to
                additional content.
              </CCardText>
            </CCardBody>
            <CLink color="link" className="my-4">Learn more &gt;</CLink>
          </CCard>
        </CCol>
        <CCol md={6} lg={3} className="mt-2">
          <CCard className="h-100">
            <CCardImg
              component="svg"
              orientation="top"
              className="docs-placeholder-img"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Image cap"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="../../images/home-banner.jpeg"
            >
            </CCardImg>
            <CCardBody className='text-left'>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This card has even longer content than the
                first to show that equal height action.
              </CCardText>
            </CCardBody>
            <CLink color="link" className="my-4">Learn more &gt;</CLink>
          </CCard>
        </CCol>
        <CCol md={6} lg={3} className="mt-2">
          <CCard className="h-100">
            <CCardImg
              component="svg"
              orientation="top"
              className="docs-placeholder-img"
              width="100%"
              height="180"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Image cap"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              src="../../images/home-banner.jpeg"
            >
            </CCardImg>
            <CCardBody className='text-left'>
              <CCardTitle>Card title</CCardTitle>
              <CCardText>
                This is a wider card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
              </CCardText>
            </CCardBody>
            <CLink color="link" className="my-4">Learn more &gt;</CLink>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default HomeFeatures;
