import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

const Signup=()=>{
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate= useNavigate();
    const[error,setError]=useState(null);
    
    const handleSingup=async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,password);
            navigate('/');
                }
                catch(err){
                    setError(err.message);
                }
    };

    return(
        <div>
            <h2>Create Account</h2>
            {error && <div>{error}</div>}
            <form>
                <div>
                    <label >
                        <input type="email" value={email} required />
                    </label>
                </div>
                <div>
                    <label >
                        <input type="password" value={password} required />
                    </label>
                </div>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}
export default Signup;