import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"

function Game({user}){

    //id of the webpage
    const {id} = useParams()
    
    //useState for deck
    const[deck, setDeck] = useState({})

    //fetch for the deck based on id
    useEffect(()=>{
        fetch(`/decks/${id}`)
        .then(req => req.json())
        .then(res => setDeck(res))
    },[id])

    //function to post score to score table with id, score and user.id
    function postScore(score){
        fetch("/scores",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "deck_id": id,
                "score": score
            })
        })
        .then(req => req.json())
        .then()
    }

    return(
        <TypeParent postScore={postScore} cards={deck.cards}/>
    )
}

function TypeParent({cards, postScore}){

    //Array of questions
    const[questionArray, setQuestionArray] = useState(cards)

    //index of the question array
    const[questionCount, setQuestionCount] = useState(0)

    //score
    const[score, setScore] = useState(0)
    
    return(
        <TypeIt 
            postScore={postScore} 
            score={score} 
            setScore={setScore}  
            setQuestionArray={setQuestionArray} 
            setQuestionCount={setQuestionCount} 
            questionCount={questionCount}  
            questionArray={questionArray}
            question={questionArray[questionCount]}
        />
    )
}



function TypeIt({ postScore, score, setScore, question, questionArray, setQuestionArray, setQuestionCount, questionCount}){

    //useStates

    const[mistakeCount, setMistakeCount] = useState([])

    const[arrayOfMistakes, setArrayOfMistakes] = useState([])

    const[answer, setAnswer] = useState("")

    const[isWrong, setIsWrong] = useState(false)

    const maxAttempts = 3

    let key = ""

    //functions

    //when user types
    function handleInput(e){
        if(key !== "enter"){
            setAnswer(e.target.value)
        
            if(key !== "backspace" && question !== false){
                const userInput = e.target.value
        
                checkLetter(userInput)

                somethingIsWrong(userInput)
                
                correctAnswer(userInput)
                
                incorrectAnswer(maxAttempts)
                

                if(questionCount+1 === questionArray.length && userInput === question.content){
                    replaceQuestionArray()
                }

                if(questionCount+1 === questionArray.length && arrayOfMistakes === [] && userInput === question.content){
                    postScore(score)
                }
            }
        }
        else{
            setQuestionCount(questionCount+1)
        }
    }
    
    //Check each individual letter to return true or false
    //if false add to mistake counter
    function checkLetter(userAnswer){

        const indexNum = userAnswer.length-1
        if(userAnswer[indexNum] === question.content[indexNum]){
            return true
        }
        else{
            setMistakeCount([...mistakeCount, userAnswer[indexNum]])
            return false
        }
    }

    //checks if the whole user input is included in the answer
    //to check if anything is wrong so far
    //sets something is wrong to true or false telling the user smthg is wrong\
    //not necesary for loop
    function somethingIsWrong(userAnswer){
        if(question.content.includes(userAnswer)){
            setIsWrong(false)
            return true
        }
        else{
            setIsWrong(true)
            return false
        }
    }

    //checks if queston and answer is the exact same
    //move to next in array
    //increase score
    //empty mistake array
    function correctAnswer(userInput){
        
        if (userInput === question.content){
            setQuestionCount(questionCount+1)
            setAnswer("")
            setScore(score+1)
            setArrayOfMistakes([])
        }
    }

    //checks how many mistakes have been made add 
    //question to mistake array, increace array counter
    //reset answer remove smthg is wrong, and set mistake counter to 0
    function incorrectAnswer(maxAttempts){
        if(mistakeCount.length+1 === maxAttempts){
            setArrayOfMistakes([...arrayOfMistakes, question])
            setQuestionCount(questionCount+1)
            setAnswer("")
            setIsWrong(false)
            setMistakeCount([])
        }
    }

    //defines keyboard keys typed
    function handleKeyDown(e){
        if(e.key === "Backspace"){
            key='backspace'
        }
        else if(e.key === "Enter"){
            key="enter"
        }
        else{
            key=""
        }
    }

    //replaces array with mistake array once done with all questions.
    function replaceQuestionArray(){
    
        if(arrayOfMistakes.length === 0){
            console.log("Great Job!")
        }
        else{
            setQuestionArray(arrayOfMistakes)
            setQuestionCount(0)
            setArrayOfMistakes([])
        }
    }

    return(
        <div>
             <div>
                {question ? (
                    <p id="question" >{question.content}</p>
                ):(
                    null
                )}
                <p id="score" >{score}</p>
                 {isWrong ?(
                    <p>Something Is Wrong!</p>
                 ):(
                    null
                 )}
             </div>
             <div>
                 <textarea 
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    value={answer}>
                 </textarea>
             </div>
        </div>
    )
}

export default Game