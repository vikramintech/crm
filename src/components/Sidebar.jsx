import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar=()=>{
    return(
        <div className='bg-light border-end' style={{width: "250px", minHeight:"100vh"}}>
            <div className='p-3'>
                <h4 >CRM Menu</h4>
            <ul className='nav flex-column' >
                <li className='nav-item'><Link className='nav-link' to="/dashboard">Dashboard</Link></li>
                <li className='nav-item'><Link className='nav-link'to="/contacts">Contacts</Link></li>
                <li className='nav-item'><Link className='nav-link'to="/login">Login</Link></li>
            </ul>
            </div>
            
        </div>
    )
}
export default Sidebar;