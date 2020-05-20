import React, { Component } from 'react'
import axios from 'axios';
export default class Announcements_det extends Component {
    constructor(props) {
        super(props);
        this.state={
            anct_det:[]
        }
       
    
    }
    componentDidMount(){
      
      const dataq={
        anct_id:localStorage.getItem('anct_id'),
        courseid:localStorage.getItem('courseid')
      }
      axios.defaults.withCredentials = true;
     
        axios.post('http://localhost:3001/getannouncedet',dataq)
        .then((response) => {
          if(response.status === 200){
                
            console.log("success childddd")
        
         
        //update the state with the response data
        this.setState({
            anct_det:response.data
        });
        console.log(this.state.anct_det)
      }
    });
  
      }
  render() {
    if(this.state.anct_det){
        var announcementedet = this.state.anct_det.map(announcement=>{
          return (

            <div class="border  ">
                <h3>{announcement.anct_name}</h3>

                <h6 style={{marginLeft:"220px", color:"blue"}}><span>Posted on  </span>{announcement.anct_date}</h6>
                <div class="lessspace"></div>
                
                <pre style={{backgroundColor:"white",border:"none",color:"black"}}><h4><p>{announcement.anct_details}</p></h4></pre>
            </div>
          )
        })
    }

      
    return (
      <div>
          <div class="w-25">
          <div>
       <div class="space border" style={{backgroundColor:"#F5F5F5"}}></div>
        {announcementedet}
        <div class="space border" style={{backgroundColor:"#F5F5F5"}}></div>
        </div>
        </div>
      </div>
    )
  }
}
