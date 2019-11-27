// Get parameters from url.
export let urlParameter = function getUrlParameter(sParam) {
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

// Set values in form from url.
$('#search-form input[name="search"]').val(urlParameter('search'));
$('#search-form input[name="title_only"]').prop('checked', urlParameter('title_only'));

if(typeof urlParameter('type') !== "undefined") {
  $('#search-form select[name="type"]').val(urlParameter('type'));
}
if(typeof urlParameter('year_from') !== "undefined") {
  $('#search-form input[name="year_from"]').val(urlParameter('year_from'));
}
if(typeof urlParameter('year_to') !== "undefined") {
  $('#search-form input[name="year_to"]').val(urlParameter('year_to'));
}

//  Perform a search.
$('#search-form').submit(function(){
  // Get form values.
  let values = $(this).serialize();
  // The checkbox serialization needs to be modified a bit.
  values = values.replace("title_only=", "title_only=TRUE");

  // Open search results in same window.
  window.open("search-results.html?" + values,"_self");

  // Prevent default form submit.
  return false;
});
