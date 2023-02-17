import { useNavigate } from "react-router-dom"
import { useState } from "react"

function IndividualDecks({deck, setDecks, decks}){

    const navigate = useNavigate()

    const[isPrivate, setIsPrivate] = useState(deck.private)

    function handleClick(){
        navigate(`/cards/${deck.id}`)
    }

    function handleDelete(){
        if(window.confirm("Are you sure you want to delete")){
            fetch(`/decks/${deck.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res=>res.json())
            .then(()=>{
                setDecks(
                    decks.filter((oneSet =>{
                        return (oneSet.id !== deck.id)
                    }))
                )
            })
        }
    }

    function handlePrivate(){

        fetch(`/decks/${deck.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "private": !isPrivate
            })
        })
        .then(req => req.json())
        .then(()=>{
            setIsPrivate(!isPrivate)
        })
    }

    return(
        <div id="eachSet">
        <h1>{deck.name}</h1>
        <button onClick={handleClick} > Add Cards </button>
        <button onClick={handleDelete}> Delete Set </button>
        <button onClick={handlePrivate}> {isPrivate ?("Set is Private"):("Set is Public")} </button>
    </div>
    )
}

export default IndividualDecks