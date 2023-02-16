class DeckSerializer < ActiveModel::Serializer
  attributes :id, :name, :private, :author, :cards, :isFavorite, :favorite_id

  def author
    object.user.username
  end

  def isFavorite
    object.favorites.where(user: scope).exists?
  end

  def favorite_id
    find_favorite_id(scope, object)
  end

  private

  def find_favorite_id(user, object)
    favorite = object.favorites.where(user: user).first
    favorite.id if favorite.present?
  end
  
  # has_one :user
  has_many :cards
  # belongs_to :user
  # has_many :favorites
end
