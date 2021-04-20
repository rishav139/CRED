import { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col} from 'reactstrap';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
import swal from 'sweetalert';

const AddCard = ({ onAdd }) => {

    const [cardNo, setCardNo] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [name, setName] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');
    const [regDate] = useState(/^[0-9/]+$/);
    const [regName] = useState(/^[a-zA-Z ]+$/);
    const [regNumber] = useState(/^[0-9]+$/);

    const onSubmit = async (event) => {
        event.preventDefault();

        if(!cardNo || !expiryDate || !name || !cvc) {
            swal({
                text:"Please complete all the fields",
                dangerMode:true,
                icon:"warning"
            });
            return 
        }

        let date = expiryDate.slice(0,2);
        date = parseInt(date);

        if(date > 12) {
            swal({
                text: "Invalid ExpiryDate",
                icon: "error",
                dangerMode: true
            });
            return ;
        }

        const newCard = {
            cardNumber : cardNo,
            expiryDate,
            name,
            cvc,
            amount:0
        };
        try{
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(newCard);

            const res = await axios.post('/cards',body, config);
            //.setItem('token', res.data.token);
            //console.log(res.data);
            //setAuthenticated(true);
            onAdd({cardNo, expiryDate, name})

            setCardNo('');
            setExpiryDate('');
            setName('');
            setCvc('');
            setFocus('');
        }
        catch(err){
            //console.error(err.response.data);
            swal({
                text: `${err.response.data.errors[0].msg}`,
                icon: "error"
            });
        }
        //alert("Card Added");
        
    }

    const checkCardNo = (event) => {

        let number = event.target.value;

        if(number === '' || regNumber.test(number)) {
            setCardNo(number);
        }
        else {
            swal({
                text: "Enter valid Card Number",
                icon: "warning",
                dangerMode: true
            });
            return;
        };
        setCardNo(number);
    }

    const checkExpiryDate = (event) => {
        
        let date = event.target.value;

        if (date === '' || regDate.test(date)) {
            setExpiryDate(date);
        }
        else {
            swal({
                text: "Enter valid date",
                dangerMode: true,
                icon: "warning"
            });
            return;
        }

    }

    const checkCvc = (event) => {
        let number = event.target.value;

        if(number === '' || regNumber.test(number)) {
            setCvc(number);
        }
        else {
            swal({
                text: "Enter valid CVC",
                dangerMode: true,
                icon: "warning"
            });
            return;
        };
        setCvc(number);
    }

    const checkName = (event) => {
        let name = event.target.value;

        if (name === '' || regName.test(name)) {
            setName(name);
        }
        else {
            swal({
                text: "Enter valid name",
                dangerMode: true,
                icon: "warning"
            });
            return;
        }
    }

    return (
        <>
        <Cards 
            number={cardNo}
            name={name}
            expiry={expiryDate}
            cvc={cvc}
            focused={focus}
        />


        <Form onSubmit={onSubmit}>
        <Container>

            <Row>
                <Col>
                    <FormGroup>
                        <Label>Card Number</Label>
                        <Input 
                            type="tel" 
                            name="cardNo"
                            placeholder="Card Number"  
                            value={cardNo} 
                            onChange={checkCardNo} 
                            onFocus={(event) => setFocus(event.target.name)}
                            maxLength="16"
                        />
                </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={name} 
                            onChange={checkName} 
                            onFocus={(event) => setFocus(event.target.name)}
                        />
                    </FormGroup>
                </Col>
            </Row>
        
            <Row>
                <Col>
                    <FormGroup>
                        <Label>Expiry Date</Label>
                        <Input 
                            type="text" 
                            name="expiryDate"
                            placeholder="MM/YY Expiry" 
                            value={expiryDate} 
                            onChange={checkExpiryDate} 
                            onFocus={(event) => setFocus(event.target.name)}
                            maxLength="5"
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label>CVC</Label>
                        <Input 
                            type="tel" 
                            name="cvc"
                            placeholder="CVC" 
                            value={cvc} 
                            onChange={checkCvc} 
                            onFocus={(event) => setFocus(event.target.name)}
                            maxLength="4"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col style={{width:'100%', display: 'flex',justifyContent: 'center'}}>
                    <Button  block>Add Card</Button>
                </Col>
            </Row>
        </Container>
    </Form>   
    </>
    )
}

export default AddCard