// Apply test data.
function init() {
  var html='';
  $.ajax({
    dataType: "json",
    url: "./assets/example_data/cases.json",
    success: function (data) {
      for(var key in data) {
        var value = data[key];
        html+='<div>'+key+':'+value+'</div>'
      }
      $("#movie-data").append(html);

    }
  });
}
init();
