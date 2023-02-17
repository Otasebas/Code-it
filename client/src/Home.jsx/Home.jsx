import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Home({user}){

    function postFavorite(deck_id){
        fetch("/cards",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "deck_id": deck_id
            })
        })
    }

    function deleteFavorite(id){
        fetch(`/favorites/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
    
    return(
        <div>
            {user.favorites.map(favorite =>{
                return(
                    <GameSelector deleteFavorite={deleteFavorite} postFavorite={postFavorite} key={favorite.id} favorite={favorite}/>
                )
            })}
        </div>
    )
}

export default Home

function GameSelector({favorite, postFavorite, deleteFavorite}){

    const naviagte = useNavigate()

    const[isFavorite, setisFavorite] = useState(true)

    function handleClick(){
        naviagte(`/game/${favorite.deck_id}`)
    }

    function handleFavorite(){
        setisFavorite(!isFavorite)

        if (isFavorite){
            deleteFavorite(favorite.deck_id)
        }
        else{
            postFavorite(favorite.deck_id)
        }
    }

    return(
        <div>
            <h1>{favorite.deck_name}</h1>
            <button onClick={handleClick} > Play Game </button>
            {isFavorite ? (
                <h1 onClick={handleFavorite}>❤️</h1>
            ):(
                <h1 onClick={handleFavorite}>♡</h1>
            )}
        </div>
    )
}