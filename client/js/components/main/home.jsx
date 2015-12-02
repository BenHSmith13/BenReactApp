"use strict";

import React          from 'react';
import BaseComponent  from '../base_component';
import Comment        from "./comment";
import CommentStore   from "../../stores/comment";

export default class Home extends BaseComponent{

  constructor(){
    super();
    this.stores = [CommentStore];
    this.state = this.getState();
  }

  getState(){
    return{
      comments: CommentStore.getComments()
    }
  }

  render(){
    return <div>
      <h2>Home</h2>
      <hr />
      <Comment home comments={this.state.comments}/>
    </div>;
  }
};