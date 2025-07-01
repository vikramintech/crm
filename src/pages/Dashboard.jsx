import React,{useState, useEffect} from 'react';
import { getUserContacts } from '../services/contactService';
import {auth} from '../firebase';
import {Chart as ChartJS,BarElement, CategoryScale, LinearScale,Tooltip,Legend,ArcElement} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import chartOptions from '../utils/chartoptions';;


ChartJS.register(BarElement,CategoryScale, LinearScale,Tooltip,Legend, ArcElement)

const Dashboard=()=>{
    const[contacts,setContacts]=useState([]);
    const[chartType,setChartType]=useState('bar');

    useEffect(()=>{
        if(auth.currentUser){
             fetchContacts();
        }
        const storedChartType=localStorage.getItem('chartType');
        if(storedChartType){
            setChartType(storedChartType);
        }
    },[])
            console.log(contacts);
    
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
    console.log(contacts);
    const tagCounts= contacts.reduce((acc,contact)=>{
        if(contact.tag){
            console.log((acc[contact.tag] || 0)+1);
            acc[contact.tag]= (acc[contact.tag] || 0)+1;
        }
        return acc;
    },{})

    const chartData={
        labels:Object.keys(tagCounts),
        datasets:[
            {
                label:'Contacts per Tag',
                data:Object.values(tagCounts),
                backgroundColor:[
                    '#od6efd','#198754','#dc3545','#fd7e14','#6f42c1'
                ],
                borderRadius:6
            }
        ]
    }
    return(
        <div className='container mt-4'>
            <h2>Dashboard</h2>
            {/* total contacts */}
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
                {/* contacts count by tag */}
            <div className='row my-4' >
                {Object.entries(tagCounts).map(([tag,count])=>(
                <div  key={tag}className='col-md-3 mb-3'>
                    <div className='card border-info h-100'>
                        <div className='card-body text-center'>
                            
                                <h5 className='card-title'>{tag}</h5>
                                <p className='card-text fs-4'>{count} contact</p>
                        </div>
                    </div>
                </div>))}
            </div>
            {/* toggle chart type */}
            <div className='form-check form-switch mb-3'>
                <input className='form-check-input' type='checkbox' id="chartToggle" onChange={()=>{
                    const newType=chartType==='bar'?'pie':'bar';
                    setChartType(newType);
                    localStorage.setItem('chartType',newType);
                }}
                    />
                    <label htmlFor="chartToggle" className='form-check-label' >Show {chartType==='bar'?'Pie':'Bar'} Chart</label>
            </div>
           {/* bar charts */}
                 <h4 className='mt-4'>Tag Overview ({chartType==='bar'?'Bar Graph':'Pie Chart'} )</h4>
            <div className='col' style={{maxWidth:'700px'}}>
                {chartType==='bar'?(
                    <Bar data={chartData} options={chartOptions}/>
                ):(
                    <Pie data={chartData} options={chartOptions}/>
                )}
            </div>
           
            {/* unique tag count */}
            <div className='col-md-4 ms-5 mt-5'>
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
        {/* top 5 recent contacts */}
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