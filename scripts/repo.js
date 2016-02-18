(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.get('/github/users/pjosifovic/repos', function(data, message, xhr) {
      console.log('in the repo');
      repos.all = data;
    }).done(callback);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo){
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
