$(function() {
  function buildHTML(message){
    var html = `<div class="comment__member">
                  ${message.user_name}
                </div>
                <div class="comment__time">
                  ${message.created_at}
                </div>
                <div class="comment__text">
                  <p class="message_content">
                    ${message.content}
                  </p>
                </div>`
    return html;
  }
  function buildImageHTML(message){
    var html = `<div class"comment__member">
                  ${message.user_name}
                </div>
                <div class="comment__time">
                  ${message.created_at}
                </div>
                <div class="comment__text">
                  <p class="message_content">
                    ${message.content}
                  </p>
                  <p class="lower-message__image">
                    <img src="${message.image.url}">
                  </p>
                </div>`
    return html;
  }
  $('#new_comment').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      if (data.image.url == null) {
        var html = buildHTML(data);
      }
      else {
        var html = buildImageHTML(data);
      }
      $('#chat').append(html)
      $('.comment-form').val('');
      $('#chat').animate({scrollTop:$('#chat')[0].scrollHeight});
      $('.send-button').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});

