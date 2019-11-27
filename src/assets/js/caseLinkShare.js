$('.case-link-share').click(function(){
  $('.case-link').toggleClass('is-visible');
});

$('.expanded').on( "click", ".btn", function(event) {
  if(event.handled !== true) {
    let range = document.createRange();
    console.log($(this).parent().parent().find('.copy-text')[0]);
    range.selectNode($(this).parent().parent().find('.copy-text')[0]);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    event.handled = true;
  }
});
