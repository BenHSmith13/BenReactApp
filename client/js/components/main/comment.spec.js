"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import Comment      from './comment';

describe('Comment', ()=> {
  var result, props;

  beforeEach(()=>{
    props = {
      comments: ["MyFirstComment", "BirdsAreCool", "SaladSucks"]
    };

    result = TestUtils.renderIntoDocument(<Comment {...props}/>);
  });

  it('it renders', ()=> {
    expect(ReactDOM.findDOMNode(result).textContent).toContain('Comments');
    expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'button').length).toEqual(2);
    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(result, 'comment-header')).toBeDefined();
  });
});