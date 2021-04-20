import React from 'react'
import NavBar from './NavBar';
import { Jumbotron } from 'reactstrap';
import Login from './Login';
import Register from './Register';
const Landing = () => {
return (
<div className='container-fluid' style = {{minHeight:'100vh',backgroundColor:'black',paddingBottom:'0%'}}>
        <NavBar/>
        <Jumbotron className='container-fluid2' style = {{marginTop:'7vh',marginLeft:'10vw',marginRight:'10vw',marginBottom:'10vh',width:'80vw'}}>
                <div style = {{display: 'flex',justifyContent:'center'}}>
                <div>
                        
                        <p className="display-3" style={{fontFamily: "'Monoton', cursive"}}>CRED</p></div>
                </div>

                <div style = {{display: 'flex',justifyContent:'center'}}>
                <div><h6 className="display-4">Credit Card Bill Payment Made Easy!</h6></div>
                </div>
        
        
        <hr className="my-2" />

        <div style = {{display: 'flex',justifyContent:'center'}}>
                <div><h1 className="display-5">Join Us Now!!</h1></div>
        </div>
        
        <div style = {{display: 'flex',justifyContent:'space-evenly',paddingBottom:'0%'}}>
        <div> <Login/></div>
        <div>
        <Register/>
        </div>
                </div>
       
        
      </Jumbotron>
</div>
)
}

export default Landing;