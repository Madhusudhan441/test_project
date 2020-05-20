import React, { Component } from 'react'

export default class Sideebar extends Component {

  addClass=(e)=>{
    var menu = document.querySelector('#st-container');
    var effect = e.target.getAttribute('data-effect');
    // adding the effects
    menu.classList.toggle(effect);
    menu.classList.toggle('st-menu-open');
  }

  render() {
    return (
      <div>
       
<nav class="st-menu st-effect-1" id="menu-1" style={{marginLeft:"400px"}}>
  <h2 class="icon icon-lab">Sidebar</h2>
  <ul>
    <li><a class="icon icon-data" href="#">Data Management</a></li>
    <li><a class="icon icon-location" href="#">Location</a></li>
    <li><a class="icon icon-study" href="#">Study</a></li>
    <li><a class="icon icon-photo" href="#">Collections</a></li>
    <li><a class="icon icon-wallet" href="#">Credits</a></li>
  </ul>
</nav>  
  <div class="st-content">
   
    <div class="st-content-inner">
      
     
      <div class="main clearfix">
        <div id="st-trigger-effects" class="column">
          <button data-effect="st-effect-1" onClick={this.addClass}>Slide in on top</button>
         
    </div>
    </div>

  </div>


</div>
</div>
  
    )
  }
}
