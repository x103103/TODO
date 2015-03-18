class TasksController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, only: [:create, :delete]

  def create
    list = List.find(params[:list_id])
    task = list.tasks.create(task_params)
    respond_with list, task
  end

  def delete
    list = List.find(params[:list_id])
    task = list.tasks.find(params[:id])
    task.delete_all
  end

  private
  def task_params
    params.require(:task).permit(:text, :datetime, :position)
  end
end
