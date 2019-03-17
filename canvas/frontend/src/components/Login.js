import React, { Component } from 'react'
import {Redirect} from 'react-router';
import '.././App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { browserHistory } from 'react-router'

export default class Login extends Component {
  constructor(props){
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
        username : "",
        password : "",
        stufac  :"student",
        authFlag : false
    }
  }
  componentWillMount(){
    this.setState({
        authFlag : false
    })
}
//username change handler to update state variable with the text entered by the user
usernameChangeHandler = (e) => {
    this.setState({
        username : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
passwordChangeHandler = (e) => {
    this.setState({
        password : e.target.value
    })
}
dropdownChangeHandler=(e)=>{
    this.setState({
        stufac : e.target.value
    })
}
//submit Login handler to send a request to the node backend
Login = (e) => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        username : this.state.username,
        password : this.state.password,
        stufac:this.state.stufac
    }
    
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/login',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                localStorage.setItem("stufac",this.state.stufac)
                localStorage.setItem("stuname",response.data)
                localStorage.setItem('loginid',this.state.username)


                this.setState({
                    authFlag : true
                })
            }else{
                this.setState({
                    authFlag : false
                })
            }
        });
}

  render() {
    let redirectVar = null;
    if(cookie.load('cookie')){
     

        redirectVar = <Redirect to= "/home"/>
    }
    if(!(cookie.load('cookie'))){
     
        redirectVar = <Redirect to= "/login"/>
    }
    return (

      <div>
         {redirectVar}
    <center>
    <div class = "lessspace"> </div>
<h3 style={{color:"#777777"}}>
  <div class = "aligncenter">Connecting to SJSU </div></h3>
  <span style={{color:"#777777"}}><div class = "aligncenter">Sign-in with your San Jose State University account to access</div>
  <div class = "aligncenter"> SJSU Single Sign-on</div>
  </span>

<div class="signin-form mx-auto">

<div class = "border center">

<img  src={require("./sjsu_login.png")} alt = "SJSU LOGO" style={{height:"100%",width:"60%"}}></img>
</div>
<div class = "border">
            <form >
                <h5 class="text-center" style={{color:"#5E5E5E",fontWeight:"bold"}}>Sign in</h5>       
                <div class="form-group">
                    <input type="text" onChange = {this.usernameChangeHandler} name="uname" class="form-control" placeholder="SJSU ID Number" required="required"></input>
                </div>
                <div class="form-group">
                    <input type="password" onChange = {this.passwordChangeHandler}  name="pwd" class="form-control" placeholder="Password" required="required"></input>
                </div>
          
                <div class="form-group">    
              <select name="dropdown"  onChange = {this.dropdownChangeHandler} class="col col-sm-4" style={{marginLeft:"0px",padding:"6px",color:"grey"}}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
                </div>
                <div class="space"></div>
                <div class="form-group">
                    <button onClick={this.Login} class="btn btn-primary btn-block">Sign in</button>
                </div>    
                <div>
                    <a href="/Signup">New user Create Account</a>
                </div>

            </form>
    </div>
    
    </div>
    </center>
 
</div>
     
    )
  }
}
