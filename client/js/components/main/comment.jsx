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

  reply(e){
    CommentActions.save(e.target.parentElement.children[0].value);
    e.target.parentElement.children[0].value = '';
  }

  getStyles(){
    return{
      comments: {
        display: this.state.display ? 'block' : 'none'
      }
    }
  }

  render(){
    var styles = this.getStyles();
    var show = this.state.display ? 'Hide' : 'Show';

    var comments = _.map(this.props.comments, (comment)=>{
      return<div>
        {comment}
      </div>
    });

    comments = this.state.display ? comments : [];

    return <div>
      <h3 className="comment-header">Comments</h3>
      <div><button onClick={()=>{this.toggleComments()}}>{show}</button></div>
      <div className="comments" style={styles.comments}>
        {comments}
      </div>
      <div>
        <input type="text" id="commentIn"/>
        <button onClick={(e)=>{this.reply(e)}}>Reply</button>
      </div>
    </div>;
  }
};

Comment.propTypes = {
  comments: React.PropTypes.array.isRequired,
  home: React.PropTypes.bool,
  about: React.PropTypes.bool
};