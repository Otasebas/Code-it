class CreateDecks < ActiveRecord::Migration[6.1]
  def change
    create_table :decks do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :private

      t.timestamps
    end
  end
end
