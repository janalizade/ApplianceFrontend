import React from "react";
import ChartistGraph from "react-chartist";

import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import axios from 'axios';
function Dashboard() {
  const[appliances,setAppliances]=React.useState([]);
  const[customer,setCustomer]=React.useState([]);

  const simpleChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    series: [
      [800000, 1200000, 1400000, 1300000],
      [200000, 400000, 500000, 300000],
      [100000, 200000, 400000, 600000]
    ],
  stackBars: true
}

  const customerStatus=[];
  const arr=[];
  const customer1=[];
  const customer2=[];
  const customer3=[];
  React.useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      mode: 'no-cors',
      headers: myHeaders,
      method: 'GET',
      redirect: 'follow'
    };
    axios.get("http://localhost:5171/api/appliance/all", requestOptions)
      .then(result => {
        setCustomer(result.data.map(item=>item.name))  
        setAppliances(result.data.map(item=>item.appliances))      
      })
      .catch(error => console.log('error', error));    
    },[]);
  
   appliances.forEach((item)=>{
    item.map((appliance)=>{
     customerStatus.push(appliance.status)
  
    })
  
    })
      console.log('customerStatus',customerStatus);
     
    customerStatus.forEach((data) => {
      arr.push(data==="ON"? 100 : 200)
    }) 
  return (
    <>
      <Container fluid>
        <Row>

   
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Appliances Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                    
                <div  id="chartHours">
                
                          <ChartistGraph  
                          data={{
                            
                            labels: customer,
                            series: [
                              [arr[0],arr[1],arr[2],arr[3],arr[4]],
                              [arr[5],arr[6],arr[7]],
                              [arr[8],arr[9]]
                            ]
                            
                          }}
                          type="Line"
                          options = {{
                            showLine: false,
                            axisX: {
                              showGrid:false,
                              showLine:false,
                              labelInterpolationFnc: function(value, index) {
                                return index % 13 === 0 ? ''  : null;
                              }
                            },

                            axisY: {
                              grid: {
                                display: false
                              },
                                offset: 25,
                                position: 'end',
                                labelInterpolationFnc: function(value) {
                                  if (value == 100) {
                                    return 'OFF'
                                  }
                                  if (value == 200) {
                                    return 'ON'
                                  }
                                  return ''
                                }
                            },
                           
                          }}
                          />  

                </div>
              </Card.Body>
              <Card.Footer>
               <div className="legend">
               {customer[0]} <i className="fas fa-circle text-info"> </i>
               {customer[1]} <i className="fas fa-circle text-danger"> </i>
               {customer[2]} <i className="fas fa-circle text-yellow" > </i>
               </div>
               
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        
        </Row>
       
      </Container>
    </>
  );
}

export default Dashboard;
