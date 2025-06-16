import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar=()=>{
    return(
        <div className='bg-light border-end'>
            <h2>CRM</h2>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    )
}
export default Sidebar;