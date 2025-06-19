import React,{useEffect,useState} from 'react';
import ContactForm from '../components/ContactForm'

const Contacts=()=>{
        const [contacts,setContacts]=useState([
            {id:1,name:'Vikram Singh Rana',email:'vikramentech@gmail.com',
                phone:'1234567890'
            }, {id:2,name:'Priya Sharma',email:'priyasharma@gmail.com',
                phone:'1234567880'
            }, {id:3,name:'Aman Gupta',email:'amangupta@gmail.com',
                phone:'1234566890'
            }, {id:4,name:'Aish',email:'Aishtax@gmail.com',
                phone:'1234545890'
            }, {id:5,name:'Jatin',email:'jatin@gmail.com',
                phone:'1244567890'
            },
            
        ])

        const[selectedContact,setSelectedContact]=useState(null);

        // Local Storage: Load
        useEffect(()=>{
            const storedContacts= JSON.parse(localStorage.getItem('contacts'));
            if(storedContacts){
                setContacts(storedContacts);
            }
        },[])
        // Local Storage: Save
        useEffect(()=>{
            localStorage.setItem('contacts',JSON.stringify(contacts));
        },[contacts])
        console.log('checking error:',contacts);
        const handleAddContact=(newContact)=>{
            const updatedList=[...contacts,{id:Date.now(),...newContact}]
            setContacts(updatedList);
        }
        const handleDeleteContact=(id)=>{
            const updatedList= contacts.filter(contact=>contact.id!==id);
            setContacts(updatedList);
        }
        const handleEditContact=(contact)=>{
            setSelectedContact(contact);
        }

        const handleUpdateContact=(updatedContact)=>{
            const updatedList=contacts.map(contact=>contact.id===updatedContact.id?updatedContact:contact)
            setContacts(updatedList);
        }
    return(
        <div className='container mt-4'>
            <h2 className='mb-4'>Contacts</h2>
            <ContactForm onAdd={handleAddContact} onUpdate={handleUpdateContact} selectedContact={selectedContact} clearSelectedContact={()=>{setSelectedContact(null)}}/>
           
            <div className='row'>
                {contacts.map((contact)=>(
                <div className='col-md-4 mb-3' key={contact.id}>
                    <div className='card shadow-sm'>
                        <div className='card-body'>
                            <h5 className='card-title'>{contact.name}</h5>
                            <p className='card-text'><strong>Email: </strong>{contact.email}</p>
                            <p className='card-text'><strong>Phone: </strong>{contact.phone}</p>
                            <button className='btn btn-sm btn-outline-primary me-2' onClick={()=>handleEditContact(contact)}>Edit</button>
                            <button className='btn btn-sm btn-outline-danger'
                            onClick={()=>handleDeleteContact(contact.id)}>Delete</button>
                        </div>
                    </div>

                </div>
            ))}</div>
        </div>
    )
}
export default Contacts;