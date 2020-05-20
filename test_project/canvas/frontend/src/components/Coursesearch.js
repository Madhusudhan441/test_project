import React, { Component } from 'react'
import Navbar from './Navbar'
import Courseresults from './Courseresults'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Coursesearch extends Component {
    
    constructor() {
        super();
        this.state = {
            cname:"",
            cidfilt:"exactly",
            cid:"",
            cterm:"fall",
            statusres:"init",
            coursres:[],
            Courses:[]
        }
    }
    ctermChangeHandler = (e) => {
        this.setState({
            cterm : e.target.value
        })
    }
    cnameChangeHandler = (e) => {
        this.setState({
            cname : e.target.value
        })
    }

    cidfilterChangeHandler = (e) => {
        this.setState({
            cidfilt : e.target.value
        })
    }

    cidChangeHandler = (e) => {
        this.setState({
            cid : e.target.value
        })
    }
    myCallback = () =>{
      
        this.setState({
            statusres:"updated"
        })
      
        const searchlist = {
            cname : this.state.cname,
            cterm : this.state.cterm,
            cidfilt : this.state.cidfilt,
            cid:this.state.cid,
            stuid:this.state.stuname
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/coursesearch',searchlist)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                   console.log("success parent")
                   console.log(response.data)
                    this.setState({
                        Courses: response.data
                    });
                }
            });
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            const data2 = {
                stuname:localStorage.getItem('stuname'),
                stufac:localStorage.getItem('stufac')
            }
           
        
            axios.post('http://localhost:3001/getcourselist',data2)
                .then(response => {
                    console.log("Status Code child: ",response.status);
                    if(response.status === 200){
                     
                       console.log("success child")
                       console.log(response.data)
                        this.setState({ 
                            courseres:response.data
                        })
    
                    }
                });
               
    }
      
    componentDidMount(){
       
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        const data2 = {
            stuname:localStorage.getItem('stuname'),
            stufac:localStorage.getItem('stufac')
        }
       
        
      
        axios.post('http://localhost:3001/getcourselist',data2)
            .then(response => {
                console.log("Status Code child: ",response.status);
                if(response.status === 200){
                 
                   console.log("success child")
                   console.log(response.data)
                    this.setState({ 
                        courseres:response.data
                    })

                }
            });
           
   

    }
   
    coursesearch=(e)=>{
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const searchlist = {
            cname : this.state.cname,
            cterm : this.state.cterm,
            cidfilt : this.state.cidfilt,
            cid:this.state.cid,
        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/coursesearch',searchlist)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                   console.log("success parent")
                   console.log(response.data)
                    this.setState({
                        Courses: response.data
                    });
                }
            });
    }
  render() {
  
    return (
        
      <div>
         
          <div className='container' style={{marginLeft:"-15px",float:"left",padding:"0px"}}>
      <div class="row rowC"></div>
      <div class='col col-sm-2'>
      <Navbar/>
      </div>
      <div class="col col-sm-10 border" style={{width:"80%",marginTop:"6%"}}>
        <h4>Search Courses</h4>
        <form action="" method="POST">
              <div class="lessspace"></div>  
                <div class="form-group row">
                <span class="col col-sm-2">
                Term:
                </span>
                <select name="Term"  onChange = {this.ctermChangeHandler} class="col col-sm-2" style={{marginLeft:"15px"}}>
                  <option value="fall">Fall</option>
                  <option value="spring">Spring</option>
                 </select>
                </div>
                <div class="form-group row">
                <span class="col col-sm-2">
                Course Name:
                </span>
                <div class="col col-sm-2">
                    <input type="text" onChange = {this.cnameChangeHandler} name="coursename"></input>
                    </div>
                     </div>
                <div class="form-group row">
                <span class="col col-sm-2">
                Course Id:  
                </span>
                <select name="idfilter"  onChange = {this.cidfilterChangeHandler} class="col col-sm-2" style={{marginLeft:"15px"}}>
                  <option value="exactly">is exactly</option>
                  <option value="contains">contains</option>
                  <option value="ge">greater than or equal to</option>
                  <option value="le">less than or equal to</option>
                </select>
                <div class="col col-sm-2">
                    <input type="text" onChange = {this.cidChangeHandler} name="courseid"></input>
                    </div>
                        </div>
            
                <div class="form-group col col-sm-2"  style={{marginLeft:"-15px"}}>
                    <button type="submit" onClick={this.coursesearch} class="btn btn-primary btn-block">Search</button>
                </div>  
                    
            </form>

</div>
<div class="container border" style={{width:"80%",marginTop:"33%",marginLeft:"16%"}}>
        <Courseresults callbackFromParent={this.myCallback} data={{Courses:this.state.Courses,courseres:this.state.courseres}}/>
      </div>
      </div>
     
      </div>
    )

  }
}
