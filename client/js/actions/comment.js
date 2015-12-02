"use strict";

import Constants   from   "../constants";
import Dispatcher  from   "../dispatcher";

export default {

  save(comment){
    Dispatcher.dispatch({ action: Constants.SAVE_COMMENT, data: comment });
  }
}
