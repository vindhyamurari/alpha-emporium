import React, { ReactElement } from 'react'
import '../styles/footer.css'

interface Props {
    
}

export default function Footer({}: Props): ReactElement {
    return (
        <div className="footer">
            <span className="text">© 2021 Alpha Emporium</span>
        </div>
    )
}
