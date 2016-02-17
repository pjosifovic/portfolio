(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(cb) {
    $.ajax({
      url: 'https://api.github.com/users/pjosifovic/repos' + '?per_page=4&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken},
      success: function(data, message, xhr) {
        repos.all = data;
      }
    }).done(cb);
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo){
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
