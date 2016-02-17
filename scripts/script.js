(function(module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(e, idx, keys) {
      this[e] = opts[e];
    }, this);
  };

  Project.all = [];

  Project.loadAll = function(data) {
    Project.all = data.map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function(next) {
    if(localStorage.articles) {
      Project.loadAll(JSON.parse(localStorage.articles));
      next();
    } else {
      $.getJSON('data/projects.json', function(data) {
        localStorage.articles = JSON.stringify(data);
        Project.loadAll(data);
        next();
      });
    };
  };

  module.Project = Project;
})(window);
