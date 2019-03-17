import React, { Component } from 'react'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Graderesults extends Component {
    constructor(props) {
        super(props);
        console.log(props);
 
    }

  render() {
   
    var gradeResult = null
    if (this.props.grades != null) 
        gradeResult = this.props.grades.map(grade => {
            return (
                <tr>
                <td >{grade.studentid}</td>
                <td >{grade.coursename}</td>
                <td>{grade.name}</td>
                <td>{grade.due.substring(0,10)}</td>
                <td> </td>
                
                <td>{grade.score}</td>
                <td>{grade.marks}</td>
            </tr>
            )
        })
    return (
      <div>
          
         <div class="container" style={{width:"65%",float:"LEFT",marginLeft:"-20px"}}>
                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th >StudentId</th>
                                <th >CourseId</th>
                                <th>Name</th>
                                <th>Due</th>
                                <th>Status</th>
                                <th>Score</th>
                                <th>Out of</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Display the Tbale row based on data recieved*/}
                            {gradeResult}
                        </tbody>
                    </table>
            </div> 
      </div>
    )
  }
}
