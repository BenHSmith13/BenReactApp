"use strict";

import React        from 'react';
import ReactDOM     from 'react-dom';
import TestUtils    from 'react/lib/ReactTestUtils';
import Comment      from './comment';
import CommentStore from '../../stores/comment';

fdescribe('Comment', ()=> {
  var result, props, buttons;

  beforeEach(()=>{
    props = {
      comments: ["MyFirstComment", "BirdsAreCool", "SaladSucks"]
    };

    result = TestUtils.renderIntoDocument(<Comment {...props}/>);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(result, 'button');
  });

  it('it renders', ()=> {
    expect(ReactDOM.findDOMNode(result).textContent).toContain('Comments');
    expect(TestUtils.scryRenderedDOMComponentsWithTag(result, 'button').length).toEqual(2);
    expect(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).toBeDefined();
    expect(TestUtils.findRenderedDOMComponentWithClass(result, 'comment-header')).toBeDefined();
  });

  it('hides the Comments', ()=>{
    var comments = TestUtils.findRenderedDOMComponentWithClass(result, 'comments');
    expect(buttons[0].textContent).toContain('Hide');
    expect(comments.style.display).toContain('block');
    TestUtils.Simulate.click(buttons[0]);
    expect(buttons[0].textContent).toContain('Show');
    expect(comments.style.display).toContain('none');
  });

  it('shows the comments', ()=>{
    result.setState({display: false});
    var comments = TestUtils.findRenderedDOMComponentWithClass(result, 'comments');
    expect(buttons[0].textContent).toContain('Show');
    expect(comments.style.display).toContain('none');
    TestUtils.Simulate.click(buttons[0]);
    expect(buttons[0].textContent).toContain('Hide');
    expect(comments.style.display).toContain('block');
  });

  it('displays comments', ()=>{
    expect(ReactDOM.findDOMNode(result).textContent).toContain("MyFirstComment");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("BirdsAreCool");
    expect(ReactDOM.findDOMNode(result).textContent).toContain("SaladSucks");
  });

  it('saves the comments using spies', ()=>{
    spyOn(result, 'reply');
    TestUtils.Simulate.click(buttons[1]);
    expect(result.reply).toHaveBeenCalled();
  });

  it('saves the comments checking store', ()=>{
    ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).value = 'TestsAreNeat!';
    TestUtils.Simulate.click(buttons[1]);
    expect(CommentStore.getComments()).toContain('TestsAreNeat!');
  });

  it('saves the comments checking the component itself', ()=>{
    ReactDOM.findDOMNode(TestUtils.findRenderedDOMComponentWithTag(result, 'input')).value = 'TestsAreNeat!';
    TestUtils.Simulate.click(buttons[1]);
    props.comments = CommentStore.getComments();
    result = TestUtils.renderIntoDocument(<Comment {...props}/>);
    expect(ReactDOM.findDOMNode(result).textContent).toContain('TestsAreNeat!');
  });
});