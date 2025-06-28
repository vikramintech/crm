import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import {useAuth} from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App(){
    const{currentUser}=useAuth();
    return(
        <Router>
        <Navbar/>
        <div className='d-flex'>
        <Sidebar/>
        <div className='p-4 flex-grow-1'>
            <Routes>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path='/contacts' element={<PrivateRoute><Contacts/></PrivateRoute>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
        </Routes>
        </div>
            
        </div>
        
        </Router>
    )
}
export default App;