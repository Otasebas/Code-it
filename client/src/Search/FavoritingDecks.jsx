import { useState } from "react"

function FavoritingDecks({user, deck}){
    
    const[isFavorite, setisFavorite] = useState(deck.isFavorite)

    
    function handleFavorite(){
        setisFavorite(!isFavorite)

        if (isFavorite){
            fetch(`/favorites/${deck.favorite_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        }
        else{
            fetch("/favorites",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": user.id,
                    "deck_id": deck.id
                })
              })
              .then(res => {
                // handle the response from the server here
              })
              .catch(error => {
                // handle any errors that occur during the request
              });
        }
    }
        
    return(
        <div>
            <h1>{deck.name}</h1>
                {isFavorite ? (
                    <h1 onClick={handleFavorite}>❤️</h1>
                ):(
                    <h1 onClick={handleFavorite}>♡</h1>
                )}
        </div>
    )
}

export default FavoritingDecks