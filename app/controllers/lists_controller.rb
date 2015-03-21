class ListsController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, only: [:index, :create, :delete]

  def index
    respond_with List.where("user_id = ?", current_user.id)
  end

  def create
    respond_with List.create(user_id: current_user.id)
  end

  def show
    respond_with List.find(params[:id])
  end

  def update
    list = List.find(params[:id])
    list.title = params[:title]
    list.save
    respond_with true
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    respond_with true
  end

  # private
  # def list_params
  #   params.require(:list).permit(:title)
  # end
end
