import {db} from "../firebase";
import {collection,addDoc,getDocs,doc,updateDoc,deleteDoc,query,where} from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";

// Add contact

export const addContact= async(contact,userId)=>{
    const contactsRef= collection(db,"contacts");
    await addDoc(contactsRef,{...contact,userId,createdAt:serverTimestamp()});
};

// Retreive all contacts for logged in user

export const getUserContacts=async(userId)=>{
    const contactsRef=collection(db,"contacts");
    const q= query(contactsRef,where("userId","==",userId));
    const snapshot=await getDocs(q);
    return snapshot.docs.map(doc=>({id:doc.id,...doc.data()}))
};

// Update

export const updateContact=async(id,updatedData)=>{
    const contactRef=doc(db,"contacts",id);
    await updateDoc(contactRef,updatedData)
};

// Delete

export const deleteContact=async(id)=>{
    const contactRef= doc(db,"contacts",id);
    await deleteDoc(contactRef);
};