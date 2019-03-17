import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import  AddQuizque from './AddQuizque'
import { timingSafeEqual } from 'crypto';
export default class Quiz extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            quiz:"",
            logdet:"visible",
            quesdet:[],
            question:"",
            option1:"",
            option2:"",
            option3:"",
            option4:"",
            quizname:"",
            quizdue:"",
            crctans:"",
            quizmarks:""
        }
        if(localStorage.getItem('stufac')=="student"){
          this.state.logdet = "hidden"
        }
    }

  queChangeHandler=(e)=>{
  if(e.target.name=="quizname"){
    this.state.quizname=e.target.value
 }
  if(e.target.name=="quizdue"){
    this.state.quizdue=e.target.value
  }
  if(e.target.name=="quizmarks"){
    this.state.quizmarks=e.target.value
  }
  }
  questionChangeHandler=(e)=>{
    if(e.target.name=="question"){
      this.state.question=e.target.value
    }
    if(e.target.name=="quizopt1"){
      this.state.option1=e.target.value
    }
    if(e.target.name=="quizopt2"){
      this.state.option2=e.target.value
    }
    if(e.target.name=="quizopt3"){
      this.state.option3=e.target.value
    }
    if(e.target.name=="quizopt4"){
      this.state.option4=e.target.value
    }
    if(e.target.name=="crctans"){
      this.state.crctans=e.target.value
    }
    
    
    
    console.log(this.state.quesdet)
  }

  addque=(e)=>{
    const var5 = {
      "question":this.state.question,
      "option1":this.state.option1,
      "option2":this.state.option2,
      "option3":this.state.option3,
      "option4":this.state.option4,
      "crctans":this.state.crctans
    }
    console.log(var5)
   this.state.quesdet.push(var5)
  }
  submitquiz=(e)=>{
    const dataquiz={
      courseid:localStorage.getItem('courseid'),
      studentid:localStorage.getItem('loginid'),
      quizname:this.state.quizname,
      quizdue:this.state.quizdue,
      quizmarks:this.state.quizmarks,
      quesdet:this.state.quesdet
    }
    axios.defaults.withCredentials = true;
   
      axios.post('http://localhost:3001/createquiz',dataquiz)
      .then((response) => {
        if(response.status === 200){
                 
          console.log("success")
          console.log(response.data)
       
          
      //update the state with the response data
      this.setState({
          quiz:response.data
      });
      console.log(this.state.quiz)
    }
  });

  }
    change=(val)=>(e)=>{
      if(val.quiztaken=="no" || localStorage.getItem('stufac')=="faculty"){
      
        localStorage.setItem('Quizid',val.quizid)
        localStorage.setItem('QuizName',val.name)
        this.props.callbackFromParent();
      }
      else{
        alert("Quiz Already Taken")
      }
    }
    componentDidMount(){
        console.log("hi")
      const dataq={
        courseid:localStorage.getItem('courseid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getquiz',dataq)
        .then((response) => {
          if(response.status === 200){
                   
            console.log("success")
            console.log(response.data)
         
        //update the state with the response data
        this.setState({
            quiz:response.data
        });
        console.log(this.state.quiz)
      }
    });
  
      }
    
  render() {
   
   
    if(this.state.quiz){
        var quizlist = this.state.quiz.map(quiz=>{
          return (
          
          <li class="border stl">
          <div class="mn row">
         <i class="fal fa-edit pad"></i>
            
       
          <a onClick={this.change(quiz)}>{quiz.name}</a>
     <br></br>
          <span class="fonthere pad" style={{marginLeft:"2.5%"}}>Due {quiz.due}</span>
        
          </div>
          </li>
       
         
       )})
      }
    return (
      <div>
     
      <div>
          <input type="text" placeholder="Search"></input>
          <a class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.createquiz} style={{visibility:this.state.logdet,float:"right",marginLeft:"200px"}}><i class="fal fa-plus"></i>Quiz</a>
        </div>
        

<div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
  <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title" id="myModalLabel">Application Form</h4>
        </div>
    	<div class="modal-body">          
      <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Quiz Name
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.queChangeHandler} type="text" name="quizname" class="form-control" placeholder="Quiz Name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Quiz Due
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.queChangeHandler}  type="date" name="quizdue" class="form-control" placeholder="Quiz Due"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div>
                <div  class=" form-group col col-sm-5" > 
                Quiz Marks
               </div>
               <div class="col col-sm-7">
                    <input  onChange={this.queChangeHandler} type="number" name="quizmarks" class="form-control"></input>
                </div>
                </div>
                <div class="space"></div>
                <a href="#" data-toggle="modal"  data-target="#upload-avatar" class="button"><i class="fa fa-plus"></i> Add Question</a>
                <div class="space"></div>
             
                <div class="form-group" style={{width:"40%"}}>
                    <button onClick={this.submitquiz} type="submit" class="btn btn-primary btn-block">Submit Quiz</button>
                </div>        
            </form>
            </center>
            
            
      	</div>
        <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>


<div class="modal" id="upload-avatar" tabindex="-1" role="dialog" aria-labelledby="upload-avatar-title" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="upload-avatar-title">Upload new avatar</h4>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Question
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler} type="text" name="question" class="form-control" placeholder="question"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Option 1
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler}  type="text" name="quizopt1" class="form-control" placeholder="option 1"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Option 2
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler}  type="text" name="quizopt2" class="form-control" placeholder="option 2"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Option 3
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler}  type="text" name="quizopt3" class="form-control" placeholder="option 3"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Option 4
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler}  type="text" name="quizopt4" class="form-control" placeholder="option 4"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Correct Answer
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.questionChangeHandler}  type="text" name="crctans" class="form-control" placeholder="correct answer"></input>
                </div>
                </div>
                <div class="space"></div>
                <a class="btn btn-primary"  data-toggle="modal" onClick = {this.addque} data-target="#upload-avatar" class="button"><i class="fa fa-plus"></i> Submit Question</a>
                   
            </form>
            </center>

        </div>
      </div>
    </div>
</div>


        </div>


            <div id="push"></div>
        
        <div class="container border maindiv">
           
            <h4>Quiz</h4>
           
            <ul style={{listStyle:"none"}}>
            {quizlist}
            </ul>
          
            
        </div>
      </div>
    )
  }
}
