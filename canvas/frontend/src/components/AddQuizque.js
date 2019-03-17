import React, { Component } from 'react'

export default class AddQuizque extends Component {
  render() {
    return (
      <div>
            <button class="btn btn-primary mr-auto" data-toggle="modal" data-target="#yModal"  style={{visibility:"visible",float:"right",marginLeft:"200px"}}><i class="fal fa-plus"></i>Add Question</button>
      
        <div class="modal fade" id="yModal" role="dialog">
    <div class="modal-dialog" style={{width:"30%"}}>
    
   
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
         <center> <h4 class="modal-title">Create Quiz</h4></center>
         <div class="lessspace"></div>
        </div>
        <div class="modal-body">
        <center>
        <form  style={{width:"1-0%"}}>
                <div class="row">
                <div  class=" form-group col col-sm-5" > 
                    Quiz Name
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.quiznameChangeHandler} type="text" name="name" class="form-control" placeholder="Quiz Name"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div class="row">
                <div class=" form-group col col-sm-5" > 
                Quiz Due
               </div>
               <div class="col col-sm-7">
                    <input onChange={this.quizdueChangeHandler}  type="date" name="due" class="form-control" placeholder="Quiz Due"></input>
                </div>
                </div>
                <div class="lessspace"></div>
                <div>
                <div  class=" form-group col col-sm-5" > 
                Quiz Marks
               </div>
               <div class="col col-sm-7">
                    <input  onChange={this.asgnmtmarksChangeHandler} type="number" name="marks" class="form-control"></input>
                </div>
                </div>
                <div class="space"></div>
                
                <div class="form-group" style={{width:"40%"}}>
                    <button onClick={this.asgnmntupdate} type="submit" class="btn btn-primary btn-block">Update</button>
                </div>        
            </form>
            </center>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
   
    </div>
  </div>
      </div>
    )
  }
}
