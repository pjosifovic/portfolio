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

  Project.fetchAll = function(next) {
    if(localStorage.articles) {
      console.log('if theres a local');
      // Project.loadAll(JSON.parse(localStorage.rawData));
      // next();
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
