import React, { Component } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Calc.css';
export class Calc extends Component {

    constructor(){
        super();
        this.state = {  
            res:"",
            temp1:0,
            temp_b:0,
            temp_n:0,
            temp_sp:0

        }
    }  
    calcequal = (e) => {
        console.log("sending")
        var val = {
            value:this.state.res
        }
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/calculate',val)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                   console.log("render success")
                    console.log(response.data)
                    this.setState({
                        res : response.data.result
                    })
                    }
                else if(response.status==202){
                    this.setState({
                        
                        res : "Cannot perform - Division By Zero Exception"
                    })
                }
                else{
                    console.log(response.status)
                   
                    this.setState({
                        
                        res : "Invalid"
                    })
                }
                })
                }

    calceq = num => (e) => {
        console.log(num);
        if(num==='C'){
            this.setState({
                res : ("")
            })
            return;
        }
        if(this.state.temp_sp===1 && (num==='+'||num==='-'||num==='*'||num==='/'||num==='%')){
            this.setState({
                temp_sp : 1
            })
            
            return;
        }
        else{
            this.setState({
                temp_sp : 0
            })
            
        }
        switch(num){
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
            this.setState({
                temp_sp : 1
            })
            this.setState({
                temp1 : 0
            })
        }
             
        if(num==='br'){

            console.log(this.state.temp_b)
            if(this.state.temp_b===0){
                this.setState({
                    res : (this.state.res + '(')
                })
                this.setState({
                    temp_b : 1
                })
              
            }
            else{
                
                this.setState({
                    res : (this.state.res + ')')
                })
                this.setState({
                    temp_b : 0
                })
            }
            return;
        }
        if(num==='.' && this.state.temp1!==1){
            this.setState({
                temp1 : 1
            })
            this.setState({
                res : (this.state.res + num)
            })
            return;
        }
        else if(num!=='.'){
            this.setState({
                res : (this.state.res + num)
            })
            
        }
        else{
            
            return;
        }
        
    }
    
 
    render() {
    return (
      <div>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"></link>
    
          <div className = "container calc mx-auto" style = {{width:"20%", borderRadius:"10px",padding:"20px"}}>
                <div className = "row">
                    <input type = "print" value = {this.state.res}   id = "res" class = "col-xs-12 text-right" style={{width:"100%",height:"100%",border:"none",color:"black" }}></input>
                </div>

                <div className = "row">
                        <button className = "btn btn-lg col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick = {this.calceq('C')}>C</button>
                        <button className = "btn btn-lg col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick = {this.calceq('br')}>()</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick = {this.calceq('%')}>%</button>
                        <button className = "btn btn-lg  col-sm-3"  style = {{ borderRadius: "30px",padding:"15px"}} onClick = {this.calceq('/')}>/</button>
                    </div>
                <div className = "row">
                    <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('7')}>7</button>
                    <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('8')}>8</button>
                    <button className = "btn btn-lg  col-sm-3"  style = {{ borderRadius: "30px",padding:"15px"}}onClick ={this.calceq('9')}>9</button>
                    <button className = "btn btn-lg  col-sm-3"  style = {{ borderRadius: "30px",padding:"15px"}}onClick ={this.calceq('*')}>*</button>
                </div>
                <div className = "row">
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('4')}>4</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('5')}>5</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('6')}>6</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('-')}>-</button>
                </div>
                <div className = "row">
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('1')}>1</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('2')}>2</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('3')}>3</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('+')}>+</button>
                </div>
                <div className = "row">
                        <button className = "btn btn-lg  col-sm-3"  style = {{ borderRadius: "30px",padding:"15px"}}onClick ={this.calceq('00')}>00</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('0')}>0</button>
                        <button className = "btn btn-lg  col-sm-3" style = {{ borderRadius: "30px",padding:"15px"}} onClick ={this.calceq('.')}>.</button>
                        <button type = "submit" style = {{ borderRadius: "30px",padding:"15px"}} onClick = {this.calcequal} class = "btn btn-lg  col-sm-3">=</button>
                </div>
            </div>
      </div>
    )
  }
}

export default Calc
