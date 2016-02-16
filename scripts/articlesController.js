(function(module) {
  var articlesController = {};

  articlesController.index = function() {
    Project.fetchAll(projectView.initIndexPage);
    $('main > section').hide();
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
