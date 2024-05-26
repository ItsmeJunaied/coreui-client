import React from 'react';

const HomeFooter = () => {
  return (
    <section className="home-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-4 col-xs-12">
            <ul className="adress">
              <span>WiSYZ</span>
              <li><p>Lorem ipsum dolor sit amet, vero omnis vocibus ipsum dolor sit amwet.</p></li>
              <li><i className="fa fa-phone"></i>      +90 1234 56789</li>
              <li>info@gmail.com</li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <ul className="contact">
              <span>LEARN ABOUT WiSYZ</span>
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy </a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12">
            <ul className="social">
              <span>FOLLOW US</span>
              <li>
                <a href="https://www.facebook.com/">
                  <i className="fab fa-facebook-square fa-3x social"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/">
                  <i className="fab fa-twitter-square fa-3x social"></i>
                </a>
              </li>
              <li><a href="https://plus.google.com/"><i className="fab fa-google-plus-square fa-3x social"></i></a></li>
              <li><a href="https://linkedin.com/"><i className="fab fa-linkedin-square fa-3x social"></i></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="copyright row justify-content-center">
          <p>CopyRight © 2017 Digital All Rights Reserved</p>
        </div>
      </div>
    </section>
  )
}

export default HomeFooter;
