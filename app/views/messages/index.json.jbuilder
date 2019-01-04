json.array! @new_message.each do |message|
  json.content message.content
  json.user_name message.user.name
  json.created_at message.created_at.strftime("%Y/%m/%d %-H:%-M:%-S")
  json.image message.image
  json.id message.id
end
