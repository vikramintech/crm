import Papa from 'papaparse';

const handleExportToCSV=(contacts,toast)=>{
    if(!contacts||contacts.length === 0){
        return toast.info("No contacts to export");
    }
    const csvData= contacts.map(contact=>({
        Name:contact.name,
        Email:contact.email,
        Phone:contact.phone,
        Tag:contact.tag,
    CreatedAt:contact.createdAt || 'N/A'
    }));

    const csv=Papa.unparse(csvData);

    const blob= new Blob([csv], {type: 'text/csv;charset=utf-8;'});

    const url=URL.createObjectURL(blob);

    const link= document.createElement('a');
    link.href=url;
    link.setAttribute('download',"contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('contacts exported to CSV!');

};
export default handleExportToCSV;