class TasksController < ApplicationController
  respond_to :json
  before_filter :authenticate_user!, only: [:create, :delete]

  def create
    list = List.find(params[:list_id])
    task = list.tasks.create(task_params)
    respond_with task
  end

  def update
    task = Task.find(params[:id])
    task.text = params[:text] if params[:editText] === 1
    task.done = params[:done] if params[:editDone] === 1
    task.save
    respond_with true
  end

  def destroy
    task = Task.find(params[:id])
    task.destroy
    respond_with true
  end

  private
  def task_params
    params.require(:task).permit(:text, :datetime, :position, :done)
  end
end
