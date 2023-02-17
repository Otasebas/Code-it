import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Score({user}){
    
    const navigate = useNavigate()

    const[scores, setScores] = useState([])

    function handleClick(id){
        navigate(`/game/${id}`)
    }

    useEffect(()=>{
        fetch(`/scores/`)
        .then(res=>res.json())
        .then(req=> setScores(req))
    },[user.id])

    return (
        <div>
            {scores.map(score =>{
                return(
                    <div key={score.id}>
                        <div>{score.score} : {score.deck_name}</div>
                        <button onClick={()=> handleClick(score.deck_id)} > Play Again? </button>
                    </div>
                )
            })}
        </div>
    )
}
    

export default Score