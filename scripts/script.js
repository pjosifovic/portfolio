// main js file
'use strict';

var allProjects = [];

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
};
