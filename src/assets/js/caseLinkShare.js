// Show/hide share link box.
$('.case-link-share').click(function(){
  $('.case-link').toggleClass('is-visible');
});

// Mark and copy content of link.
$('.expanded').on( "click", ".btn", function(event) {
  if(event.handled !== true) {
    let range = document.createRange();
    range.selectNode($(this).parent().parent().find('.copy-text')[0]);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    event.handled = true;
  }
});
