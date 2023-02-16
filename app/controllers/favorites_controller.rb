class FavoritesController < ApplicationController
    wrap_parameters format: []
    skip_before_action :authorize

    def create
        favorite = Favorite.create!(favorite_params)
        render json: favorite
    end

    def destroy
        favorite = Favorite.find_by(id: params[:id])
        favorite.destroy
        render json: {}
    end

    def show
        all_favorite = Favorite.all
        favorite = all_favorite.where(user_id: params[:user_id])

        render json: favorite
    end

    def index
        favorite = Favorite.all
        render json: favorite
    end
    
    private

    def favorite_params
        params.permit(:user_id, :deck_id)
    end

end
