import {markSearch} from "MyAssets/js/markResults";
import {search_input} from "MyAssets/js/markResults";

// Expand result with ajax.
function expandResult(id) {
  // Define output variable.
  let html='';
  $.ajax({
    dataType: "json",
    url: "./assets/example_data/cases.json",
    success: function (data) {
      for(let key in data.cases) {
        let value = data.cases[key];
        if (value.id === id) {
          html+='<div class="expanded-inner">';
          html+='<div>' + value.description + '</div>';
          html+='</div>';
        }
      }
      $('[data-case-id="'+id+'"] + .expanded').append(html);
      markSearch(search_input);
    }
  });
}

$('.search-result').click(function(){
  if ($(this).data("case-id")) {
    if($(this).parent().hasClass('is-open')) {
      $(this).parent().removeClass('is-open');
      $(this).parent().find('.expanded-inner').remove();
      $(this).find('.fa-minus').addClass('fa-plus').removeClass('fa-minus');
    }
    else {
      $(this).parent().addClass('is-open');
      expandResult($(this).data("case-id"));
      $(this).find('.fa-plus').addClass('fa-minus').removeClass('fa-plus');
    }
  }
});
