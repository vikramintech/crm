import React,{useEffect,useState} from 'react';

const ContactForm=({onAdd, onUpdate, selectedContact, clearSelectedContact})=>{
   const[formData,setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    tag:''
   })
   useEffect(()=>{
    if(selectedContact){
        setFormData({name:selectedContact.name,email:selectedContact.email,phone:selectedContact.phone,tag:selectedContact.tag||''})
    }
   },[selectedContact])
   const handleOnChange=(e)=>{
    const{name,value}=e.target;
    setFormData(prev=>({
        ...prev,
        [name]:value
    }));
   }
// suggestion only for tag input
if(name==='tag'){
    const matches =allTags.filter((tag)=>tag.toLowerCase().startsWith(value.toLowerCase())).filter((tag)=>tag!==value);
    setTagSuggestion(value?matches:[]);
}

const handleSuggestedTagClick=(suggestion)=>{
    setFormData((prev)=>({...prev,tag:suggestion}))
    setSuggestionTag([]);

}
   const handleOnSubmit=(e)=>{
    e.preventDefault();
    if(!formData.name || !formData.email||!formData.phone||!formData.tag){
        return alert('Please fill all the fields')
    }
    if(selectedContact){
        onUpdate({...selectedContact,...formData})
     }else{ 
        onAdd(formData);
     }
        setFormData({name:'',email:'',phone:'',tag:''})
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
            <input type='text' name='tag' className='form-control' value={formData.tag} onChange={handleOnChange} placeholder='e.g client, lead, supplier' />
        </div>
        {/* suggestion dropdown */}
        {tagSuggestion.length>0&&(
            <div className='list-group positon-absolute w-100 z-1 shadow-sm'>{tagSuggestions.map((suggestion,index)=>(
                <button type='button' key={index} className='list-group-item list-group-item-action' onClick={()=>handleSuggestedTagClick(suggestion)}> 
                    {suggestion}
                </button>
            ))}</div>
        )}
        <button type='submit' className='btn btn-primary'>{selectedContact?"Update Contact":"Add Contact"}</button>
        {selectedContact&&(<button type='button'className='btn btn-secondary' onClick={clearSelectedContact}>Cancel</button>)}
    </form>
)
}
export default ContactForm;