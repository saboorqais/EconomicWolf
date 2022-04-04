import "./footer.css";
import React from "react";
function Footer() {
  return (
    <footer id="footer" style={{ marginTop: "70px" }} className="footer-1 bg-none">
      <div className="main-footer  ">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget subscribe no-box">
                <h5 className="widget-title">
                  COMPANY NAME<span></span>
                </h5>
                <p>   Notch up your chances to spot lucrative opportunities across
                Pakistan by turning millions of data points into meaningful
                answers. Our terminal facilitates the audience to visualize data
                backed by real-time and historical insights. One screen lets the
                consumers monitor historical changes and trends in consensus
                estimates for earnings, sales, and operating profits from analysts
                across the country. </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Quick Links<span></span>
                </h5>
                <ul className="thumbnail-widget">
                  <li>
                    <div className="thumb-content">
                      <a href="/app/contact">Contact</a>
                    </div>
                  </li>
                  <li>
                    <div className="thumb-content">
                      <a href="#.">&nbsp;Top Leaders</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Follow up<span></span>
                </h5>
                <a >
                  {" "}
                  <i className="fa fa-facebook"> </i>{" "}
                </a>
                <a >
                  {" "}
                  <i className="fa fa-twitter"> </i>{" "}
                </a>
                <a >
                  {" "}
                  <i className="fa fa-youtube"> </i>{" "}
                </a>
              </div>
            </div>
            <br />
            <br />

            <div className="col-xs-12 col-sm-6 col-md-3">
              <div className="widget no-box">
                <h5 className="widget-title">
                  Contact Us<span></span>
                </h5>
                <p>We guarantee hassle-free customer services, acknowledging and responding to all your queries within 24 hours. Please fill out the form below to email us your queries. All your information will be kept explicitly confidential.</p>
                <div className="emailfield">
                  <form>
                    <input type="text" name="email" value="Email" />
                
                    <input
                      className="btn btn-outline-dark"
                      type="submit"
                      value="Subscribe"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <p>
                  Copyright Design Sherif Hamdy © 2019. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
