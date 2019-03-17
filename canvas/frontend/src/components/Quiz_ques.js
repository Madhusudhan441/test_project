import React, { Component } from 'react'
import axios from 'axios';
import './Quiz_ques.css'
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
export default class Quiz_ques extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state={
            quiz:"",
            dataque:[],
            status:""
            
        }
    }
    submit=(e)=>{
      if(localStorage.getItem('stufac')=="student"){
      const dataque1={
        dataque:this.state.dataque,
        loginid:localStorage.getItem('loginid'),
        courseid:localStorage.getItem('courseid'),
        quizid:localStorage.getItem('Quizid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/quizsub',dataque1)
        .then((response) => {
          if(response.status === 200){
                   
            console.log("success")
            console.log(response.data)
         
        //update the state with the response data
        this.setState({
          status:"updated"
        });
        alert("Responses Recorded")
        this.props.callbackFromParent();
      }
    });
    }
    else{
      alert("professor cannot submit quiz")
    }
  }
    saveoption=(e)=>{
      const var1={
        name:e.target.name,
        value:e.target.value
      }
      this.state.dataque.map((det,idx)=>{
        if(det.name==var1.name){
          this.state.dataque.splice(idx,1)
        }
      });
      
   this.state.dataque.push(var1)
      console.log(this.state.dataque)
    } 
    componentDidMount(){
        console.log("hi")
      const dataq={
        quizid:localStorage.getItem('Quizid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getquizques',dataq)
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
      
        var quizqueslist = this.state.quiz.map((quiz,idx)=>{
          return (
          <div>
          <h4>{quiz.quizquestion}</h4>
          <li class="options" style={{listStyle:"none"}}>
<fieldset id={"group"+idx}>
<div >

    <input type="radio" name={quiz.quizquesid} onClick={this.saveoption} id="question-1-answers-A" value="quizopt1" />
    <label for="question-1-answers-A">A){quiz.quizopt1} </label>
</div>

<div>
    <input type="radio" name={quiz.quizquesid} onClick={this.saveoption}  id="question-1-answers-B" value="quizopt2" />
    <label for="question-1-answers-B">B){quiz.quizopt2}</label>
</div>

<div>
    <input type="radio" name={quiz.quizquesid} onClick={this.saveoption}   id="question-1-answers-C" value="quizopt3" />
    <label for="question-1-answers-C">C) {quiz.quizopt3}</label>
</div>

<div>
    <input type="radio" name={quiz.quizquesid}  onClick={this.saveoption} id="question-1-answers-D" value="quizopt4" />
    <label for="question-1-answers-D">D) {quiz.quizopt4}</label>
</div>
</fieldset>

</li>
          </div>
       )})
          }
    return (
      <div>
       

        <div class="container border maindiv">
            <ul style={{marginLeft:"-2%"}} >
            <h3>{localStorage.getItem('QuizName')}</h3>
            <div class="lessspace"></div>
            {quizqueslist}
            </ul>
            <button onClick={this.submit} class="btn btn-primary btnclass">Submit</button>
            
        </div>
      </div>
    )
  }
}
