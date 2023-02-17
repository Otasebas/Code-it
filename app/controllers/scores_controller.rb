class ScoresController < ApplicationController
    wrap_parameters format: []

    def create
        score = Score.create!(score_params)
        render json: score
    end

    def index
        all_scores = Score.all
        scores = all_scores.where(id: session[:user_id])

        render json: all_scores
    end
    
    private

    def score_params
        params.permit(:user_id, :deck_id, :score)
    end
end
