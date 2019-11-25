//  Perform a search.
$('#search-form').submit(function(){
  // Get form values.
  var values = $(this).serialize();

  // Opren search results in same window.
  window.open("search-results.html?" + values,"_self");

  // Prevent default form submit.
  return false;
});
