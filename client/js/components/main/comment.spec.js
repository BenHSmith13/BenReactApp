"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import Comment      from './comment';
import CommentStore from "../../stores/comment";


describe('comment', ()=>{
  var result, props, button;

  beforeEach(()=>{
    props = {
      comments: ["MyFirstComment", "BirdsAreCool", "SaladSucks"]
    };
    result = TestUtils.renderIntoDocument(<Comment {...props} />);
    button = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
  });

  it('Displays comment form', ()=>{
    expect(ReactDOM.findDOMNode(result).textContent).toContain('Comments');
    expect(button.length).toEqual(2);
    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(result, 'comment-header')).toBeDefined();
  });

  it('hides the comment', ()=>{
    var comments = TestUtils.findRenderedDOMComponentWithClass(result, 'comments');
    expect(button[0].textContent).toContain('Hide');
    expect(comments.style.display).toContain('block');
    TestUtils.Simulate.click(button[0]);
    expect(button[0].textContent).toContain('Show');
    expect(comments.style.display).toContain('none');
  });

  it('show the comments', ()=>{
    result.setState({display: false});
    var comments = TestUtils.findRenderedDOMComponentWithClass(result, 'comments');
    expect(button[0].textContent).toContain('Show');
    expect(comments.style.display).toContain('none');
    TestUtils.Simulate.click(button[0]);
    expect(button[0].textContent).toContain('Hide');
    expect(comments.style.display).toContain('block');
  });

  it('displays comment props', ()=>{
    expect(ReactDOM.findDOMNode(result).textContent).toContain("MyFirstComment");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("BirdsAreCool");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("SaladSucks");
  });

  it('saves the reply, using spies', ()=>{
    spyOn(result, 'reply');
    TestUtils.Simulate.click(button[1]);
    expect(result.reply).toHaveBeenCalled();
  });

  it('Saves the reply, checking the store', ()=>{
    ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).value = "TestsAreNeat!";
    TestUtils.Simulate.click(button[1]);
    expect(CommentStore.getComments()).toContain("TestsAreNeat!");
  });

  it('Saves the reply, by the the component output', ()=>{
    ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).value = "AnotherTest";
    TestUtils.Simulate.click(button[1]);
    props.comments = CommentStore.getComments();
    result = TestUtils.renderIntoDocument(<Comment {...props} />);
    expect(ReactDOM.findDOMNode(result).textContent).toContain("AnotherTest");
  });

  describe('on the homeP Page', ()=>{
    beforeEach(()=>{
      props = {
        comments: ["MyFirstComment", "BirdsAreCool", "SaladSucks"],
        home: true
      };
      result = TestUtils.renderIntoDocument(<Comment {...props} />);
      button = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
    });
    it('does something different', ()=>{

    });
  })

});
