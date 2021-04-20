import Statements from './Statements'
import SmartStatements from './SmartStatements'
import Bill from './Bill'
//import PaginatedTable from './PaginatedTable'
import { Container, Row, Col } from 'reactstrap';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Cards from 'react-credit-cards';
import {Button} from 'reactstrap'

const Card = ({ card, payBill ,user, getUser}) => {

    const [transactions,setTransactions] = useState([]);
    const [amount, setAmount] = useState(0);

    const getTransactions = async () =>{

        try{
            const res = await axios.get(`/transactions/${card.cardNumber}`);
            //setData(res.data)
            //console.log(res);
            setTransactions(res.data);
            let x = 0;
            
            res.data.map((i)=>{
                x+=i.amount;
            });
            
            setAmount(x);
            return;
        }
        catch(err){
            console.log(err);
            //setAuthenticated(false);
            return;
        }
    }

    useEffect(()=>{
        //();
        getTransactions();
        //console.log(amount);
        //getAmount();
    },[])  
      
    return (
        <div className="card">
            
            <Container>
                <Row>
                    <Col>
                        <Cards 
                            number={card.cardNumber}
                            name={card.name}
                            expiry={card.expiryDate}
                        />
                    </Col>
                </Row>
                <Row style={{paddingTop:'2%',paddingBottom:'2%'}}>
                {
                    amount ?
                    <Col style={{paddingLeft:'35%', fontSize:'20px'}}>
                        <b>Amount: ₹ {amount}</b>
                    </Col>
                    : <Col style={{paddingLeft:'40%', fontSize:'20px'}}>
                        <b>Bill Paid!</b>
                    </Col>
                }
                    
                </Row>
                <Row>
                    <Col>
                        <Statements text={"View Statement"} transactions={transactions} amount={amount}/> 
                    </Col>
                    <Col>
                        {amount?<Bill text={"Pay Bill"} amount={amount} payBill={payBill} card={card.cardNumber} getTransactions={getTransactions} user={user} getUser={getUser}/>:<Button disabled>Pay Bill</Button>}
                    </Col>
                    <Col>
                        {transactions.length?<SmartStatements text={"Smart Statement"} transactions={transactions}/>:<Button disabled>Smart Statement</Button>}
                    </Col>
                </Row>
            </Container>
        

        </div>
    )
}

export default Card