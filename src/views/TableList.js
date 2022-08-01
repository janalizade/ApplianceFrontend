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
export default class User extends Component {
  constructor() {
      super();
      
      this.state = {
          data : [],
          expandedRows : []
      };
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
      mode: 'no-cors',
      headers: myHeaders,
      method: 'GET',
      redirect: 'follow'
    };
    axios.get("http://localhost:5171/api/appliance/all", requestOptions)
    .then(res => {
      const data = res.data;
      this.setState({ data });
    })
    .catch(error => console.log('error', error));
      
  }
  
  handleRowClick(rowId) {
      const currentExpandedRows = this.state.expandedRows;
      const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
      
      const newExpandedRows = isRowCurrentlyExpanded ? 
    currentExpandedRows.filter(name => name !== rowId) : 
    currentExpandedRows.concat(rowId);
      
      this.setState({expandedRows : newExpandedRows});
  }
  
  renderItem(item) {
      const clickCallback = () => this.handleRowClick(item.name);
      const itemRows = [
        <div>
       
        <tr className="border-0" onClick={clickCallback} key={"row-data-" + item.name}>
            <td>{item.name}</td>
            <td>{item.address}</td>
        </tr>
        </div>
      ];
      
      if(this.state.expandedRows.includes(item.name)) {
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
                    
                    <tbody> 
                    
                      {item.appliances.map(appliance=>{   
                        return(          
                          <tr className="border-0" key={"row-expanded-" + item.name}>
                          <td className="border-0">{appliance.factoryNumber}</td>
                          <td className="border-0">{appliance.status}</td>
                          <td className="border-0">{appliance.aid}</td>
                          </tr>
                                );})}                      
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
      let allItemRows = [];
      
      console.log('data',this.state.data);
      
    
      this.state.data.forEach(item => {
          const perItemRows = this.renderItem(item);
          allItemRows = allItemRows.concat(perItemRows);
      });
      
      return (
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
