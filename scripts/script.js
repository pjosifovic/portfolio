(function(module){

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
      $.ajax({
        type: 'HEAD',
        url: 'data/projects.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag'); //allows us to grab eTag from xhr object
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.getAll();
          } else {
            Project.loadAll(JSON.parse(localStorage.articles));
            projectView.initIndexPage();
          }
        }

      });
    } else {
      Project.getAll();
    }
  };

  Project.getAll = function() {
    $.getJSON('data/projects.json', function(data) {
      var stringData = JSON.stringify(data);
      localStorage.setItem('articles', stringData);
      Project.loadAll(JSON.parse(localStorage.articles));
      projectView.initIndexPage();
    });
  };

  Project.numWordsAll = function(){
    return Project.all.map(function(article){
      article.body.match(/\b\w+/g).length;
      // .match() returns an array of all words. with .length we are getting rough number of words
    });
    

  };




  //practicing Ziptastic API

  $(function() {
    $('#zipCode').keyup(function(e){
      e.preventDefault();
      var $zipCode = $('#zipCode').val();
      if($zipCode.length === 5 && $.isNumeric($zipCode)) {
        var requestUrl = 'http://ZiptasticAPI.com/' + $zipCode + '?callback=?';
        $.getJSON(requestUrl, null, function(data){
          if(data.city) $('#city').val(data.city);
          if(data.state) $('#state').val(data.state);
        });
      } else {
        $('#city').val('');
        $('#state').val('');
      }
    });
  });

  module.Project = Project;
});
