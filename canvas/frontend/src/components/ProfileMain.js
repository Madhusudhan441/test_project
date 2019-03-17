import React, { Component } from 'react'
import Navbar from './Navbar'
import cookie from 'react-cookies';
import axios from 'axios';
import {Redirect} from 'react-router';
export default class ProfileMain extends Component {
  constructor(props) {
    super(props);
    this.state={
        profile:[],
        name:"",
        email:"",
        phonenumber:"",
        about:"",
        school:"",
        city:"",
        country:"",
        company:"",
        hometown:"",
        language:"",
        gender:""

    }
    
}
nameChangeHandler = (e) => {
if(e.target.value){
  this.setState({
      name : e.target.value
  })
}
}

emailChangeHandler = (e) => {
 
  this.setState({
     email: e.target.value
  })
}

phonenumberChangeHandler = (e) => {

  this.setState({
    phonenumber : e.target.value
  })

}
aboutChangeHandler = (e) => {

  this.setState({
      about: e.target.value
  })
}

schoolChangeHandler = (e) => {

  this.setState({
    school : e.target.value
  })

}
cityChangeHandler = (e) => {
 
  this.setState({
    city : e.target.value
  })
}

countryChangeHandler = (e) => {
 
  this.setState({
    country : e.target.value
  })

}
companyChangeHandler = (e) => {

  this.setState({
    company : e.target.value
  })
}

hometownChangeHandler = (e) => {
 
  this.setState({
    hometown: e.target.value
  })

}
languageChangeHandler = (e) => {

  this.setState({
    language : e.target.value
  })

}
genderChangeHandler = (e) => {

  this.setState({
    gender : e.target.value
  })
}

updateProfile=(e)=>{
  alert("hi")
  console.log("hello",this.state.email,this.state.name)
const data1={
  stufac:localStorage.getItem('stufac'),
  loginid:localStorage.getItem('loginid'),
  name:this.state.name,
  email:this.state.email,
  phonenumber:this.state.phonenumber,
  about:this.state.about,
  city:this.state.city,
  country:this.state.country,
  company:this.state.company,
  hometown:this.state.hometown,
  language:this.state.language,
  school:this.state.school,
  gender:this.state.gender
}
  axios.defaults.withCredentials = true;
   
  axios.post('http://localhost:3001/updateprofile',data1)
  .then((response) => {
    if(response.status === 200){
      alert("hello")
      console.log(response.data)  
   
  //update the state with the response data
  this.setState({
      profile:response.data,
     
  });
}
});
}
  componentDidMount(){
        
    const dataq={
      loginid:localStorage.getItem('loginid'),
      stufac:localStorage.getItem('stufac')
    }
 
    axios.defaults.withCredentials = true;
   
      axios.post('http://localhost:3001/getprofile',dataq)
      .then((response) => {
        if(response.status === 200){
          
          console.log("hello",response.data)  
       
      //update the state with the response data
      this.setState({
          profile:response.data
      })
      this.setState({
          name:response.data[0].name,
          email:response.data[0].email,
          phonenumber:response.data[0].phonenumber,
          about:response.data[0].about,
          school:response.data[0].school,
          city:response.data[0].city,
          country:response.data[0].country,
          company:response.data[0].company,
          hometown:response.data[0].hometown,
          language:response.data[0].language,
          gender:response.data[0].gender
  
      });
    
    }
    console.log("hi",this.state.hometown)
  });

    }
  render() {
    let redirectVar = null;
    // if(cookie.load('cookie')){
    //     redirectVar = <Redirect to= "/Profile"/>
    // }
    if(!(cookie.load('cookie'))){
     
        redirectVar = <Redirect to= "/login"/>
    }
    var profiledet=this.state.profile.map(profile=>{
      return(
    <div style={{fontSize:"20px"}}>
      <div>
      <label>Name</label>&nbsp;&nbsp;
     
      <span>{profile.name}</span>
      </div>
      <div class="lessspace"></div>
      <div>
      <label>Email</label>&nbsp;&nbsp;
      {profile.email}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>About</label>&nbsp;&nbsp;
      {profile.about}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>City</label>&nbsp;&nbsp;
      {profile.city}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>Country</label>&nbsp;&nbsp;
      {profile.country}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>School</label>&nbsp;&nbsp;
      {profile.school}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>Hometown</label>&nbsp;&nbsp;
      {profile.hometown}
      </div>
      <div class="lessspace"></div>
      <div>
      <label>Languages</label>&nbsp;&nbsp;
      {profile.languages}
      </div>
    </div>
      )
  })
    
    return (
      <div>
        {redirectVar}
         <div className='container' style={{marginLeft:"-15px",float:"left",padding:"0px"}}>
        <div class="row rowC"></div>
        <div class='col col-sm-2'>
        <Navbar/>
        </div>
        <div class="col col-sm-10">
        <div class="lessspace"></div>
        <h4>{localStorage.getItem('stuname')}'s profile</h4>
        <hr></hr>
        <div class="lessspace"></div>
        <div class="container">
        <div class="col col-sm-2">
        <nav class="navbar navbar-default navcss">
  <div class="container-fluid">
  
    <ul class="nav navbar-nav">
    
      <li ><a href="#">Notifications</a></li>
      <li class="active" style={{width:"100px"}}><a  href="#">Profile</a></li>
      <li><a href="#">Files</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
  </div>
</nav>
        </div>
        <div class="col col-sm-1">     
    <img  src={require("./profile.JPG",)}  style={{height:"150%",width:"150%"}} alt = "profle"></img>

        </div>
        <div class="col col-sm-7">
        {localStorage.getItem('stuname')}
        <div class="space"></div>
        <div class="row">
          {profiledet}
        </div>
        </div>
        <div class="col col-sm-2">
        <button  class=" fal fa-edit btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" style={{padding:"10px",backgroundColor:"#F5F5F5",color:"#2D3B45",border:"none"}}>Edit Profile</button>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Profile</h4>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                
                <div class="form-group">
                    <input type="text" onChange = {this.nameChangeHandler}  name="name" class="form-control" placeholder="Name"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.emailChangeHandler} name="email" class="form-control" placeholder="Email"></input>
                </div>
                <div class="form-group">
                    <input type="number" onChange = {this.phonenumberChangeHandler} name="phonenumber" class="form-control" placeholder="Phone Number"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.aboutChangeHandler} name="aboutme" class="form-control" placeholder="About Me"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.cityChangeHandler} name="city" class="form-control" placeholder="City"></input>
                </div>
                <div class="form-group">
                    <input type="text"  onChange = {this.countryChangeHandler} name="country" class="form-control" placeholder="Country"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.companyChangeHandler} name="company" class="form-control" placeholder="Company"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.schoolChangeHandler} name="school" class="form-control" placeholder="School"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.hometownChangeHandler} name="hometown" class="form-control" placeholder="Hometown"></input>
                </div>
                <div class="form-group">
                    <input type="text" onChange = {this.languageChangeHandler} name="language" class="form-control" placeholder="Language"></input>
                </div>
                <div class="form-group">
                Gender
                <select onChange = {this.genderChangeHandler} name="Gender" class="form-control">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                 
                </select>
                </div>
                <div class="form-group">
                    <button type="submit" onClick={this.updateProfile} class="btn btn-primary btn-block">Update</button>
                </div>        
            </form>
            </center>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
        
        </div>
      </div>
      </div>
      </div>
      </div>
    )
  }
}
