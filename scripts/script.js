

  function Project (opts) {
    this.title = opts.title;
    this.url = opts.url;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
    this.category = opts.category;
  };

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
      return article.body.match(/\b\w+/g).length;
      // .match() returns an array of all words. with .length we are getting rough number of words
    })
    .reduce(function(a, b){
      return a + b;
    });
  };

  Project.allTitles = function() {
    return Project.all.map(function(proj){
      return proj.title;
    })
    .reduce(function(prev, cur){
      if(prev.indexOf(cur) === -1){
        prev.push(cur);
      }
      return prev;
    },[]);
  };

  Project.numWordsPerTitle = function() {
    return Project.allTitles().map(function(title){
      return {
        titleName: title,
        totalWords: Project.all.filter(function(proj){
          return proj.title === title;
        })
        .map(function(article){
          return article.body.match(/\b\w+/g).length;
        })
        .reduce(function(a, b){
          return a + b;
        })
      };
    });
  };
