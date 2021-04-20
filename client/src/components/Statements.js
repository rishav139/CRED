import React, { useState,useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, FormGroup } from 'reactstrap';
import { Form, Input, Label, Row, Col } from 'reactstrap';
import ReactPaginate from "react-paginate";

const Statements = (props) =>{

  //const t = props.transactions;

  const [transactions, setTransactions] = useState(props.transactions);
  const [pageNumber, setPageNumber] = useState(0);
  const [modal, setModal] = useState(false);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  //setTransactions([...t,]);

  const toggle = () => setModal(!modal);

  const transactionsPerPage = 10;
  const pagesVisited = pageNumber * transactionsPerPage;

  const pageCount = Math.ceil(transactions.length / transactionsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
      setTransactions(res);
    }
    else {
      return ;
    }
    
  }
  const onSubmit = (event) => {
    //console.log(event);
    //filterTransaction();
    event.preventDefault();
    filterTransaction();
  }

  useEffect(() => {
    console.log(transactions);
    setTransactions(props.transactions);
    console.log(transactions);
  }, [props.transactions])

  const reset = () => {
    setMonth(0);
    setYear(0);
    setTransactions(props.transactions);
  }

  //console.log(transactions);
  return (
    <div>
        
      <Button color="primary" onClick={toggle}><strong>{props.text}</strong></Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="lg" size="lg">

        <ModalHeader toggle={toggle}>Transactions</ModalHeader>
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
      <br />
            <Table responsive striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{"Date"}</th>
                  <th>{"Vendor"}</th>
                  <th>{"Category"}</th>
                  <th>{"Type"}</th>
                  <th>{"Amount"}</th>
                </tr>
              </thead>
              <tbody>
                { transactions.slice(pagesVisited, pagesVisited + transactionsPerPage)
    .map((data, idx) => (
                    <tr key={idx}>
                      <th scope="row">{pagesVisited+idx+1}</th>
                      <td>{data.date} </td>
                      <td>{data.vendor}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>{data.category} </td>
                      <td>{data.type}</td>
                      <td style={ data.amount > 0 ? {color:"red"} : {color:"green"}}>₹ {Math.abs(data.amount)}</td>
                    </tr>
                ))}
                
              </tbody>
            </Table>
            
        </ModalBody>
        <ModalFooter style={{justifyContent:'left'}}>
        <ReactPaginate
        previousLabel={" < "}
        nextLabel={" > "}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
        </ModalFooter>
      </Modal>
    </div>
      
  );
}

export default Statements;