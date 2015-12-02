"use strict";

import React            from 'react';
import CommentActions   from '../../actions/comment';
import _                from 'lodash';


export default class Comment extends React.Component{

  constructor(){
    super();
    this.state = {display: true}
  }

  toggleComments(){
    this.setState({display: !this.state.display})
  }

  reply(){
    CommentActions.save(document.getElementById('commentIn').value);
    document.getElementById('commentIn').value = '';
  }

  render(){

    var show = this.state.display ? 'Hide' : 'Show';

    var comments = _.map(this.props.comments, (comment)=>{
      return<div>
        {comment}
      </div>
    });

    var comments = this.state.display ? comments : [];

    return <div>
      <h3>Comments</h3>
      <div><button onClick={()=>{this.toggleComments()}}>{show}</button></div>
      {comments}
      <input type="text" id="commentIn"/>
      <button onClick={()=>{this.reply()}}>Reply</button>
    </div>;
  }
};

Comment.propTypes = {
  comments: React.PropTypes.array.isRequired,
  home: React.PropTypes.bool,
  about: React.PropTypes.bool
};