import { useState } from "react"
import IndividualDecks from "./IndividualDecks"

function CreateDeck({user}){
    
    const[decks, setDecks] = useState(user.decks)

    const[isCreatingDeck, setIsCreatingDeck] = useState(false)

    const[userInput, setUserInput] = useState("")

    function handleChange(e){
        setUserInput(e.target.value)
    }

    function handleClick(){
        setIsCreatingDeck(!isCreatingDeck)
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch("/decks",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": userInput,
                "user_id": user.id,
                "private": true
            })
        })
        .then(req => req.json())
        .then(res => {
            setDecks([...decks, res])
            setUserInput("")
        })
    }
    
    return(
        <div>
            <button onClick={handleClick} > Create Set </button>
            {isCreatingDeck ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name of New Set
                        <input onChange={handleChange} type="text" name="email" value={userInput}/>
                    </label>
                    <br />
                <button type="submit"> Add Set </button>
                </form>
            ):(
                null
            )}
            {decks.map((deck) =>{
                return(
                    <IndividualDecks decks={decks} setDecks={setDecks} key={deck.id} deck={deck}/>
                )
            })}
        </div>
    )
}

export default CreateDeck