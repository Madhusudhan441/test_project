import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
export default class addcourse extends Component {
    constructor() {
        super();
        this.state={
            coursename:"",
            courseid:"",
            coursedes:"",
            coursedept:"",
            courseterm:"",
            coursecol:"",
            coursecap:"",
            coursewaitcap:"",
            courseroom:"",
            status:""
        }
    }
    formChangeHandler = (e) => {
        if(e.target.name=="courseid"){
            this.setState({
                courseid : e.target.value
            })
        }
        else if(e.target.name=="coursename"){
            this.setState({
                coursename : e.target.value
            })
        }
        else if(e.target.name=="coursedes"){
            this.setState({
                coursedes : e.target.value
            })
        }
        else if(e.target.name=="coursedept"){
            this.setState({
                coursedept : e.target.value
            })
        }
        else if(e.target.name=="coursecol"){
            this.setState({
                coursecol : e.target.value
            })
        }
        else if(e.target.name=="coursecap"){
            this.setState({
                coursecap : e.target.value
            })
        }
        else if(e.target.name=="coursewaitcap"){
            this.setState({
                coursewaitcap : e.target.value
            })
        }
        else if(e.target.name=="courseroom"){
            this.setState({
                courseroom : e.target.value
            })
        }
        else if(e.target.name=="courseterm"){
            this.setState({
                courseterm : e.target.value
            })
        }
      
    }
    handleSubmit=(e)=>{
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        
        axios.defaults.withCredentials = true;
        alert(e.target.elements)
       
  
        const data1={
            coursename:this.state.coursename,
            courseid:this.state.courseid,
            coursedes:this.state.coursedes,
            coursedept:this.state.coursedept,
            courseterm:this.state.courseterm,
            coursecol:this.state.coursecol,
            coursecap:this.state.coursecap,
            coursewaitcap:this.state.coursewaitcap,
            courseroom:this.state.courseroom,
            facultyid:localStorage.getItem('loginid')
        }
        //make a post request with the user data
        axios.post('http://localhost:3001/addcourse',data1)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                   alert("course added")
                   this.setState({
                       status:"updated",
                       coursename:"",
                       courseid:"",
                       coursedes:"",
                       coursedept:"",
                       courseterm:"",
                       coursecol:"",
                       coursecap:"",
                       coursewaitcap:"",
                       courseroom:"",
                       status:""
                   })
                 
                }
            });

        alert(e.target.courseid.value)
        console.log(e.target.courseid.value)
    }
  render() {
      if(this.state.status=="updated"){
            console.log("rendered")
      }
    return (
      <div>
           <div className='container' style={{marginLeft:"-15px",float:"left",padding:"0px"}}>
      <div class="row rowC"></div>
      <div class='col col-sm-2'>
      <Navbar/> 
      </div>
      <div class="col col-sm-10 border" style={{width:"40%",marginTop:"6%"}}>
        <h3> Add Course</h3>
        <div class="lessspace"></div>
        <form  onSubmit={this.handleSubmit} style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                Course Id
               </div>
               <div class="col col-sm-7">
                    <input  onChange = {this.formChangeHandler} type="text" value ={this.state.courseid} name="courseid" class="form-control" placeholder="courseid"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Name
               </div>
               <div class="col col-sm-7">
                    <input   onChange = {this.formChangeHandler} value ={this.state.coursename} type="text" name="coursename" class="form-control" placeholder="course name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Department
               </div>
               <div class="col col-sm-7">
                    <input   onChange = {this.formChangeHandler} value ={this.state.coursedept} type="text" name="coursedept" class="form-control" placeholder="course department"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Description
               </div>
               <div class="col col-sm-7">
                    <input   onChange = {this.formChangeHandler} value ={this.state.coursedes} type="text" name="coursedes" class="form-control" placeholder="course description"></input>
                </div>
                </div>
                <div class="lessspace"></div>
              
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Room
               </div>
               <div class="col col-sm-7">
                    <input  onChange = {this.formChangeHandler} value ={this.state.courseroom}  type="text" name="courseroom" class="form-control" placeholder="course room"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Capacity
               </div>
               <div class="col col-sm-7">
                    <input   onChange = {this.formChangeHandler} value ={this.state.coursecap} type="number" name="coursecap" class="form-control" placeholder="course capacity"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Waitlist Capacity
               </div>
               <div class="col col-sm-7">
                    <input  onChange = {this.formChangeHandler} value ={this.state.coursewaitcap}  type="number" name="coursewaitcap" class="form-control" placeholder="waitlist capacity"></input>
                </div>
                </div>
                <div class="lessspace"></div>
               <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course Term
               </div>

               <div class="col col-sm-7">
                    <input   onChange = {this.formChangeHandler}value ={this.state.courseterm}  type="text" name="courseterm" class="form-control" placeholder="course term"></input>
                </div>
                </div>
                
            
               <div class="lessspace"></div>
               <div class="row">
                <div class=" form-group col col-sm-5" > 
                Course color
               </div>

               <div class="col col-sm-7">
                    <input  onChange = {this.formChangeHandler}  value ={this.state.coursecol} type="text" name="coursecol" class="form-control" placeholder="course color"></input>
                </div>
                </div>
                
            
              
                <div class="lessspace"></div>
                <div class="lessspace"></div>
                <div class="form-group" style={{width:"40%"}}>
                    <button  type="submit" class="btn btn-primary btn-block">Add Course</button>
                </div>        
            </form>
            </div>
      </div>
      </div>
    )
  }
}
