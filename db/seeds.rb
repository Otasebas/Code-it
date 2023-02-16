# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

seb = User.create(username:"seb", password: "123", email: "seb@gmail.com")
tucker = User.create(username:"tucker", password: "123", email: "tucker@gmail.com")
alejandro = User.create(username:"alejandro", password: "123", email: "alejandro@gmail.com")

javascript = Deck.create(name: "javascript", user_id: seb.id, private: true)
ruby = Deck.create(name: "ruby", user_id: seb.id, private: false)
javascriptr = Deck.create(name: "javascript", user_id: seb.id, private: true)
rubyr = Deck.create(name: "ruby", user_id: seb.id, private: false)
javascriptrr = Deck.create(name: "javascript", user_id: seb.id, private: true)
rubyrr = Deck.create(name: "ruby", user_id: seb.id, private: false)
javascriptrrr = Deck.create(name: "javascript", user_id: seb.id, private: true)
rubyrrr = Deck.create(name: "ruby", user_id: seb.id, private: false)

card1 = Card.create(content: "console.log", deck_id: javascript.id)
card2 = Card.create(content: ".foreach()", deck_id: javascript.id)
card3 = Card.create(content: "puts", deck_id: ruby.id)
card4 = Card.create(content: "private", deck_id: ruby.id)
card5 = Card.create(content: "console.log", deck_id: javascriptr.id)
card6 = Card.create(content: ".foreach()", deck_id: javascriptr.id)
card7 = Card.create(content: "puts", deck_id: rubyr.id)
card8 = Card.create(content: "private", deck_id: rubyr.id)
card9 = Card.create(content: "console.log", deck_id: javascriptrr.id)
card10 = Card.create(content: ".foreach()", deck_id: javascriptrr.id)
card11 = Card.create(content: "puts", deck_id: rubyrr.id)
card12 = Card.create(content: "private", deck_id: rubyrr.id)

Favorite.create(user_id: tucker.id, deck_id: javascript.id)
Favorite.create(user_id: tucker.id, deck_id: ruby.id)
Favorite.create(user_id: alejandro.id, deck_id: javascript.id)
Favorite.create(user_id: alejandro.id, deck_id: ruby.id)
Favorite.create(user_id: seb.id, deck_id: javascript.id)
Favorite.create(user_id: seb.id, deck_id: ruby.id)
