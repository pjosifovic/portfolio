(function(module){

  var projectView = {};

  projectView.handleMainNav = function(){
    $('.main-nav .tab').on('click', function(){
      var $tabContent = $('.tab-content');
      var $dataContent = $(this).attr('data-content');
      $tabContent.hide();
      $tabContent.filter('#' + $dataContent).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  projectView.populateFilters = function() {
    $('article').each(function() {
      // if(!$(this).hasClass('.template')){
      val = $(this).attr('data-title');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#title-filter option[value="' + val + '"]').length === 0) {
        $('#title-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
      // }
    });
  };

  projectView.handleTitleFilter = function() {
    $('#title-filter').on('change', function () {
      // console.log('selected Val ' + $(this).val());
      if($(this).val()) {
        var $articles = $('article');
        var $selectVal = $(this).val();
        $articles.hide();
        $articles.each(function(){
          if($(this).attr('data-title') === $selectVal) {
            $(this).fadeIn();
          }
        });
      } else {
        $('article').each(function() {
          $(this).fadeIn();
        });
      };
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
            $(this).fadeIn();
          }
        });
      } else {
        $('article').each(function() {
          $(this).fadeIn();
        });
      };
      $('#title-filter').val('');
    });
  };

  projectView.initIndexPage = function() {
    Project.all.forEach(function(a){
      $('#articles').append(a.toHtml());
    });
    projectView.handleMainNav();
    projectView.populateFilters();
    projectView.handleTitleFilter();
    projectView.handleCategoryFilter();
  };
  module.projectView = projectView;
});
