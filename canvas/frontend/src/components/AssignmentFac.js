import React, { Component } from 'react'
import axios from 'axios';
import './Assignments.css'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

export default class AssignmentFac extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            assignments:""
        }
    }
    componentDidMount(){
    
      axios.get('http://localhost:3001/getassignmentfac')
      .then((response) => {
        
      //update the state with the response data
      this.setState({
          assignments:response.data
      });
      
  });

    }
  
  render() {
    
      if(this.state.assignments){
    var assignmentslist = this.state.assignments.map(assignment=>{
      return (
      
      <li class="border stl">
      <div class="mn row">
     <i class="fal fa-edit pad"></i>
        
   
      <a href="#">{assignment.name}</a>
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
        </div>
        <div class="container border maindiv">
           
            <h4>Assignments</h4>
          
           
            <ul style={{listStyle:"none"}}>
            {assignmentslist}
            </ul>
          
            
        </div>
      </div>
    )
  }
}
