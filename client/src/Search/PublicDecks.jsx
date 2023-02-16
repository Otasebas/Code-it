import { useEffect } from "react"
import { useState } from "react"
import FavoritingDecks from "./FavoritingDecks"

function PublicDecks({user}){

    const[allPublicDecks, setAllPublicDecks] = useState([])
    const[userInput, setUserInput] = useState("")
    const[filteredDecks, setFilteredDecks] = useState(allPublicDecks)
    
    useEffect(()=>{
        fetch('/decks')
        .then(req => req.json())
        .then(res => {
            setAllPublicDecks(res)
            setFilteredDecks(res)
        })
    },[])

    function handleInput(e){
        setUserInput(e.target.value)
        
        setFilteredDecks(
            allPublicDecks.filter((deck) =>
              deck.name.toLowerCase().includes(userInput.toLowerCase())
            )
        )
    }

    return(
        <div>
            <div>
                <form>
                    <input onChange={handleInput} type="text" value={userInput} placeholder="Search..."></input>
                </form>
            </div>
            <div>
            {filteredDecks.map(deck=>{
                return(
                    <FavoritingDecks user={user} key={deck.id} deck={deck} />
                )
            })}
            </div>
        </div>
    )
}

export default PublicDecks