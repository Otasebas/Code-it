class DecksController < ApplicationController
    wrap_parameters format: []

    def create
        deck = Deck.create!(deck_params)
        render json: deck
    end

    def destroy
        Deck.destroy
        render json: {}
    end

    def update
        deck = Deck.find_by(id: params[:id])
        deck.update(deck_params)
        render json: deck
    end

    def index
        decks = Deck.all
    new_deck = decks.where(private: false)
        render json: new_deck
    end

    def show
        deck = Deck.find_by(id: params[:id])
        render json: deck
    end
    
    private

    def deck_params
        params.permit(:name, :user_id, :private)
    end
end
