class MessagesController < ApplicationController

  def index
    @messages = Message.all
  end

  def create
    Message.create
  end
end
