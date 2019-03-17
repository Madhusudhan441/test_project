import React, { Component } from 'react'
import Graderesult from './Graderesults'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Grades extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            id:localStorage.getItem('courseid'),
            date1:"",
            grades:[],
            selected:"",
            courseres:[]
        }
    
    }
    courseidfilChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }
    sortfilChangeHandler=(e)=>{
        this.setState({
            date1: e.target.value
       })
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

                    console.log("hiii",this.state.courseres)

                }
            });
           
   

    }
    gradesearch=(e)=>{
        
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
     
        const gradelist = {
            id : this.state.id,
            stufac:localStorage.getItem('stufac'),
            loginid:localStorage.getItem('loginid'),
            date1 : this.state.date1
        }
      
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/gradesearch',gradelist)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                   console.log("success parent")
                   console.log(response.data)
                   
                    this.setState({
                        grades: response.data
                    });
                }
            });
    }

    render() {
    
        var courses_display = this.state.courseres.map(course1 => {
            {console.log("hello",course1.coursename,course1.courseid)};
            if(course1.courseid==localStorage.getItem('courseid')){
                this.state.selected = "selected"
            }
            else{
                this.state.selected = ""
            }
            return(
            <option value={course1.courseid} selected={this.state.selected}>{course1.coursename}</option>
                
            )
    })

        return (
            <div>
               
                <div class="container" style={{height:"200px"}}>
                    <div style={{width:"100%",height:"10%"}}>
                        <h2>Grades for Madhusudhan Shagam</h2>
                        <div class="lessspace"></div>
                        <span class=" doublepad" style={{marginLeft:"-60px"}}>Course</span>
                        
                        <span class="  doublepad"style={{marginLeft:"30px"}}>Arrange By</span>
                        <br></br>
                        </div>
                    <div>
                        <div class="lessspace"></div>
                        <select name="Coursefilter" onChange={this.courseidfilChangeHandler} class="lesspad col-sm-2">
                        {courses_display}
                            {/* <option value={localStorage.getItem('courseid')}>course1</option>
                            <option value="course2">course2</option>
                            <option value="course3">course3</option>
                            <option value="course4">course4</option> */}
                        </select>
                  
                        <select name="sortfilt" onChange={this.sortfilChangeHandler} class=" lesspad col-sm-2">
                            <option value="duedate">Due Date</option>
                            <option value="Assignmentgroup">Assignment Group</option>
                            <option value="course3">Title</option>
                        </select>
                        <div ></div>
                        <button onClick={this.gradesearch} class="btn btn-primary lesspad col-sm-1">Apply</button>
                    </div>
                </div>
                <div>
                    <Graderesult grades={this.state.grades}/>
                </div>
            </div>
        )
    }
}
