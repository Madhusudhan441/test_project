import React, { Component } from 'react'
import '.././App.css';
import axios from 'axios';
import Navbar from './Navbar'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import BrowserHistory from 'react';
// const BrowserHistory = require('react-router/lib/BrowserHistory').default;

export default class Home extends Component {
    constructor(){
        super();
        this.state = {  
            courses:[]
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
        console.log(this.state.announcelist)
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
   
    let coursedet = this.state.courses.map(course => {
      
        return(
           
            <div class = "col-12 col-sm-4 ">
            {redirectVar}
           <div class="shadow">
            <div class = " tileborder" style={{marginTop:"6%",boxShadow: "0px 0px 1px 0px grey",borderTopLeftRadius:"6px",borderTopRightRadius:"6px", backgroundColor:course.coursecol}} >
            
            <div class = "space"></div>
            <div class = "space" ></div> 
            <div class = "lessspace"></div>
            </div>
            <div class = "tileborder" style={{borderBottomLeftRadius:"6px",boxShadow: "0px 1px 1px 0px grey",borderBottomRightRadius:"6px"}}>
            <a href="/coursehome"><span style={{fontWeight:"bold",color:course.coursecol}}>{course.coursename}</span></a>
            <a href="#"><p style={{color:"#6C757C"}}>{course.coursename}</p></a>
            
            <button type="button" class="btn btn-link fal fa-bullhorn  designcol"></button>
            <button type="button" class="btn btn-link fal fa-file-edit designcol"></button>
            <button type="button" class="btn btn-link fal fa-envelope-open designcol"></button>
            <button type="button" class="btn btn-link fal fa-file  designcol"></button>
            </div>
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
        <div class = "container" style={{marginLeft:"-15px",padding:"0px"}}>
        <div class = "row">

            <h2 >Dashboard</h2>
            <hr style={{borderTop: "1px solid #ccc"}}></hr>
        </div>  
       <div style={{width:"70%"}}>
       {coursedet}
       </div>
        
       </div>
      
        </div>
      </div>
      </div>
      
    )
  }
}
