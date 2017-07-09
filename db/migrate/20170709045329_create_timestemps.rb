class CreateTimestemps < ActiveRecord::Migration[5.0]
  def change
    create_table :timestemps do |t|
      t.string :time, default: ''
      t.integer :counter, default: 0
      t.timestamps
    end
  end
end
