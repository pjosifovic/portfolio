(function(module) {
  var repoView = {};

  var clearList = function() {
    var $about = $('#about');
    $about.find('ul').empty();
    $about.show();
  };

  var render = function(repo) {
    return $('<li>').html('<a href="' + repo.html_url + '" target="_blank">' + repo.name + '</a>' + ', created on: ' + repo.created_at.slice(0,10));
  };

  repoView.index = function(repo) {
    clearList();
    $('#about ul').append(
      repos.with('id').map(render)
    );
  };

  module.repoView = repoView;
})(window);
