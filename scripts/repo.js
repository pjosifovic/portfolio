(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(cb) {
    $.ajax('/github/users/pjosifovic/repos' + '?per_page=4&sort=updated',
      function(data, message, xhr) {
        repos.all = data;
      }).done(cb);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo){
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
