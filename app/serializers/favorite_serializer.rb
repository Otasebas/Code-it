class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :author, :deck_name, :username, :deck_id
  # has_one :user
  # has_one :deck
  def author
    object.deck.user.username
  end
  
  def deck_name
    object.deck.name
  end

  def deck_id
    object.deck_id
  end

  def username
    object.user.username
  end

end
