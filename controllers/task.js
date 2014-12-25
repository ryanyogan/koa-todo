'use strict';

var Task = require('../models/task');

exports.list = function* () {
  this.body = yield Task.list();
};

exports.add = function* () {
  var title = this.request.body.title;
  if (!title) {
    this.state = 400;
    this.body = { success: false, message: 'title required' };
    return;
  }
  var task = { title: title, complete: false, created_at: new Date() };
  var id = yield Task.insert(task);
  this.body = {id: id};
  this.status = 201;
};

exports.update = function* () {
  var tId = this.params.id;
  var task = this.request.body;
  task.updated_at = new Date();

  yield Task.updateById(tId, task);
  this.status = 200;
};

exports.destroy = function* () {
  var tId = this.params.id;
  yield Task.destroy(tId);
  this.status = 200;
};

exports.complete = function* () {
  yield Task.complete();
  this.status = 200;
};

exports.clear = function* () {
  yield Task.clear();
  this.status = 200;
};
