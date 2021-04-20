import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'

const DonutChart = (props) => {

  const [category,setCategory] = useState(props.labels);
  const [data,setData] = useState(props.data);


    useEffect(()=>{
      setCategory(props.labels)
      setData(props.data)
    },
    [props.data])
  
 

    return (
        <div className="app">
          <div className="row">
            
            <div className="donut" style={{width:'100%',marginLeft:'15%'}}>
            <Chart options={{
              labels: category,
            }} series={data} type="donut" width="90%" />
            </div>
          </div>
        </div>
    );

}

export default DonutChart;