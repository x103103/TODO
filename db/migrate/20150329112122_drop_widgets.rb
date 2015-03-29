class DropWidgets < ActiveRecord::Migration
  def up
    drop_table :widgets
  end
end
