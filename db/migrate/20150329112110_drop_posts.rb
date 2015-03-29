class DropPosts < ActiveRecord::Migration
  def up
    drop_table :posts
  end
end
