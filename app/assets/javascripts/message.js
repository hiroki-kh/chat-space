$(function() {
  function buildHTML(message){
    var html = `<div class="comment", data-message-id="${message.id}">
                <div class="comment__member">
                  ${message.user_name}
                </div>
                <div class="comment__time">
                  ${message.created_at}
                </div>
                <div class="comment__text">
                  <p class="message_content">
                    ${message.content}
                  </p>
                </div>
                </div>`
    return html;
  }
  function buildImageHTML(message){
    var html = `<div class="comment", data-message-id="${message.id}">
                <div class"comment__member">
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
                </div>
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

  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var id = $('.comment:last').data('messageId');
    $.ajax({
      type: 'GET',
      url: location.href,
      contentType: false,
      dataType: 'json',
      data: { id: id},
    })
    .done(function(messages){
      console.log(messages);
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML += buildHTML(message);
      });
      $('#chat').append(insertHTML);
      $('#chat').animate({scrollTop:$('#chat')[0].scrollHeight});
    })
    .fail(function(json){
      alert('自動更新に失敗しました');
    })
  } else {
    clearInterval(interval);
  }}, 5000);
});

