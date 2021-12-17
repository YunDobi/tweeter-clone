$(document).ready(function() {
  const $textArea = $("#tweet-text"); // text area
  const $counter = $(".counter");
  const $wirte = $('#Write');


  $textArea.on('input', function() {
    const currentCount = 140 - ($(this).val().length);
    $counter[0].value = currentCount;
    if (currentCount < 0) {
      $counter.addClass("red");
    }
    if (currentCount >= 0) {
      $counter.removeClass("red");
    }
  });

  $wirte.on("click", function() {
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').hide("slow");
    } else {
      $('.new-tweet').slideDown("slow");
    }
  });
});




