import React,{Component} from "react";
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
import { data } from "jquery";
export default class User extends Component {
  constructor() {
      super();
      
      this.state = {
          data : [],
          customer:[],
          expandedRows : [],
          customerId:[]
      };
  }
 async componentDidMount() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    const requestOptions = {
      mode: 'no-cors',
      headers: myHeaders,
      method: 'GET',
      redirect: 'follow'
    };
   
  axios
  .get("http://localhost:5171/api/appliance/all", requestOptions)
  .then((response) => {
    const customer = res.data;
    this.setState({ customer });
    return res.data;
  })




  }
  
  handleRowClick(rowId) {
      const currentExpandedRows = this.state.expandedRows;
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
      
      const newExpandedRows = isRowCurrentlyExpanded ? 
    currentExpandedRows.filter(aid => aid !== rowId) : 
    currentExpandedRows.concat(rowId);
      
      this.setState({expandedRows : newExpandedRows});
  }
  
  renderItem(item) {
      const clickCallback = () => this.handleRowClick(item.aid);
      const itemRows = [
        <tr className="border-0" onClick={clickCallback} key={"row-data-" + item.aid}>
            <td>{item.aid}</td>
        </tr>
      ];
      
      if(this.state.expandedRows.includes(item.aid)) {
          itemRows.push(
            <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h5">Appliance Information</Card.Title>
                  <p className="card-category">
                  
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover ">
                     <thead>
                      <tr>
                        <th className="border-0">Appliance factoryNumber</th>
                        <th className="border-0">Appliance status</th>
                        <th className="border-0">Customer Id</th>
                      </tr>
                    </thead>
                    <tbody>              
                          <tr className="border-0" key={"row-expanded-" + item.aid}>
                          <td className="border-0">{item.factoryNumber}</td>
                          <td className="border-0">{item.status}</td>
                          <td className="border-0">{item.customerId}</td>
                          </tr>                      
                    </tbody>                   
                  </Table>
                </Card.Body>
              </Card>
            </Col>       
          </Row>



            
          );
      }
      
      return itemRows;    
  }
  
      
  render() {
  
    console.log('data',this.state.customer);
      //const newStorage=localStorage.getItem('storage');
      //const  statusResults = this.state.data.map(item => item.status)
      //const newItems = JSON.stringify([newStorage,statusResults])
      //localStorage.setItem('storage',newItems);
      
      
      this.state.data.forEach(item => {
          const perItemRows = this.renderItem(item);
          allItemRows = allItemRows.concat(perItemRows);
      });
      
      return (
        <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Appliances Information</Card.Title>
              <p className="card-category">
              
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                 <thead>
                  <tr>
                    <th className="border-0">Appliances Id</th>
                  </tr>
                </thead>
                <tbody>              
                <table>{allItemRows}</table>                   
                </tbody>                   
              </Table>
            </Card.Body>
          </Card>
        </Col>       
      </Row>
      );
  }
}
