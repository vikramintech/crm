import React,{useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {addContact,getUserContacts, updateContact,deleteContact} from '../services/contactService';
import ContactForm from '../components/ContactForm'

const Contacts=()=>{
    const{currentUser}=useAuth();
        const [contacts,setContacts]=useState([
            // {id:1,name:'Vikram Singh Rana',email:'vikramentech@gmail.com',
            //     phone:'1234567890', tag:''
            // }, {id:2,name:'Priya Sharma',email:'priyasharma@gmail.com',
            //     phone:'1234567880', tag:''
            // }, {id:3,name:'Aman Gupta',email:'amangupta@gmail.com',
            //     phone:'1234566890', tag:''
            // }, {id:4,name:'Aish',email:'',
            //     phone:'1234545890', tag:''
            // }, {id:5,name:'Jatin',email:'jatin@gmail.com',
            //     phone:'1244567890', tag:''
            // },
            
        ])
    
        const[selectedContact,setSelectedContact]=useState(null);
        const[searchTerm,setSearchTerm]=useState('');
        const[activeTag,setActiveTag]=useState('');

        const tagColors={
            Lead:'primary',
            Client:'success',
            Supplier:'warning',
            Partner:'info',
            Investor:'dark'
        }
        const loadContacts=async()=>{
            if(!currentUser) return;
            const userContacts=await getUserContacts(currentUser.uid);
            setContacts(userContacts);
        }
        // Local Storage: Load
        useEffect(()=>{
            // const storedContacts= JSON.parse(localStorage.getItem('contacts'));
            // if(storedContacts){
            //     setContacts(storedContacts);
            // }
            loadContacts();
        },[])
        console.log(contacts)
        // // Local Storage: Save
        // useEffect(()=>{
        //     localStorage.setItem('contacts',JSON.stringify(contacts));
        // },[contacts])np
        const handleAddContact=async(newContact)=>{
            // const updatedList=[...contacts,{id:Date.now(),...newContact}]
            await addContact(newContact,currentUser.uid)
            // setContacts(updatedList);
         loadContacts();   
        }
        const handleDeleteContact=async(id)=>{
            // const updatedList= contacts.filter(contact=>contact.id!==id);
            // setContacts(updatedList);
            await deleteContact(id);
            loadContacts();
        }
        const handleUpdateContact=async(id,updated)=>{
            await updateContact(id,updated);
            loadContacts();
        }
        
        const handleEditContact=async(updatedContact)=>{
            setSelectedContact(updatedContact)
        }
        const clearSelectedContact=()=>
            {setSelectedContact(null)}
       
        const filteredContacts= contacts.filter(contact=>{
            const term=searchTerm.toLowerCase();
            console.log(term);
            const isSearchMatched=
            contact.name.toLowerCase().includes(term)||
            contact.email.toLowerCase().includes(term)||
            contact.phone.toLowerCase().includes(term)||
            contact.tag.toLowerCase().includes(term)
            console.log(isSearchMatched);
            const isTagMatched= activeTag?contact.tag===activeTag:true;
            return isSearchMatched && isTagMatched;
            })
            const getTagColor=(tag)=>{
                return tagColors[tag]||'secondary'
            }
            const allTags=[...new Set(contacts.map((contact)=>contact.tag).filter(Boolean))]
            console.log(allTags);
    return(
        <div className='container mt-4'>
            <h2 className='mb-4'>Contacts</h2>
            
            <ContactForm onAdd={handleAddContact}  onUpdate={handleUpdateContact} selectedContact={selectedContact} clearSelectedContact={clearSelectedContact} allTags={allTags}/>
           {/* search */}
           <div className='mb-3'>
            <input type="text" className='form-control' placeholder='Search by Name, Email, Phone, Tag' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
           </div>
           {/* Tag cloud
           {allTags.length>0 &&(
            <div className='mb-4'>
                <strong>Tag Cloud: </strong>
                <div className='d-flex flex-wrap gap-2 mt-2'> 
                    {allTags.map((tag)=>{
                        const count=contacts.filter((c)=>c.tag===tag).length;
                        return(
                            <span key={tag} className={`badge bg-${getTagColor(tag)} text-white`}>{tag} {count}</span>
                        )
                    })}
                </div>
            </div>
           )} */}
           {/* tag filters */}
           
           {allTags.length>0 &&(
            <div className='mb-4'>
                <strong>Filter by Tag: </strong>
                <div className='d-flex flex-wrap gap-2 mt-2'>{allTags.map((tag)=>(
                    <span key={tag} className={`badge rounded-pill bg-${getTagColor(tag)} ${tag===activeTag?'border border-dark':''}`} style={{cursor:'pointer'}} onClick={()=>setActiveTag(tag)}>{tag}</span>
                ))}
                {activeTag && (
                <span className='badge bg-danger' style={{cursor:'pointer'}} onClick={()=>setActiveTag('')}>Clear Filter</span>
                )}
                </div>
            </div>
           )}
            <div className='row'>
                {filteredContacts.length>0?(
                filteredContacts.map((contact)=>(
                <div className='col-md-4 mb-3' key={contact.id}>
                    <div className='card shadow-sm position-relative'>
                            <span className={`badge bg-${getTagColor(contact.tag)} position-absolute top-0 end-0 m-2`} style={{zIndex:10}}>{contact.tag}</span>

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
            ))):(<div className='text-muted'>No Contact found</div>)}
            </div>
        </div>
    )
}
export default Contacts;