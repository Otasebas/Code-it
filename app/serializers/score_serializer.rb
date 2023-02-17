class ScoreSerializer < ActiveModel::Serializer
  attributes :score, :deck_name, :user_id, :deck_id
  # has_one :user
  # has_one :deck

  def user_id
    object.user.id
  end

  def deck_name
    object.deck.name
  end

  def deck_id
    object.deck.id
  end
end
