// main js file
'use strict';

var allProjects = [];

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
  this.category = opts.category;
};

Project.prototype.toHtml = function() {
  // var $newProject = $('article.template').clone();
  // $newProject.removeClass('template');
  //
  // $newProject.find('header h1').text(this.title);
  // $newProject.find('address a').text(this.title);
  // $newProject.attr('data-category', this.category);
  // $newProject.attr('data-title', this.title);
  // $newProject.find('address span').text(' as ' + this.category);
  // $newProject.find('address a').attr('href', this.url);
  // $newProject.find('section.project-body').html(this.body);
  // $newProject.find('time[pubdate]').text(this.publishedOn);
  //
  // $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  // $newProject.append('<hr>');
  // return $newProject;

  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return template(this);

};

projectData.sort(function(a,b) {
  return (new Date(b.pubDate)) - (new Date(a.pubDate));
});

projectData.forEach(function(opts) {
  allProjects.push(new Project(opts));
});

allProjects.forEach(function(a) {
  $('#articles').append(a.toHtml());
});

//practicing Ziptastic API

$(function() {
  $('#zipCode').keyup(function(e){
    e.preventDefault();
    var $zipCode = $('#zipCode').val();
    if($zipCode.length === 5 && $.isNumeric($zipCode)) {
      var requestUrl = 'http://ZiptasticAPI.com/' + $zipCode + '?callback=?';
      $.getJSON(requestUrl, null, function(data){
        console.log(data);
        if(data.city) $('#city').val(data.city);
        if(data.state) $('#state').val(data.state);
      });
    } else {
      $('#city').val('');
      $('#state').val('');
    }
  });
});
