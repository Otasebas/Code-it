import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function Game({ user }) {
    const { id } = useParams();
  
    const [deck, setDeck] = useState([]);
  
    useEffect(() => {
      fetch(`/decks/${id}`)
        .then((req) => req.json())
        .then((res) => {
            setDeck(res.cards.map((card) => card.content))
        });
    }, [id]);
  
    function postScore(score) {
      fetch("/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          deck_id: id,
          score: score,
        }),
      })
        .then((req) => req.json())
        .then();
    }
  
    return (
    <TypeParent postScore={postScore} deck={deck} />
    );
  }
  function TypeParent({ postScore, deck }) {
    
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [words, setWords] = useState(["seb", "tuck", "alej"]);
    // const [letterMatched, setLetterMatched] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [errorsCount, setErrorsCount] = useState(0);
    const [isDone, setIsDone] = useState(false);
    
    function handleChange(e) {
        const input = e.target.value;
        const currentWord = words[currentWordIndex];
  
      // match last letter from current word and input word
      if (currentWord[input.length - 1] === input[input.length - 1]) {
        // setLetterMatched(true);
        setInputValue(e.target.value);
  
        // if input value equals current value go to next word
        if (currentWord === input) {
          setCurrentWordIndex(currentWordIndex + 1)
          setInputValue("");
  
          // check if current word is last of words
          if (currentWordIndex === words.length - 1) {
            setCurrentWordIndex(0);
            setIsDone(true);
            postScore(deck.length - errorsCount);
          }
        }
      } 
      else {
        // if last letters not matched modify letterMatched to false
        if (errorsCount === 10) {
          gameOver();
        } else {
        //   setLetterMatched(false);
        //   setInputValue(e.target.value);
          setErrorsCount(errorsCount + 1);
        }
      }
    }
    
        // function restart() {
        //   setCurrentWordIndex(0);
        //   setWords(deck);
        // //   setLetterMatched(false);
        //   setInputValue("");
        //   setIsDone(false);
        //   setErrorsCount(0);
        // }
    
        function gameOver() {
        setIsDone(true);
        setCurrentWordIndex(0);
        setWords(["Your done!"])
        postScore(0);
        }
  
        // const errorBarStyles = { width: `${(errorsCount / 10) * 100}%` };
        const na = [words[currentWordIndex]];
        
        const modifiedValue = na.map((letter, index) => {
        return letter === inputValue[index] ? (
            <span className= "highlighted" key={index}>
            {letter}
            </span>
        ) : (
            <span key={index}>{letter}</span>
        );
        });
    
        return (
            <div className="wrapper">
                <div className="wrapper-input">
                    {isDone ? (
                        null
                    ) : (
                        <div>
                            <h2 className="current-word">{modifiedValue}</h2>
                            <input
                                type="text"
                                placeholder="type here"
                                onChange={handleChange}
                                value={inputValue}
                            />
                        </div>
                    )}
                    <div>
                        {isDone || errorsCount >= 10 ? (
                                <h1> {errorsCount} </h1>
                            ) : (
                                null
                            )}
                    </div>
                </div>
        </div>
        );
  }
  
export default Game