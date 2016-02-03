var projectView = [];

projectView.handleMainNav = function(){
  $('.main-nav .tab').on('click', function(){
    var $tabContent = $('.tab-content');
    var $dataContent = $(this).attr('data-content');
    $tabContent.hide();
    $tabContent.filter('#' + $dataContent).show();
  });

  $('.main-nav .tab:first').click();
};

// Calling functions when DOM is ready
$(function(){
  projectView.handleMainNav();
});
