$(function() {
  function buildHTML(message){
    var image = (message.image.url) ? `<img src="${message.image.url}">`:"";
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
                  ${image}
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
      var html = buildHTML(data);
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
      var last_id = $('.comment').filter(":last").data('messageId');
    $.ajax({
      type: 'GET',
      url: location.href,
      contentType: false,
      dataType: 'json',
      data: { last_id: last_id},
    })
    .done(function(messages){
      messages.forEach(function(message){
        $('#chat').append(buildHTML(message));
        $('#chat').animate({scrollTop:$('#chat')[0].scrollHeight});
      });
    })
    .fail(function(json){
      alert('自動更新に失敗しました');
    })
  } else {
    clearInterval(interval);
  }}, 5000);
});

