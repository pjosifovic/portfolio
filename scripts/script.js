(function(module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(e, idx, keys) {
      this[e] = opts[e];
    }, this);
  };

  Project.all = [];

  Project.prototype.toHtml = function() {
    var template = Handlebars.compile($('#article-template').text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    return template(this);
  };

  Project.loadAll = function(data) {
    data.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });
    data.forEach(function(opts) {
      Project.all.push(new Project(opts));
    });
  };

  Project.numWordsAll = function(){
    return Project.all.map(function(project){
      return project.body.match(/\b\w+/g).length;
    })
    .reduce(function(a, b) {
      console.log('in the reduce numWordsAll');
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

  Project.fetchAll = function(next) {
    if(localStorage.articles) {
      Project.loadAll(JSON.parse(localStorage.articles));
      next();
    } else {
      $.getJSON('data/projects.json', function(data) {
        Project.loadAll(data);
        localStorage.articles = JSON.stringify(data);
        next();
      });
    };
  };


  module.Project = Project;
})(window);
