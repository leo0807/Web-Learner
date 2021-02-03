import React from 'react'
import './Footer.css';
function Footer() {
    return (
        <div className="footer">
            <a className="footer--backToTop" href="/">
                Back to top
            </a>
            <div className="footer--details">
                <div className="footer--details__blocks">
                    <div className="footer--details__title">
                        Get to Know Us
                    </div>
                    <div className="footer--details__content">
                        <p>Careers</p>
                        <p>Blog</p>
                        <p>About Amazon</p>
                        <p>Investor Relations</p>
                        <p>Amazon Devices</p>
                        <p>Amazon Tours</p>
                    </div>
                </div>
                <div className="footer--details__blocks">
                    <div className="footer--details__title">
                        Get to Know Us
                    </div>
                    <div className="footer--details__content">
                        <p>Careers</p>
                        <p>Blog</p>
                        <p>About Amazon</p>
                        <p>Investor Relations</p>
                        <p>Amazon Devices</p>
                        <p>Amazon Tours</p>
                    </div>
                </div>
            </div>
            <div className="footer--region">
                <img className="footer--region__logo" src="" alt="" />
            </div>
            <div className="footer--services">

            </div>
            <div className="footer--terms">
                <a href="#">Condistions of Use</a>
                <a href="#">Privacy Notice</a>
                <a href="#">Interest-Based Ads</a>
                <span>© 1996-2021, Amazon.com, Inc. or its affiliates</span>
            </div>
        </div>
    )
}

export default Footer
