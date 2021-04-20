import React, {useState, useEffect} from 'react';
import ScratchCard from 'react-scratchcard';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import swal from 'sweetalert';

import { Container, Row, Col } from 'reactstrap';

 

const Rewards = ({user,getUser}) =>
 {
  const [loading, setLoading] = useState(true);
  //const cardNo = props.cardNo;
  //const [user,setUser] = useState({});
  
  const [credCoins,setCredCoins] = useState(0);
  const [rewards,setRewards] = useState(user.rewards);
  const [unclaimed,setUnclaimed] = useState([-1,23]);
 
  const [modal, setModal] = useState(false);
  const [value,setValue] = useState('?');
  const toggle = () => setModal(!modal);

  const settings = {
    width: 200,
    height: 250,
    image: 'https://image.shutterstock.com/image-illustration/abstract-blue-background-vignette-black-260nw-138651581.jpg',
    finishPercent: 60,
    onComplete: async () => {
      const curr = Math.floor(Math.random() * 100 + 1);
      setValue(parseInt(curr));
      try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({amount:curr});

        const res = await axios.put('/rewards/claim',body, config);
        //localStorage.setItem('token', res.data.token);
        console.log(res.data);
        //setAuthenticated(true);
        setLoading(false);
        
        setTimeout(() =>{ 
        //toggle();
        swal({
          title:`Congratulations You Won  ${curr} cred coins`,
          text: "Reward Claimed!",
          icon: "success",
        })},1000);
        
        setTimeout(()=>{toggle();
          getUser();
          setValue('?');
        },1000);
        //setTimeout(() => window.location.reload(false),1000);
        
        
    }
    catch(err){
        console.error(err.response.data);
    }
      
    }
  };

 
 
  useEffect(()=>{
   getUser();
 
   setUnclaimed(user.unclaimedRewards);
   setCredCoins(user.credCoins);
   setRewards(user.rewards);
   setLoading(false);
 },[user.credCoins,user.unclaimedRewards.length,user.rewards.length])


  return(
    <div>
      <Button color="danger" onClick={toggle}>My Rewards</Button>
      <Modal isOpen={modal} toggle={toggle} scrollable={true} style={{maxHeight:'80vh'}} size="lg">
        <ModalHeader toggle={toggle}><h2>Cred Coins: {credCoins}</h2></ModalHeader>
        <ModalBody>
        <Container>
        
          <Row>
        
        {loading?<div><Spinner color="warning" /></div>:
        unclaimed.map(()=>(<Col xs="12" sm="6" lg ="4"><div className="reward" 
        style={{height:'250px',
        width:'200px',marginBottom:'15px'}}><ScratchCard {...settings}>
          <div style={{paddingTop:'50px'}} >
              <h6 style={{textAlign: 'center'}}>Congratulations!</h6> 
              <h6 style={{textAlign: 'center'}}>You Won</h6>
              <h1 style={{textAlign: 'center'}}>{value} </h1>
              <h4 style={{textAlign: 'center'}}>Cred Coins!</h4>
              </div>
             </ScratchCard></div></Col>))
        }
        
        </Row>
        <h3>Claimed Rewards:</h3>
        
        <center>
        <Row>
          
        {loading?<div><Spinner color="warning" /></div>:
        rewards.map((e)=>(<Col xs="12" sm="6" lg="4"><div className="reward" 
        style={{height:'250px',
        width:'200px',marginBottom:'15px', paddingTop:'60px'}}>
              {/* <h6 style={{paddingLeft:'20px'}}>Congratulations!</h6> 
              <h6 style={{paddingLeft:'20px'}}>You Won</h6> */}
              <h1 style={{textAlign: 'center'}}>{e} </h1>
              <h4 style={{textAlign: 'center'}}>Cred Coins!</h4>
              <h6 style={{textAlign: 'center'}}>Earned for paying bill</h6>
             </div></Col>))
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
export default Rewards;