Rails.application.routes.draw do
  
  resources :favorites, only: [:index, :show, :create, :destroy]
  resources :follows, only: [:create, :destroy]
  resources :scores, only: [:create, :index]
  resources :cards, only: [:create, :destroy, :update]
  resources :decks
  resources :users
  # # Routing logic: fallback requests for React Router.
  # # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/profile", to: "users#me"
end
