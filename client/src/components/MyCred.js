import { useState,useEffect } from 'react'
import Header from './Header'
import AddCard from './AddCard'
import Button from './Button'
import ViewCards from './ViewCards'
import { Redirect } from 'react-router-dom';
import cred from '../img/cred.jpg';
import axios from 'axios';
import swal from 'sweetalert';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import Rewards from './Rewards'
import Coupons from './Coupons'

const MyCred = () => {
  
  //const name = "User 1";
  const [user,setUser] = useState({
    coupons: [],
credCoins: -100,
email: "",
name: "",
rewards: [],
unclaimedRewards: [],
  });
  const [data,setData] = useState([]);
 
  const [modal, setModal] = useState(false);

  const toggle2 = () => setModal(!modal);


  const [ showAddCard, setShowAddCard ] = useState(false)
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [authenticated, setAuthenticated] = useState(true);

    const loggedIn = async () =>{
        //const token = localStorage.getItem('token');
        //console.log(authenticated);
        if(!localStorage.token)
        {
            //console.log('ff')
            setAuthenticated(false);
            return;
        }
        //return 0;
        //console.log(localStorage.token);
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;

        try{
            const res = await axios.get('/auth');
            setUser(res.data)
            //console.log(res.data);
            //return true;
            return;
        }
        catch(err){
            console.log(err);
            setAuthenticated(false);
            return;
        }
    }
    
    //loggedIn();
    const getUser = async () =>{
      try{
        axios.defaults.headers.common['x-auth-token'] = localStorage.token;
        const res = await axios.get('/auth');
        //console.log(res);
        //setCredCoins(res.data.credCoins);
       // setUnclaimed(res.data.unclaimedRewards);
        //setRewards(res.data.rewards);
        setUser(res.data)
        return;
    }
    catch(err){
        console.log(err);
        //setAuthenticated(false);
        return;
    }
    }
    
  const getCards = async () =>{
    try{
      const res = await axios.get('/cards');
      //console.log(res1);
      setData(res.data);
      return;
  }
  catch(err){
      console.log(err);
      //setAuthenticated(false);
      return;
  }
  }
  
  
  const addCard = (event) => {
    console.log(event);
    swal({
      title: "Card Added!",
      icon: "success"
  }).then(() => toggle2());
    setShowAddCard(!showAddCard)
    getCards();
    //setTimeout(() => window.location.reload(false) ,1000);
  }

  const payBill = (event) => {
    console.log(event);
  }
  
  useEffect(()=>{
      loggedIn();
      getCards();
      getUser();
      console.log(user);
  },[data.length,user.credCoins,user.coupons.length,user.unclaimedRewards.length,user.rewards.length])
  
  

  if (!authenticated) {
    //console.log('sadfdaf')
    return <Redirect to="/"/>;
  }

   return (
    <div className="container-fluid" >
      <div>
      <Navbar color="warning" light expand="md">
      <NavbarBrand style={{display:'flex'}}><img src={cred} className="logo"/><h1 style={{fontFamily: "'Monoton', cursive"}}>CRED</h1></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-left ml-auto" >
            <NavItem>
      <Button color="danger" text = "Add Card" onClick={toggle2}/>
      <Modal isOpen={modal} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Enter Your Card Details</ModalHeader>
        <ModalBody>
        <AddCard onAdd={addCard}/>
          </ModalBody>

      </Modal>
            </NavItem>
            
            <NavItem>
              <Rewards  user={user} getUser={getUser}/>
            </NavItem>
            <NavItem>
              <Coupons user={user} getUser={getUser}/>
            </NavItem>
            <NavItem>
              <Button  
          text="Sign Out" 
          onClick={() => {
            localStorage.removeItem('token');
            setAuthenticated(false);
          }}
      />
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
      </div>
      

      <Header user={user.name} />

      <div className="outline" style={{minHeight:'90vh'}}>
        
        
          
        {
          data.length > 0 ? <ViewCards cards={data} payBill={payBill} user={user} getUser={getUser}/> : <div style={{display:'flex',justifyContent:'center',color:'#e8ba13'}}><h1>No Card to show! Please add a card!</h1></div>
        }

         
      
      </div>
    </div>
  );
}

export default MyCred;
