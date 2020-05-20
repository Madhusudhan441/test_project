import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import './Announcements.css'

export default class Announcements extends Component {
    constructor(props) {
        super(props);
        console.log(props); 
        this.state={
            announcements:"",
            logdet:"",
            anncupdate:"initial",
            anct_name:"",
            anct_details:"",
            anct_date:""
        };
        if(localStorage.getItem('stufac')=="student"){
          this.state.logdet = "hidden"
        }
        
    }
  
    componentDidMount(){
        console.log("hi")
        
      // const dataq={
      //   courseid:localStorage.getItem('courseid')
      // }
      axios.defaults.withCredentials = true;
     const params={
      courseid:localStorage.getItem('courseid')
    }
        axios.post('http://localhost:3001/getannounce',params)
        .then((response) => {
          if(response.status === 200){
                   
            console.log("success")
            console.log(response.data)
        //update the state with the response data
        this.setState({
            announcements:response.data
        });
        console.log(this.state.announcelist)
      }
    });
  
      }
      anctnameChangeHandler = (e) => {
        this.setState({
          anct_name : e.target.value
        })
    }
    anctdetChangeHandler = (e) => {
      this.setState({
        anct_details : e.target.value
      })
  }
  anctdateChangeHandler = (e) => {
    this.setState({
      anct_date: e.target.value
    })
}
change=(val)=>(e)=>{
 
  localStorage.setItem('anct_id',val.anct_id)
  
  this.props.callbackFromParent();
}
      ancmntupdate=(e)=>{
     
        const dataq={
          courseid:localStorage.getItem('courseid'),
          anct_name:this.state.anct_name,
          anct_date:this.state.anct_date,
          anct_details:this.state.anct_details
        }
        axios.defaults.withCredentials = true;
       
          axios.post('http://localhost:3001/createannounce',dataq)
          .then((response) => {
            if(response.status === 200){
                     
              alert("Announcement Updated")
          console.log(this.state.announcelist)
          this.setState({
            anncupdate:"updated"
          })
        }
      });
      }
    
  render() {
    
   
    if(this.state.announcements){
        var announcelist = this.state.announcements.map(announce=>{
          return (
              <div>
        
             <li>
             
             <a onClick={this.change(announce)}><b>{announce.anct_name}</b></a><br>
              </br>
                  {announce.anct_details}
              </li>
              <hr></hr>
              </div>
          )})
  }
 
  
    return (
      <div>
      
        
        <div class="container">
        <span class="fontbold" >Announcements</span>
        <button class="btn btn-primary right" data-toggle="modal" data-target="#myModal" onClick={this.createannouncement} style={{visibility:this.state.logdet}}><i class="fal fa-plus"></i>Announcement</button>
        <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
         <center> <h4 class="modal-title">Create Announcement</h4></center>
         <div class="lessspace"></div>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Announcement Name
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.anctnameChangeHandler} type="text" name="antname" class="form-control" placeholder="Ancmnt Name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                    Announcement Details
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.anctdetChangeHandler}  type="text" name="antdet" class="form-control" placeholder="Ancmnt Details"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div>
                <div  class=" form-group col col-sm-5" > 
                    Date
               </div>
               <div class="col col-sm-7">
                    <input  onChange={this.anctdateChangeHandler} type="date" name="antdate" class="form-control"></input>
                </div>
                </div>
                <div class="space"></div>
             
                <div class="form-group" style={{width:"40%"}}>
                    <button onClick={this.ancmntupdate} type="submit" class="btn btn-primary btn-block">Update</button>
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
        <hr></hr>
        {announcelist}
        </div>
      </div>
    )
  }
}
