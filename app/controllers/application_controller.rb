class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  
  before_action :authorize
  # skip_before_action :authorize, only: [:render_not_found, :render_unprocessable_entity_response]
  
  private
  
  def authorize
    @current_user = User.find_by(id: session[:user_id])
    p session
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end

  def render_not_found(exception)
    render json: { error: "#{exception} not found"}, status: :not_found
  end

  # def current_user
  #   @current_user ||= User.find_by(id: session[:user_id])
  # end
end
