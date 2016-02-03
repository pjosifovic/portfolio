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


projectView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#title-filter').append(optionTag);
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};



// Calling functions when DOM is ready
$(function(){
  projectView.handleMainNav();
  projectView.populateFilters();
});
