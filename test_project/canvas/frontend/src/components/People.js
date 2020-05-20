import React, { Component } from 'react'
import axios from 'axios';
export default class People extends Component {
    constructor(props) {
        super(props);
        this.state={
            people:[],
            btnvis:"hidden",
            status:""
        }
        if(localStorage.getItem('stufac')=="faculty"){
          this.state.btnvis="visible"
        }
        else{
          this.state.btnvis="hidden"
        }
    }
    dropstud=(val)=>(e)=>{
      const data1={
        enrollstatus:"Drop",
        courseid:localStorage.getItem('courseid'),
        courseterm:"",
        stuname:val
    }
 alert("hi")
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
         
    this.props.callbackFromParent();

         }
     });
    }
    componentDidMount(){
        alert("hello")
      const dataq={
        courseid:localStorage.getItem('courseid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getpeople',dataq)
        .then((response) => {
          if(response.status === 200){
            
            console.log(response.data)
         
        //update the state with the response data
        this.setState({
            people:response.data
        });
      
      }
    });
  
      }
  render() {
      var getpeople=this.state.people.map(person=>{

          return(
        <tr>
        <td>{person.username}</td>
        <td>{person.studentid}</ td>
        <td><button class="btn btn-primary" onClick={this.dropstud(person.username)} style={{visibility:this.state.btnvis}}>Drop Student</button></td>
    </tr>
          )
      })
    return (
      <div>
          
        <div style={{float:"right",width:"80%"}}>
        <h3>People</h3>
          <table class="table">
                            <thead>
                                <tr>
                                    <th >Student Name</th>
                                    <th>Student Id</th>
                                     <th style={{visibility:this.state.btnvis}}>Drop Student</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved*/}
                                {getpeople}
                            </tbody>
                        </table>
          
          </div>
          </div>
         
    
      
    )
  }
}
