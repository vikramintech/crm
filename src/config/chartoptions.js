const chartOptions={

    responsive:true,
    maintainAspectRatio:false,
    plugins:{
        legend:{
            position:'top',
            labels:{
                color:'#333',
                font:{
                    size:14,
                },
            },       
         },
    },
    tooltip:{
        enabled:true,
        callbacks:{
            label:function(context){
                return `${context.label}: ${context.raw} contacts`
            },

        },
    },

}
export default chartOptions;