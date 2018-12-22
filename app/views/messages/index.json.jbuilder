json.messages @messages.each do |message|
  json.content message.content
  json.user_name message.user.name
  json.created_at message.created_at
  json.image message.image
  json.id message.id
end
