"use strict";

import Dispatcher     from "../dispatcher";
import Constants      from "../constants";
import StoreCommon    from "./store_common";

var comments= [];

var CommentStore = {...StoreCommon, ...{

  getComments(){
    return comments;
  }

}};

Dispatcher.register((payload)=> {

  switch(payload.action){

    case Constants.SAVE_COMMENT:
      comments.push(payload.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  CommentStore.emitChange();

  return true;

});

export default CommentStore;