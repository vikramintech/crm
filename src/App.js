import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Login from './pages/Login'
import Sidebar from './components/Sidebar';

function App(){
    return(
        <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        <Sidebar/>
        </Router>
    )
}
export default App;