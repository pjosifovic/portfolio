(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').show();

    repos.requestRepos(repoView.index);
  };
  module.aboutController = aboutController;
})(window);
