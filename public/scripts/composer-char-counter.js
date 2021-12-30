$(document).ready(function() {
  const $textArea = $("#tweet-text"); // text area
  const $counter = $(".counter");
  const $wirte = $('.rightSide');
  const $toggle = $('.toggle');


  //counter limit
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

  //stretch work, show up the new-tweets
  $wirte.on("click", function() {
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').hide("slow");
    } else {
      $('.new-tweet').slideDown("slow");
    }
  });
  
  // toggle visiability
  $(window).scroll(function() {
    if ($(window).scrollTop() < 100) {
      $toggle.addClass("hidden");
    } else {
      $toggle.removeClass("hidden");
    }
  });

  //toggle to top
  $toggle.on("click", function() {
    window.scrollTo(0,0);
  });
  
});




