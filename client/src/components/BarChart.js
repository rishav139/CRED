import React, { useEffect, useState} from "react";
import Chart from "react-apexcharts";

const BarChart = (props) => {
  
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
          
          <div className="mixed-chart" style={{width:'100%'}}>
            <Chart
              options={{
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: category
                }
              }}
              series={[
                {
                  name: "Amount",
                  data: data
                }
              ]}
              type="bar"
              width="100%"
              height='auto'
            />
          </div>
        </div>
      </div>
    );
}

export default BarChart;