import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

const Login=()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState(null);
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            navigate('/');
        }catch(err){
            setError(err.message);
        }
    }
    return(
        <div className="container mt-5" style={{maxWidth:'400px'}}>
            <h2 className='mb-4'>Login</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleLogin} >
                <div className='mb-3'>
                    <label>
                        Email
                    </label>
                    <input type="email" className='form-control' onChange={(e)=>setEmail(e.target.value)}value={email} required />
                </div>
                <div className='mb-3'>
                    <label>
                        Password
                    </label>
                    <input type="password" className='form-control' onChange={(e)=>setPassword(e.target.value)}value={password} required />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Login</button>
            </form>
        </div>
    )
}
export default Login;