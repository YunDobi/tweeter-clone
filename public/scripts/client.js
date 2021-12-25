$(document).ready(function() {
  const $textArea = $("#tweet-text");
  const $error = $(".error");
  const $errorText = $(".error-text");
  const $counter = $(".counter");

  //randomize the icon.
  const randomIcons = () => {
    const icons = ["fas fa-cat", "fas fa-dog","fas fa-crow"];
    let icon = icons[Math.floor(Math.random() * icons.length)];
    return icon;
  };

  const createTweetElement = function(tweetData) {
    //avoid cross-site 
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let $tweet = $("<article>").addClass("tweet-container");
    let html = `<header class="tweet-header">
    <div>
      <i class="${randomIcons()}"></i>
      <span>${tweetData.user.name}</span>
    </div>
    <span class="nickname">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-body">
    <span>${escape(tweetData.content.text)}</span>
  </div>
  <footer class="tweet-footer">
    <span>${timeago.format(tweetData.created_at)} days ago</span>
    <div>
      <i class="fas fa-flag" id="emoji"></i>
      <i class="fas fa-retweet" id="emoji"></i>
      <i class="fas fa-heart" id="emoji"></i>
    </div>
  </footer>`;
    const $tweetElement = $tweet.append(html);
    return $tweetElement;
  };
  
  const renderTweets = function(tweets) {
    let newTweets = tweets.sort((a,b) => {return b.created_at - a.created_at})
    $('.tweets-container').empty();
    for (let tweet of newTweets) {
      $('.tweets-container').append(createTweetElement(tweet))
    }
  };

  const loadTweets = function() {
    $.get('/tweets')
      .then((data) => {
        console.log(data);
        renderTweets(data);
      });
  };
  loadTweets();

  $("form").submit(function(event) {
    event.preventDefault();

    //validation
    if ($textArea.val() === null || $textArea.val() === "") {
      $textArea.val("");
      $errorText.html("Can not submit empty value.");
      $error.slideDown(400);
      return false;
    } else if ($textArea.val().length > 140) {
      $textArea.val("");
      $counter[0].value = 140;
      $counter.removeClass("red");
      $errorText.html("It is over 140 character already!");
      $error.slideDown(400);
      return false;
    }

    $.post ("/tweets", $textArea.serialize(), function() {
      $error.hide();
      loadTweets();
      $textArea.val("");
    });
  });

});





