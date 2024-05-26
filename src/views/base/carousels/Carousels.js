import React, { useState } from 'react'
import {
  CButton,
  CCarousel,
  CCarouselIndicators,
  CCarouselInner,
  CCarouselItem,
  CCol,
  CRow
} from '@coreui/react'

const slides = [
  '../../../images/home-banner.jpeg'
]

const Carousels = () => {
  const [activeIndex] = useState(1)

  return (
    <CRow>
      <CCol md="12">
        <CCarousel animate autoSlide={3000}>
          <CCarouselIndicators />
          <CCarouselInner className="carousel-custom">
            <CCarouselItem>
              <img className="d-block w-100 slider-img" src={slides[0]} alt="slide 1" style={{ display: 'none' }} />
              <div className='carousel-caption-custom w-75 mx-auto'>
                <CRow>
                  <CCol md={6}>
                    <h1>The simple, free, and secure telemedicine solution.®</h1>
                    <p>We’ve made telemedicine simple and easy for you. Create your personal room and start practicing telemedicine today.</p>
                    <CButton color="success" size="lg">Get Started</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCarouselItem>
            <CCarouselItem>
              <img className="d-block w-100 slider-img" src={slides[0]} alt="slide 2" />
              <div className='carousel-caption-custom w-75 mx-auto'>
                <CRow>
                  <CCol md={6}>
                    <h1>The simple, free, and secure telemedicine solution.®</h1>
                    <p>We’ve made telemedicine simple and easy for you. Create your personal room and start practicing telemedicine today.</p>
                    <CButton color="success" size="lg">Get Started</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCarouselItem>
            <CCarouselItem>
              <img className="d-block w-100 slider-img" src={slides[0]} alt="slide 3" />
              <div className='carousel-caption-custom w-75 mx-auto'>
                <CRow>
                  <CCol md={6}>
                    <h1>The simple, free, and secure telemedicine solution.®</h1>
                    <p>We’ve made telemedicine simple and easy for you. Create your personal room and start practicing telemedicine today.</p>
                    <CButton color="success" size="lg">Get Started</CButton>
                  </CCol>
                </CRow>
              </div>
            </CCarouselItem>
          </CCarouselInner>
        </CCarousel>
      </CCol>
    </CRow>
  )
}

export default Carousels
