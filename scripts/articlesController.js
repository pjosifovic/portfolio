(function(module) {
  var articlesController = {};

  articlesController.index = function() {
    $('main > section').hide();
    Project.fetchAll(projectView.initIndexPage);
    $('#articles').show();
  };

  module.articlesController = articlesController;
})(window);
