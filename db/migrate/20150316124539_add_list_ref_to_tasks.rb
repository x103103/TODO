class AddListRefToTasks < ActiveRecord::Migration
  def change
    add_reference :tasks, :list, index: true
    add_foreign_key :tasks, :lists
  end
end
