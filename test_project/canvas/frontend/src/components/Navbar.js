import React, { Component } from 'react'
import '../fontawesome/css/all.css';
import { Link } from 'react-router-dom';
import '.././App.css';
import axios from 'axios';
import { Route } from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      courses: [],
      visible: "hidden",
      regbtn:"",
      addbtn:""
    }
    if(localStorage.getItem('stufac')=="faculty"){
      this.state.regbtn="hidden"
      this.state.addbtn="visible"
    }
    else{
      this.state.addbtn="hidden"
      this.state.regbtn="visible"
    }
    
  }
  componentDidMount(){
    
    const dataq={
      stuname:localStorage.getItem('stuname'),
      stufac:localStorage.getItem('stufac')
    }
    axios.defaults.withCredentials = true;
   
      axios.post('http://localhost:3001/getcourselist',dataq)
      .then((response) => {
        if(response.status === 200){
                 
          console.log("success")
          console.log(response.data)
      //update the state with the response data
      this.setState({
          courses:response.data
      });
      console.log(this.state.courses)
    }
  });
 
  }
  addClass2 = (e) => {
    if (this.state.visible === "hidden") {


      this.setState({
        visible: "visible"
      })
    }
    else {

      this.setState({
        visible: "hidden"
      })
    }
    var menu = document.querySelector('#st-container1');
    var effect = e.target.getAttribute('data-effect');
    // adding the effects
    menu.classList.toggle(effect);
    menu.classList.toggle('st-menu2-open');
  }
  Logout=(e)=>{
 
    
    cookie.remove('cookie', { path: '/' })
   
    
  }
  
  addClass = (e) => {
    if (this.state.visible === "hidden") {


      this.setState({
        visible: "visible"
      })
    }
    else {

      this.setState({
        visible: "hidden"
      })
    }
    var menu = document.querySelector('#st-container');
    var effect = e.target.getAttribute('data-effect');
    // adding the effects
    menu.classList.toggle(effect);
    menu.classList.toggle('st-menu-open');
  }
  
  render() {
    
    let navLogin = null;
    if(cookie.load('cookie')){
        console.log("Able to read cookie");
        navLogin = (
            <ul class="nav navbar-nav navbar-right">
                    <li ><Link  to="/" onClick = {this.Logout}><span class="btn btn-primary">Logout</span></Link></li>
            </ul>
        );
    }
    let coursedet = this.state.courses.map(course => {
   
      return (
        
        <li ><a onClick={sto=>{localStorage.setItem("courseid",course.courseid)}} href="/Coursehome">{course.coursename}</a></li>

      )
    });
    return (
      <div>
       
        <div class="container cont1" style={{ width: "50%", float: "left", padding: "0px" }}>
          <div style={{ position: "absolute", marginTop: "0px" }}><img src={require("./sjsu_1.JPG")} style={{ height: "80px", width: "80px" }} alt="SJSU LOGO"></img></div>
          <div class="space"></div>

          <ul class="nav nav-tabs tabs-left  " style={{ width: "100%", position: "relative" }}>

            <li class="colorTabs" style={{ width: "100%", height: "100%", color: "#FFFFFF" }}>

              <button data-effect="st-effect-1" onClick={this.addClass} class="appWh "><span class="fa fa-user fa-2x" ></span><span><br></br>Account</span></button></li>


            <li class="active colorTabs"><a href="http://localhost:3000/home"><div class="appAct"><i class="fal fa-tachometer fa-2x"></i><span><br></br>Dashboard</span></div></a></li>

            <li class="colorTabs" style={{ width: "100%", height: "100%", color: "#FFFFFF" }}>

              <button data-effect="st-effect-2" onClick={this.addClass2} class="appWh "><span class="fa fa-user fa-2x" ></span><span><br></br>Courses</span></button></li>
            <li class="colorTabs" style={{ width: "100%", height: "100%", color: "#FFFFFF" }}>

              <button data-effect="st-effect-1" onClick={this.addClass} class="appWh "><i class="fa fa-user fa-2x"></i><span><br></br>Groups</span></button></li>

            <li class="colorTabs"><button class="appWh"><i class="fa fa-calendar-alt fa-2x"></i><span><br></br> Calendar </span></button></li>
            <li class="colorTabs"><button class="appWh"><i class="fal fa-envelope fa-2x"></i><span><br></br> Inbox   </span></button></li>
            <li class="colorTabs"><button class="appWh"><i class="fal fa-question-circle fa-2x"></i><span><br></br> Help    </span></button></li>
            <li class="colorTabs"><button class="appWh"><i class="fa fa-book fa-2x"></i><span><br></br> Library   </span></button></li>
            <li class="colorTabs"><button class="appWh"><i class="fal fa-arrow-to-left fa-2x"></i></button></li>

          </ul>
        </div>
        <div class="cont3">
          <div id="st-container" class="st-container cont2" >

            <div class="st-menu st-effect-1" id="menu-1" style={{ marginLeft: "90px", visibility: this.state.visible }}>
              <center>
                <a href="http://localhost:3000/Profile"><h2 style={{ color: "black" }}> <i class="fal fa-user-circle fa-2x"></i><span><br></br>{localStorage.getItem('stuname')}</span></h2></a>

               {/* {<Link to "/" onClick = {this.Logout.bind(this)} style={{ backgroundColor: "#F5F5F5" }}>Logout</Link>} */}
               {navLogin}
               </center>
              <div class="lessspace"></div>
              <hr></hr>
              <ul>
                <li ><a href="http://localhost:3000/Profile">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#">Notifications</a></li>
                <li><a href="#">Files</a></li>
                <li><a href="#">ePortfolios</a></li>
              </ul>


            </div>
          </div>
          <div id="st-container1" class="st-container1 cont2" >

            <div class="st-menu2 st-effect-2" id="menu-1" style={{ marginLeft: "90px", visibility: this.state.visible }}>

              <h2 style={{ color: "black" }}>Courses</h2>
              <hr></hr>
              <ul>
                {coursedet}
              </ul>
              <hr></hr>
              <div style={{ marginLeft: "10px" }}>
              <a href="/home"><button class="btn btn-info" onClick='/home'>All Courses</button></a>
              <div class="lessspace"></div>
                <div ><a href= "/coursesearch"><button class="btn btn-info" style={{visibility:this.state.regbtn}} >Register Course</button></a>
               
                </div>
                <div><a href= "/addcourse"><button class="btn btn-info" style={{visibility:this.state.addbtn}} >Add Course</button></a>
                </div>
                <div class="lessspace"></div>
                <p>Welcome to your courses! To customize the list of courses, click on the "All Courses" link and star the courses to display.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
