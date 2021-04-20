import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container, Spinner, Col, Row } from 'reactstrap';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import copy from 'copy-to-clipboard';
const cc = require('coupon-code');

const Coupons = ({user,getUser}) => {

    const coupon = [
        {
            id: 1,
            company: "Flipkart",
            offer: "Get 20% off exclusive on Jeans",
            coins: 300
        },
        {
            id: 2,
            company: "Amazon",
            offer: "Get 10% off exclusive on Headphones",
            coins: 1000
        },
        {
            id: 3,
            company: "Myntra",
            offer: "Get 20% off exclusive on Ethnic Wear",
            coins: 2000
        },
        {
            id: 4,
            company: "Nykaa",
            offer: "Get 30% off exclusive on Beauty Products",
            coins: 1500
        },
        {
            id: 5,
            company: "Amazon",
            offer: "Get 20% off exclusive on Laptops",
            coins: 3000
        },
        {
            id: 6,
            company: "Flipkart",
            offer: "Get 20% off exclusive on Groceries",
            coins: 500
        }
    ]
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [credCoins,setCredCoins] = useState(0);
    const [coupons,setCoupons] = useState([]);

    
    useEffect(()=>{
        getUser();
        console.log(user);
        setCoupons(user.coupons);
        setCredCoins(user.credCoins);
        setLoading(false);
      },[user.credCoins,user.coupons.length])

    const onClick = async (event) => {
        //const curr = Math.floor(Math.random() * 100 + 1);
        //setValue(parseInt(curr));
        //console.log(event.target.value);

        swal({
            title: "Are you sure?",
            text: "Once confirmed, coins will be deducted",
            icon: "warning",
            buttons: true,
          })
          .then( async (willConfirm) => {
            if (willConfirm) {

                try{
                    const config = {
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    };
        
                    const amount = coupon[event.target.value-1].coins;
                    const couponNo = event.target.value-1;
                    const code = cc.generate();
        
                    const body = JSON.stringify({amount,couponNo,code});
            
                    const res = await axios.put('/coupons',body, config);
                    //localStorage.setItem('token', res.data.token);
                    //console.log(res.data);
                    //setAuthenticated(true);
                    getUser();
                    setTimeout(() => swal({
                      title: `Coupon Code: ${code}`,
                      text: `${coupon[couponNo].offer} at ${coupon[couponNo].company}`,
                      icon: "success",
                    }),300);
                    
                }
                catch(err){
                    console.error(err.response.data);
                    swal({
                        title: "Some error occured!",
                        text: "Coupon could not be claimed",
                        icon: "error"
                    });
                }
            } 
            else {
              swal("Coins are not deducted");
            }
          }); 
      }

    return (
        <div>
            <Button color="danger" onClick={toggle}>Coupons</Button>

            <Modal isOpen={modal} toggle={toggle} scrollable={true} style={{maxHeight:'80vh'}} size="lg">
                <ModalHeader toggle={toggle}><h2>Cred Coins: {credCoins} </h2></ModalHeader>
                <ModalBody>
                    <Container>
                    
                        <h3>Offers Available:</h3>
                        <center>
                            <Row>
                            {
                                loading ?
                                    <div> <Spinner color="warning" /> </div>
                                :
                                    coupon.map((e)=>(
                                        
                                        <Col xs="12" sm="6" lg="4">
                                            <div className="reward" style={{height:'300px', width:'210px',marginBottom:'15px', paddingTop:'40px', alignContent:'center'}}>
                                                <h1 style={{textAlign: 'center'}}> {e.company} </h1>
                                                <h5 style={{textAlign: 'center'}}> {e.offer} </h5>
                                                <br/>
                                                <h5 style={{textAlign: 'center'}}> Pay {e.coins} Coins</h5>
                                                
                                                <center>{credCoins>=e.coins?<Button onClick={onClick} value={e.id}> Claim Offer</Button>:<Button onClick={onClick} value={e.id} disabled> Claim Offer</Button>}</center>
                                            </div>
                                        </Col>
                                        
                                    ))
                            }
                            </Row>
                        </center>

                    {coupons.length?<h3>My Coupons:</h3>:<div></div>}
                    
                        <center>
                            <Row>
                            {
                                loading ?
                                    <div> <Spinner color="warning" /> </div>
                                :
                                    coupons.map((e)=>(
                                        <Col xs="12" sm="6" lg="4">
                                            <div className="reward" style={{height:'300px', width:'210px',marginBottom:'15px', paddingTop:'40px', alignContent:'center'}}>
                                                <h1 style={{textAlign: 'center'}}> {coupon[e.couponNo].company} </h1>
                                                <h5 style={{textAlign: 'center'}}> {coupon[e.couponNo].offer} </h5>
                                                <br/>
                                                <h3 style={{textAlign: 'center'}}> {e.code}</h3>
                                                <center><Button onClick={()=>{copy(`${e.code}`)}}> Copy Code</Button></center>

                                                </div>
                                        </Col>
                                    ))
                            }
                            </Row>
                        </center>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal> 
        </div>
    )
}

export default Coupons;
