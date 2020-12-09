import React from 'react'
import './Footer.css'
import CopyrightIcon from '@material-ui/icons/Copyright';
function Footer() {
    return (
        <div className="footer">
            <p><CopyrightIcon fontSize="small" />2020 Airbnb clone! No rights reserved - this is a demo!</p>
            <p>Privacy · Terms · Sitemap · Company · Details</p>
        </div>
    )
}

export default Footer
