class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.text :text
      t.datetime :datetime
      t.integer :position
      t.boolean :done

      t.timestamps null: false
    end
  end
end
