import React,{useEffect,useState} from 'react';

const ContactForm=({onAdd, onUpdate, selectedContact, clearSelectedContact})=>{
   const[formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    tag:'Lead'
   })
   useEffect(()=>{
    if(selectedContact){
        setFormData({name:selectedContact.name,email:selectedContact.email,phone:selectedContact.phone,tag:selectedContact.tag||'Lead'})
    }
   },[selectedContact])
   const handleOnChange=(e)=>{
    setFormData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }));
   }

   const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(!formData.name || !formData.email||!formData.phone){
        return alert('Please fill all the fields')
    }
    if(selectedContact){
        onUpdate({...selectedContact,...formData})
     }else{ 
        onAdd(formData);
     }
        setFormData({name:'',email:'',phone:''})
        clearSelectedContact();
    }
   
return(
    <form onSubmit={handleOnSubmit} className='mb-4'>
        <div className='mb-3'>
            <label className='form-label'>Name</label>
            <input type="text" name='name' value={formData.name} onChange={handleOnChange} placeholder='Enter Full Name' className='form-control' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type="email" name='email' value={formData.email} onChange={handleOnChange} placeholder='Enter Email' className='form-control' />
        </div>
        <div className='mb-3'>
            <label className='form-label'>Phone</label>
            <input type="text" name='phone' value={formData.phone} onChange={handleOnChange} placeholder='Enter Phone Number' className='form-control' />
        </div>
        <div className='mb-3'>
            <label className='form-label' >Select Tag</label>
            <select name='tag' className='form-select' value={formData.tag} onChange={handleOnChange}>
                <option value="Lead">Lead</option>
                <option value="Client">Client</option>
                <option value="Supplier">Supplier</option>
            </select>
        </div>
        <button type='submit' className='btn btn-primary'>{selectedContact?"Update Contact":"Add Contact"}</button>
        {selectedContact&&(<button type='button'className='btn btn-secondary' onClick={clearSelectedContact}>Cancel</button>)}
    </form>
)
}
export default ContactForm;