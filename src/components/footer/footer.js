import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3 col-xs-6'>
              <div className='footer'>
                <h3 className='footer-title'>About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut.
                </p>
                <ul className='footer-links'>
                  <li>
                    <Link to="/">
                      <i className='fa fa-map-marker'></i>1734 Stonecoal Road
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className='fa fa-phone'></i>+021-95-51-84
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className='fa fa-envelope'></i>email@email.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-md-3 col-xs-6'>
              <div className='footer'>
                <h3 className='footer-title'>Categories</h3>
                <ul className='footer-links'>
                  <li>
                    <Link to="/hot-deals">Hot deals</Link>
                  </li>
                  <li>
                    <Link to="/laptops">Laptops</Link>
                  </li>
                  <li>
                    <Link to="/smartphones">Smartphones</Link>
                  </li>
                  <li>
                    <Link to="/cameras">Cameras</Link>
                  </li>
                  <li>
                    <Link to="/accessories">Accessories</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='clearfix visible-xs'></div>

            <div className='col-md-3 col-xs-6'>
              <div className='footer'>
                <h3 className='footer-title'>Information</h3>
                <ul className='footer-links'>
                  <li>
                    <Link to="/">About Us</Link>
                  </li>
                  <li>
                    <Link to="/">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Orders and Returns</Link>
                  </li>
                  <li>
                    <Link to="/">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className='col-md-3 col-xs-6'>
              <div className='footer'>
                <h3 className='footer-title'>Service</h3>
                <ul className='footer-links'>
                  <li>
                    <Link to="/">My Account</Link>
                  </li>
                  <li>
                    <Link to="/">View Cart</Link>
                  </li>
                  <li>
                    <Link to="/">Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/">Track My Order</Link>
                  </li>
                  <li>
                    <Link to="/">Help</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bottom-footer'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <span className='copyright'>
                Copyright &copy; by Nguyen Anh Vu
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
