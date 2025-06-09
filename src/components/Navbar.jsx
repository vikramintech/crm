import React from "react";
import {Link} from 'react-router-dom';

const Navbar=()=>{
    return(
        <nav >
            <h1>CRM</h1>
            <ul>
                <li><Link to='/'>dashboard</Link></li>
                <li><Link to='/contacts'>Contacts</Link></li>
                <li><Link to='/login'>login</Link></li>
                
            </ul>
        </nav>
    )
}
export default Navbar;