import React from 'react';

const HomeFeatures = () => {
  return (
    <section className="home-features">
      <div>
        <h3>We make it easy to get started</h3>
        <h4>by keeping things simple</h4>
      </div>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <img width="100" height="70" src={'/images/download-icon.png'} alt="testImage"></img>
            <p className="feature-title">NO DOWNLOAD REQUIRED</p>
            <p className="feature-more">With accessibility in mind, we have made WiSYZ extremely simple and easy to use for both clinicians and patients.</p>
          </div>
          <div className="col-sm">
            <img width="100" height="70" src={'/images/free-icon.png'} alt="testImage"></img>
            <p className="feature-title">FREE TO USE</p>
            <p className="feature-more">We believe cost shouldn’t be a barrier to business. That’s why it is free for all.</p>
          </div>
          <div className="col-sm">
            <img width="100" height="70" src={'/images/worldwide-icon.png'} alt="testImage"></img>
            <p className="feature-title">WORLDWIDE USAGE</p>
            <p className="feature-more">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec luctus quam. Vestibulum porttitor libero congue orci.</p>
          </div>
          <div className="col-sm">
            <img width="100" height="70" src={'/images/relation-icon.png'} alt="testImage"></img>
            <p className="feature-title">KEEP TOUCH WITH CUSTOMERS</p>
            <p className="feature-more">All individual providers get a free Business Associate Agreement (BAA) with doxy.me. Sign up for free to download your BAA.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFeatures;
