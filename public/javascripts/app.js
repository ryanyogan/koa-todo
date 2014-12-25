/**
 * @jsx React.DOM
 */

var React = require('react');
window.React = React;

var TodoApp = require('./components/todoApp');

React.renderComponent(<TodoApp />, document.getElementById('todoapp'));
