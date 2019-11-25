// Search for string.
export function markSearch(search_input) {
  // Determine selected options
  let options = {};

  $(".js-mark-results").mark(search_input, options);
}

// Get parameters from url.
let getUrlParameter = function getUrlParameter(sParam) {
  let sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
};


// @todo Optionally only perform getUrLParameter and marking on search results page.
// Get search parameter specifically.
export let search_input = getUrlParameter('search');

// Mark all occurrences of search input.
if(typeof search_input != 'undefined') {
  markSearch(search_input);
}
