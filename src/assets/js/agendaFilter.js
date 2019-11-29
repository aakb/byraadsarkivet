// Import exported functions and variables from other custom js files.
import {urlParameter} from "MyAssets/js/search";

if(typeof urlParameter('year') !== "undefined") {
  $('#agenda-form input[name="year"]').val(urlParameter('year'));
}
if(typeof urlParameter('sort') !== "undefined") {
  $('#agenda-form select[name="sort"]').val(urlParameter('sort'));
}

function reloadPage(values) {
  let type = urlParameter('type');
  console.log(type);
  window.open("search-results-agendas.html?type=" + type + "&" + values,"_self");
}

$('#year').keypress(function (e) {
  if (e.which == 13) {
    reloadPage($('#agenda-form').serialize());
    return false;
  }
});

$(function(){
  $("#sort").change(function(){
    reloadPage($('#agenda-form').serialize());
  });
});
