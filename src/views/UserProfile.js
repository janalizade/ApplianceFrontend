
import React from "react";
// react-bootstrap components
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
} from "react-bootstrap";
import axios from 'axios';


const  TableList=()=> {
  const[customer,setCustomer]=React.useState([]);
  React.useEffect(()=>{
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      mode: 'no-cors',
      headers: myHeaders,
      method: 'GET',
      redirect: 'follow'
    };
    axios.get("http://localhost:5171/api/customer/customer", requestOptions)
      .then(result => setCustomer(result.data))
      .catch(error => console.log('error', error));
      },[]);
      
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Customers Information</Card.Title>
                <p className="card-category">
                
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                   <thead>
                    <tr>
                      <th className="border-0">customerId</th>
                      <th className="border-0">Customer Name</th>
                      <th className="border-0">Customer Address</th>
                    </tr>
                  </thead>
                  <tbody>
               
                    {customer.map(item => {
                       return(
                       <tr className="border-0">
                       <td className="border-0">{item.customerId}</td>
                       <td className="border-0">{item.name}</td>
                       <td className="border-0">{item.address}</td>
                       </tr>

                       );
                       
                       })}
             
                  </tbody>
                 
                </Table>
              </Card.Body>
            </Card>
          </Col>
        
        </Row>
      </Container>
    </>
  );
}

export default TableList;
