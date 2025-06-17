import React,{useState} from 'react';

const ContactForm=({onAdd})=>{
   const[formData,setFormData]=useState({
    name:'',
    email:'',
    phone:''
   })
   const handleOnChange=(e)=>{
    setFormData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }));
   }

   const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(formData.name && formData.email&&formData.phone){
        onAdd(formData);
        setFormData({name:'',email:'',phone:''})
    }else{
        alert("please fill all fields")
    }
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
        <button type='submit' className='btn btn-primary'>Add Contact</button>
    </form>
)
}
export default ContactForm;