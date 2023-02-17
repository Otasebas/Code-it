class UsersController < ApplicationController
    # skip_before_action :authorize, except: :me

    def index
        user = User.all
        render json: user
    end
    
    def show
        favorites = Favorite.where(user_id: params[:id])
        fav_hash = {
          user_id: params[:id],
          favorites: favorites.map do |favorite|
            {
              author: favorite.deck.user.username,
              deck_name: favorite.deck.name,
              deck: favorite.deck,
              cards: favorite.deck.cards
            }
          end
        }
        render json: fav_hash
      end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {error: user.errors.full_messages}
        end
    end

    def me
        #more personal show will include email for example
        # user = User.find(session[:user_id])
       #comment out below for real shit 
        # user = User.find(session[:user_id])
        render json: @current_user, status: :ok
      end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
end
