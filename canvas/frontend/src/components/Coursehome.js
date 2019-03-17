import React, { Component } from 'react'
import Navbar from './Navbar'
import ProfileMain from './ProfileMain'
import './Coursehome.css'
import Assignments from './Assignments';
import Announcements from './Announcements';
import Grades from './Grades'
import Quiz from './Quiz'
import Quiz_ques from './Quiz_ques'
import People from './People'
import Files from './Files'
import Chome from './Chome'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Announcements_det from './Announcements_det';
import Assignment_det from './Assignment_det';
export default class Coursehome extends Component {
    constructor() {
        super();
        this.state = {
            val:<Chome/>,
            val1:"",
            anncmnts:[]
        }

    }
    myCallback=(e)=>{
   alert("i")
        this.setState({
            val:e
    })
}
 
    semiCourse=(e)=>{
        this.setState({
                val:e
        })
    }
    render() {
       
       
   
        return (
            <div>
              
                <div className='container contmain' >
                    <div class="row rowC"></div>
                    <div class='col col-sm-2'>
                        <Navbar />
                    </div>
                    <div class="col col-sm-10 cont_side">
                    
                    <div class="lessspace"></div>
                    <span><h4>Course Name</h4></span>
                   
                    <hr></hr>
                        <div class="container">
                       <div class="col col-sm-2">
                            <ul class="nav  navclass " style={{marginLeft:"-30%"}}>
                            <li><a class="click" onClick={this.semiCourse.bind(this,<Chome />)}><span class="colspan">Home</span> </a></li>
                               <li><a class="click" onClick={this.semiCourse.bind(this,<Announcements callbackFromParent={this.myCallback.bind(this,<Announcements_det />)}/>)}><span class="colspan">Announcements</span> </a></li>
                             
                                <li><a class="click" onClick={this.semiCourse.bind(this,<Assignments callbackFromParent={this.myCallback.bind(this,<Assignment_det />)}/>)}><span class="colspan">Assignments</span> </a></li>
                             
                                <li><a href="#"><span class="colspan">Discussions</span></a></li>
                                <li><a class="click" onClick={this.semiCourse.bind(this,<Grades />)}><span class="colspan">Grades</span> </a></li>
                                <li><a class="click" onClick={this.semiCourse.bind(this,<People callbackFromParent={this.myCallback.bind(this,<People />)} />)}><span class="colspan">People</span> </a></li>
                                <li><a class="click" onClick={this.semiCourse.bind(this,<Files />)}><span class="colspan">Files</span> </a></li>
                               
                                <li><a href="#"><span class="colspan">Syllabus</span></a></li>
                                <li><a class="click" onClick={this.semiCourse.bind(this,<Quiz callbackFromParent={this.myCallback.bind(this,<Quiz_ques callbackFromParent={this.myCallback.bind(this,<Quiz/>)} />)}/>)}><span class="colspan">Quiz</span> </a></li>
                            
                                <li><a href="#"><span class="colspan">Conferences</span></a></li>
                                <li><a href="#"><span class="colspan">Collaborations</span></a></li>
                                <li><a href="#"><span class="colspan">Chat</span></a></li>
                                <li><a href="#"><span class="colspan">Criterion</span></a></li>
                                <li><a href="#"><span class="colspan">Portfolium</span></a></li>
                                <li><a href="#"><span class="colspan">SOTE/SOLATE</span></a></li>
                            </ul>
                      </div >
                     
                   
                        {this.state.val}
                       
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
