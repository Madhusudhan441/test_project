import React, { Component } from 'react'
import axios from 'axios';
import './Assignments.css'
import './Announcements.js'
mport './Assignments.css'
import './Assignments.css'
import 'Announcements.js'
import 'Home.css'
>>>>>>> 52921f7f58381fc367c1c332bcd603ea07a919c6
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Assignments extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            assignments:"",
            logdet:"",
          asgmnt_name:"",
        asgmnt_due:"",
        asgmnt_marks:"",
        asgmntpdate:"initial"
        }
        if(localStorage.getItem('stufac')=="student"){
          this.state.logdet = "hidden"
        }
    }
    asgnmtnameChangeHandler = (e) => {
      this.setState({
        asgmnt_name : e.target.value
      })
  }
  asgnmtdueChangeHandler = (e) => {
    this.setState({
      asgmnt_due : e.target.value
    })
}
asgnmtmarksChangeHandler = (e) => {
  this.setState({
    asgmnt_marks: e.target.value
  })
}
    componentDidMount(){
      console.log("hi")
    const dataq={
      courseid:localStorage.getItem('courseid')
    }
    axios.defaults.withCredentials = true;
   
      axios.post('http://localhost:3001/getassignment',dataq)
      .then((response) => {
        if(response.status === 200){
                 
          console.log("success")
          console.log(response.data)
       
      //update the state with the response data
      this.setState({
          assignments:response.data
      });
      console.log(this.state.assignments)
    }
  });

    }
    change=(val)=>(e)=>{
 
      localStorage.setItem('assignmentid',val.assignmentid)
      
      this.props.callbackFromParent();
    }
    asgnmntupdate=(e)=>{
      const dataq={
        courseid:localStorage.getItem('courseid'),
        asgmnt_name:this.state.asgmnt_name,
        asgmnt_due:this.state.asgmnt_due,
        asgmnt_marks:this.state.asgmnt_marks
      }
      axios.defaults.withCredentials = true;
     alert("hello")
        axios.post('http://localhost:3001/createassignment',dataq)
        .then((response) => {
          if(response.status === 200){
                   
            alert("Assignment Updated")
        console.log(this.state.asgmntpdate)
        this.setState({
          asgmntpdate:"updated"
        })
      }
    });
    }
  
  render() {
    
    
      if(this.state.assignments){
    var assignmentslist = this.state.assignments.map(assignment=>{
      return (
      
      <li class="border stl">
     
      <div class="mn row">
     <i class="fal fa-edit pad"></i>
        
   
      
      <a onClick={this.change(assignment)}>{assignment.name}</a>
 <br></br>
      <span class="fonthere pad" style={{marginLeft:"2.5%"}}>Due {assignment.due}</span>
    
      </div>
      </li>
   
     
   )})
  }
    return (
      <div>
        <div>
          <input type="text" placeholder="Search"></input>
        
        <button class="btn btn-primary mr-auto" data-toggle="modal" data-target="#myModal" onClick={this.createassignment} style={{visibility:this.state.logdet,float:"right",marginLeft:"200px"}}><i class="fal fa-plus"></i>Assignments</button>
        </div>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
         <center> <h4 class="modal-title">Create Assignment</h4></center>
         <div class="lessspace"></div>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Assignment Name
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.asgnmtnameChangeHandler} type="text" name="asgmntname" class="form-control" placeholder="Assignment Name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Assignment Due
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.asgnmtdueChangeHandler}  type="date" name="asgmntdue" class="form-control" placeholder="Assignment DUe"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div>
                <div  class=" form-group col col-sm-5" > 
                Assignment Marks
               </div>
               <div class="col col-sm-7">
                    <input  onChange={this.asgnmtmarksChangeHandler} type="number" name="asgmntmarks" class="form-control"></input>
                </div>
                </div>
                <div class="space"></div>
             
                <div class="form-group" style={{width:"40%"}}>
                    <button onClick={this.asgnmntupdate} type="submit" class="btn btn-primary btn-block">Update</button>
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
        <div class="container border maindiv">
           
       
            <span class="fontbold" >Assignments</span>
           <div class="lessspace"></div>
           
            <ul style={{listStyle:"none"}}>
            {assignmentslist}
            </ul>
          
            
        </div>
      </div>
    )
  }
}
