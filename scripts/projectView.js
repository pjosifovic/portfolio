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

projectView.handleTitleFilter = function() {
  $('#title-filter').on('change', function() {
    if ($(this).val()) {
      var $articles = $('article');
      var $selectVal = $(this).val();
      $articles.hide();
      $articles.each( function() {
        if($(this).attr('data-title') === $selectVal) {
          $(this).show();
        }
      });

    } else {
      $('article').not('.template').each(function(){
        $(this).show();
      });
    }
    $('#category-filter').val('');
  });
};

projectView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function () {
    if($(this).val()) {
      var $articles = $('article');
      var $selectVal = $(this).val();
      $articles.hide();
      $articles.each(function(){
        if($(this).attr('data-category') === $selectVal) {
          $(this).show();
        }
      });
    } else {
      $('article').not('.template').each(function() {
        $(this).show();
      });
    };
    $('#title-filter').val('');
  });
};


// Calling functions when DOM is ready
$(function(){
  projectView.handleMainNav();
  projectView.populateFilters();
  projectView.handleTitleFilter();
  projectView.handleCategoryFilter();
});
