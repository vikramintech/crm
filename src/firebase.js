import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig={
    apiKey:"AIzaSyBkFUKdxMcs2u6xpIX-K1CU92uwxeemkA",
    authDomain:"my-crm-app01.firebaseapp.com",
    projectId:"my-crm-app01",
    storageBucket:"my-crm-app01.firebasestorage.app",
    messagingSenderId:"359535817957",
    appId:"1:359535817957:web:cb80b9fafd7512d991500c"
}

const app= initializeApp(firebaseConfig);
export const auth=getAuth(app);