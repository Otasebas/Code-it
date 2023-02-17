import { useState } from "react";

function Login({setUser}){

    const[isSignUp, setIsSignUp] = useState(false)

    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[email, setEmail] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    function handleClick(){
        setIsSignUp(!isSignUp)
    }

    function handlePost(e){
        
        e.preventDefault()

        fetch("/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "password_confirmation": confirmPassword,
                "email": email
            })
        })
        .then(req => req.json())
        .then(res => {

            fetch("/favorites",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": res.id,
                    "deck_id": 1
                })
            })
            setUser(res)
            fetch("/favorites",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_id": res.id,
                    "deck_id": 2
                })
            })
            setUser(res)

        })

        
    }

    function handleLogin(e){
        e.preventDefault()
        fetch("/login",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(req => req.json())
        .then(res => setUser(res))
    }

    return(
    <div>
        {isSignUp ? (
            
            <form onSubmit={handlePost}>
            <label>
                Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
        <br />
            <label>
                Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
        <br />
            <label>
                Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
        <br />
        <label>
                Confrim Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
        <br />
        <button type="submit">Login</button>
    </form>

        ):(
            
         <form onSubmit={handleLogin}>
                <label>
                    Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
            <br />
                <label>
                    Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
            <br />
            <button type="submit">Login</button>
        </form>

        )}

        <h1 onClick={handleClick} >Don't have an account? sign up here!</h1>
    </div>
    )
}

export default Login;