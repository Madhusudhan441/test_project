import React, { Component } from 'react'
import {Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Sideebar from './components/Sideebar'
import ProfileMain from './components/ProfileMain'
import addcourse from './components/addcourse'
import Signup from './components/Signup'
import './App.css';
import {Redirect} from 'react-router';
import Coursesearch from './components/Coursesearch'
import Coursehome from './components/Coursehome'
export default class Main extends Component {
  render() {
    
    return (
      <div>
      <Route path="/" exact component={Home}/>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Profile" component={ProfileMain}/>
        <Route path="/coursesearch" component={Coursesearch}/>
        <Route path="/addcourse" component={addcourse}/>
        <Route path="/coursehome" component={Coursehome}/>

      </div>
    )
  }
}
