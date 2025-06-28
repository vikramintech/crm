import React,{useState, useEffect} from 'react';
import { getUserContacts } from '../services/contactService';
import {auth} from '../firebase';

const Dashboard=()=>{
    const[contacts,setContacts]=useState([]);

    useEffect(()=>{
        if(auth.currentUser){
            fetchContacts();
        }
    },[])
    
    const fetchContacts=async()=>{
        try{
            const data= await getUserContacts(auth.currentUser.uid);
            console.log(data);
        setContacts(data);
        }catch(error){
            console.error('error fetching contacts',error);
        }
        
    };

    const totalContacts= contacts.length;
    console.log(totalContacts);

    const allTags=[...new Set(contacts.map((contact)=>contact.tag).filter(Boolean))];
    console.log(allTags);

    const recentContacts= [...contacts].sort( (a,b)=>b.createdAt?.seconds-a.createdAt?.seconds).slice(0,5);
    console.log(recentContacts);
    return(
        <div className='container mt-4'>
            <h2>Dashboard</h2>
            <div className='row my-4'>
                <div className='col-md-4'>
                    <div className='card text-white bg-primary mb-3'>
                        <div className='card-body'>
                            <h5 className='card-title'>
                                Total Contacts
                            </h5>
                            <p className='card-text fs-4'>
                                {totalContacts}
                            </p>
                        </div>
                    </div>
                </div>
            
            <div className='col-md-4'>
                <div className='card text-white bg-success mb-3'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            Unique Tags Count
                        </h5>
                        <p className='card-text fs-4'>
                        {allTags.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <h4>Recent Contacts</h4>
        <table className='table table-striped mt-2'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Tag</th>

                </tr>
            </thead>
            <tbody>
                {recentContacts.map((contact)=>
                <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.tag}</td>
                </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}
export default Dashboard;