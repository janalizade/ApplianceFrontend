import React from "react";
import ChartistGraph from "react-chartist";
import styles from "./DashboardStyle.css";
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
  const[appliance,setAppliance]=React.useState([]);
  const[customer,setCustomer]=React.useState([]);
  const[applianceStatus,setApplianceStatus]=React.useState([]);
  const[arr,setArr]=React.useState([]);
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
        setAppliance(result.data.map(item=>item.appliances))
       
        
      
        applianceStatus.forEach((data) => {
          arr.push(data==="ON"? 100 : 200)
        })
          
      })
      .catch(error => console.log('error', error));  
    //  appliance.forEach((e1)=>{
    //    setApplianceStatus(e1.map(item=>item.status))
   //   })     
      console.log('appliance',appliance)
      console.log('applianceStatus',applianceStatus)
      console.log('customer',customer)
    },[]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Appliances Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph  className="ct-chart"
                    data={{
                      
                      labels: customer,
                      series: [arr]
                    }}
                    type="Bar"
                    options = {{

                      fullWidth: true,
                      width: '100%',
                      height: '200px',
                      showPoint: true,
                      lineSmooth: false,
                  
                      axisX: {
                          showGrid: false,
                          offset: 30,
                          onlyInteger: true,
                      },
                  
                      axisY: {
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
                      }
                  }}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
               
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
