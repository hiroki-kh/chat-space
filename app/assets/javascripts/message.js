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
                  <p class="lower-message__image">
                    ${if message.image}
                  </p>
                </div>`
    return html;
  }
  $('.new_message').on('submit', function(e) {
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
      var html = buildHTML(data);
      $('#chat').append(html)
      $('.comment-form').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});
