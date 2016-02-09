// main js file
'use strict';

// var allProjects = []; OLD ARRAY

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.category = opts.category;
};

//instead of allProjects array
Project.all = [];

Project.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);
};

// loadAll function
Project.loadAll = function(data) {
  data.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });
  data.forEach(function(opts) {
    Project.all.push(new Project(opts));
  });
};

Project.fetchAll = function() {
  if(localStorage.articles) {
    //if localStorage has articles populated

  } else {
      //getJSON

  }
};

//practicing Ziptastic API

$(function() {
  $('#zipCode').keyup(function(e){
    e.preventDefault();
    var $zipCode = $('#zipCode').val();
    if($zipCode.length === 5 && $.isNumeric($zipCode)) {
      var requestUrl = 'http://ZiptasticAPI.com/' + $zipCode + '?callback=?';
      $.getJSON(requestUrl, null, function(data){
        console.log();
        if(data.city) $('#city').val(data.city);
        if(data.state) $('#state').val(data.state);
      });
    } else {
      $('#city').val('');
      $('#state').val('');
    }
  });
});
