$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
      var html =
      `<div class="main__messages__data" data-message-id=` + message.id + `>` +
          `<div class="main__messages__data__who">` +
            message.user_name +
          `</div>` +
          `<div class="main__messages__data__when">` +
            message.created_at +
          `</div>` +
        `</div>`
        `<p class="main__messages__message">` +
            message.content +
            `</p>` +
        `<img src"` + message.image + `"class="lower-message__image" >` +
      `</div>` +
    `</div>` 
  } else if (message.content) {
    var html =
      `<div class="main__messages__data" data-message-id=` + message.id + `>` +
          `<div class="main__messages__data__who">` +
            message.user_name +
          `</div>` +
          `<div class="main__messages__data__when">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<p class="main__messages__message">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      `<div class="main__messages__data" data-message-id=` + message.id + `>` +
        `<div class="main__messages__data__who">` +
          message.user_name +
      `</div>` +
      `<div class="main__messages__data__when">` +
        message.created_at +
      `</div>` +
    `<img src"` + message.image + `"class="lower-message__image" >` +
  `</div>` +
`</div>` 
  };
  return html;
};

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__messages').append(html);      
      $('form')[0].reset();
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      $('.form__send').attr('disabled');
    })
    .fail(function(){
      alert('error');
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.main__messages__data:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main__messages').append(insertHTML);
      $('.main__messages').animate({ scrollTop: $('.main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});