$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="main__messages__data">
          <div class="main__messages__data__who">
            ${message.user_name}
          </div>
          <div class="main__messages__data__when">
            ${message.created_at}
          </div>
        </div>
        <div class="main__messages__message">
          ${message.content}
        </div>
        <img class="lower-message__image" src=${message.image}>
      </div>`
    return html;
  } else {
    var html =
      `<div class="main__messages__data">
          <div class="main__messages__data__who">
            ${message.user_name}
          </div>
          <div class="main__messages__data__when">
            ${message.created_at}
          </div>
        </div>
          <div class="main__messages__message">
            ${message.content}
        </div>`
      return html;
    };
  }
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
})
});