import { useNavigate } from "react-router-dom";

function Header({user, setUser}){
    
    const navigate = useNavigate()

    function handleLogOut(){
        setUser(null)
        fetch(`/logout`,{ method: 'DELETE' })
          .then(req => req.json())
          .then(res => console.log(res))
          .catch(error => console.error("Error:", error));
    }

    function handleDecks(){
        navigate("/createDecks")
    }

    function handleFavorites(){
        navigate("/")
    }

    function handleScores(){
        navigate("/score")
    }
    
    return(
        <div className = "navbar">
            <img className = "nav-logo" alt = "empty array" src="https://blog.soliditylang.org/img/avatar-icon.png" onClick={(navigate("/"))}/>
            <button  > Public </button>
            <button  > Following </button>
            <button onClick={handleFavorites} > Favorites </button>
            <button onClick={handleDecks} > Create Decks </button>
            <button onClick={handleScores} > Personal Scores </button>
            <button onClick={handleLogOut} > Log Out </button>
        </div>
    )
}

export default Header