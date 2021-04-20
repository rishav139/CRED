import React, { useState,useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BarChart from './BarChart';
import DonutChart from './DonutChart';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { Form, Input, FormGroup, Label, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const SmartStatements = (props) => {

  const [modal, setModal] = useState(false);
  const [byTypeLabel, setByTypeLabel] = useState([]);
  const [byVendorLabel,setByVendorLabel] = useState([]);
  const [byTypeData, setByTypeData] = useState([]);
  const [byVendorData,setByVendorData] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [transactions, setTransactions] = useState(props.transactions);

  const toggle = () => setModal(!modal);
  const toggle2 = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = 0;
       }
       // Add object to list for given key's value
       acc[key] += obj.amount;
       return acc;
    }, {});
 }

  const groupTransaction = (t) => {
    const res = groupBy(t,'type');
    //console.log(res);
    //delete res.Self;
    let res_f1 = Object.keys(res);
    res_f1 = res_f1.filter((i) => i !== 'Bill payment');
    
    let res_f2 = Object.values(res);
    res_f2 = res_f2.filter((i) => i > 0);
    
    //console.log(res_f1);
    //console.log(res_f2);
    setByTypeLabel(res_f1);
    setByTypeData(res_f2);
    const res2 = groupBy(t,'vendor');
    
    let res_f3 = Object.keys(res2);
    res_f3 = res_f3.filter((i) => i !== 'Self');
    
    let res_f4 = Object.values(res2);
    res_f4 = res_f4.filter((i) => i > 0);
    

    setByVendorLabel(res_f3);
    setByVendorData(res_f4);
    //console.log(byVendorData);
  }

  useEffect(()=>{
    setTransactions(props.transactions);
    groupTransaction(props.transactions);
},[props.transactions])

const monthChange = (event) => {
  setMonth(event.target.value);
}

const yearChange = (event) => {
  setYear(event.target.value);
}
const filterTransaction = () => {
  //alert("/"+ month + "/" + year);
  if(month > 0 && year > 0) {
    const res = props.transactions.filter(item => item.date.includes("/"+ month + "/" + year));
    console.log(res);
    setTransactions(res);
    groupTransaction(res);
  }
  else {
    return ;
  } 
}

const onSubmit = (event) => {
  //console.log(event);
  event.preventDefault();
  filterTransaction();
  console.log(transactions);
  //console.log(transactions);
}


const reset = () => {
  setMonth(0);
  setYear(0);
  setTransactions(props.transactions);
  groupTransaction(props.transactions);

}


  return (
    <div>
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg">

        <ModalHeader toggle={toggle}>Smart Transactions</ModalHeader>
        <ModalBody>
        <Label> Select Month and Year: </Label>
        <Row>
        <Form onSubmit={onSubmit} inline>        
        <Col>
        <FormGroup>
          <Input type="select" value={month} onChange={monthChange}>
            <option value="0">MM</option>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </Input>
        </FormGroup>
        </Col>
        <Col>
        <FormGroup>
          <Input type="select" value={year} onChange={yearChange}>
            <option value="0">YY</option>
            <option value="17">2017</option>
            <option value="18">2018</option>
            <option value="19">2019</option>
            <option value="20">2020</option>
            <option value="21">2021</option>
          </Input>
        </FormGroup>
        </Col>
        <Col>
        <input type="submit" value="Submit" />
        </Col>
        <Col>
      <button onClick={reset} value="Reset">Reset</button>
      </Col>
      </Form>    
      </Row>
<br/>
        <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle2('1'); }}
          >
            Vendor
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle2('2'); }}
          >
            Vendor %
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle2('3'); }}
          >
            Type
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle2('4'); }}
          >
            Type %
          </NavLink>
        </NavItem>
        
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
                <BarChart labels = {byVendorLabel} data ={byVendorData} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
                <DonutChart labels = {byVendorLabel} data ={byVendorData}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
        <Row>
            <Col sm="12">
            <BarChart labels = {byTypeLabel} data ={byTypeData}/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
        <Row>
            <Col sm="12">
            <DonutChart labels = {byTypeLabel} data ={byTypeData}/>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
          
        </ModalBody>
        <ModalFooter>
          <Button  color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}


export default SmartStatements;