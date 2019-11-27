// Import exported functions and variables from other custom js files.
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
      // Look for matching id.
      for(let key in data.cases) {
        let value = data.cases[key];
        if (value.id === id) {
          // Create output.
          html+='<div class="expanded-inner">';
          html+='<div class="case-link"><div class="case-link-inner form-row"><span class="copy-text">' + value.url + '</span><div class="mx-auto"><div class="mt-2 mx-auto btn btn-primary">Kopiér link</div></div></div></div>';
          html+='<div>' + value.description + '</div>';
          html+='<h3>Sagens forløb</h3>';
          // Add decisions.
          for(let decision_key in value.decisions) {
            let decision = value.decisions[decision_key];
            html+='<a href="'+decision.url+'">'+decision.date+' '+decision.forum+'</a>';
            html+='<div>'+decision.description+'</div>';
          }
          // Add case id.
          html+='<h3>Sagsnummer</h3>';
          html+='<div>' + value.id + '</div>';
          // Add files.
          html+='<h3>Filer</h3>';
          for(let file_key in value.files) {
            let file = value.files[file_key];
            html+='<div><a href="'+file.url+'">'+file.label+'</a></div>';
          }
          html+='</div>';
        }
      }
      $('[data-case-id="'+id+'"] + .expanded').append(html);
      // Rerun marking on new html.
      markSearch(search_input);
    }
  });
}

// Do stuff when a case is clicked.
$('.search-result').click(function(){
  if ($(this).data("case-id")) {
    if($(this).parent().hasClass('is-open')) {
      $(this).parent().removeClass('is-open');
      $(this).parent().find('.expanded-inner').remove();
      $('.expanded[data-case-id="'+$(this).data("case-id")+'"] .case-link-share').removeClass('is-visible');
      $(this).find('.fa-minus').addClass('fa-plus').removeClass('fa-minus');
    }
    else {
      $(this).parent().addClass('is-open');
      expandResult($(this).data("case-id"));
      $('.expanded[data-case-id="'+$(this).data("case-id")+'"] .case-link-share').addClass('is-visible');
      $(this).find('.fa-plus').addClass('fa-minus').removeClass('fa-plus');
    }
  }
});
