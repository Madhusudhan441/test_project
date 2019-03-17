import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Courseresults extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    
    this.state = {
        regbtnflag:"disabled",
        status:"initial",
        permission:"hidden",
        
        coursestatus:"Not Enrolled",
        flag:0
    }}
    
    // componentDidMount(){
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     const data2 = {
    //         stuname:localStorage.getItem('stuname'),
    //         stufac:localStorage.getItem('stufac')
    //     }
       
        
    //     alert("hello")
    //     axios.post('http://localhost:3001/getcourselist',data2)
    //         .then(response => {
    //             console.log("Status Code child: ",response.status);
    //             if(response.status === 200){
                 
    //                console.log("success child")
    //                console.log(response.data)
    //                 this.setState({ 
    //                     courseres:response.data
    //                 })

    //             }
    //         });
       
   

    // }
   cregister=(e)=>{
    var headers = new Headers();
    e.preventDefault();
       console.log(e.target.value.coursestatus)
    const stat= JSON.parse(e.target.value)
   
    //    if(stat.coursestatus!="not registered"){
    //    alert("already registered")
     
    //     return;
    //    }
    //    else{
         
           const data1={
               enrollstatus:stat.enrollstatus,
               courseid:stat.courseid,
               courseterm:stat.courseterm,
               stuname:localStorage.getItem('stuname')
           }
        
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/regcourse',data1)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                 
                   console.log("success")
                   console.log(response.data)
                   
                this.setState({
                    status:"updated"
                })
                
                this.props.callbackFromParent()

                }
            });
       
   }    
   requestpermission=(val)=>(e)=>{
     alert("Permission Number generated")
      const datap={
           courseid:val,
           loginid:localStorage.getItem('loginid')
           
       }
       e.preventDefault();
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post('http://localhost:3001/requestpermission',datap)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
             alert("Course Added")
               console.log("success")
               console.log(response.data)
               
           
            
            this.props.callbackFromParent()

            }
        });
   }
  render() {
  console.log("courseres...updated...",this.props.data)
    var courseResult = null

  
    if (this.props.data.Courses != null) 
        courseResult = this.props.data.Courses.map(course => {
            this.state.coursestatus="Not Enrolled"
            this.state.regbtnflag = "Register"
            this.state.permission = "hidden"
            this.props.data.courseres.map(course1 => {
                console.log(course1.courseid,course.courseid)
                if(course1.courseid==course.courseid){
                   this.state.regbtnflag="Drop",
                   this.state.coursestatus=course1.coursestatus
                   console.log("coursesta",this.state.coursestatus)
    
                    }
                    if(this.state.coursestatus=="waitlist"){
                        this.state.permission = "visible"
                    }
                   
              
               
        })
        console.log("coursestatus",this.state.coursestatus,course.courseid)
          
            return (
                <tr>
                <td>{course.courseterm}</td>
                <td>{course.courseid}</ td>
                <td>{course.coursename}</td>
                <td><button type="submit" class="btn btn-primary" onClick={this.cregister} value={JSON.stringify({"courseid":course.courseid,"courseterm":course.courseterm,"enrollstatus":this.state.regbtnflag})} >{this.state.regbtnflag}</button></td>
                <td>{this.state.coursestatus}</td>
                <td><button onClick={this.requestpermission(course.courseid)} style={{visibility:this.state.permission}}>Request Permission Number</button></td>
            </tr>
            )
        })
    
   
    return (
        
      <div>
     
      
          
        <div class="container" style={{width:"100%"}}>
                    
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Term</th>
                                    <th>Course Id</th>
                                    <th>Course Name</th>
                                    <th>Register</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {courseResult}
                            </tbody>
                        </table>
                </div> 
      </div>
    )
  }
}
