import './App.css';
import { useEffect,useState } from 'react';
import Login from './Logins/Signups/Login';
import Home from './Home.jsx/Home';
import Header from './Home.jsx/Header';
import CreateDeck from './Decks.jsx/CreateDecks';
import Game from './Game/Game';
import Cards from './Decks.jsx/Cards';
import Score from './Game/Score';
import PublicDecks from './Search/PublicDecks';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch(`/profile`)
      .then((res) => {
        if (res.ok) {
          res.json().then((session) => setUser(session))
        } 
        else {
          setUser(null);
        }
      });
  }, []);

    const router = createBrowserRouter([
      {
        path:"/*",
        element: <h1>404 not found</h1>
      },
      {
        path: "/",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <Home user={user}/>
                </div>
      },
      {
        path:"/createDecks",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <CreateDeck user={user}/>
                </div>
      },
      {
        path:"/cards/:id",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <Cards />
                </div>
      },
      {
        path: "/game/:id",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <Game user={user}/>
                </div>
      },
      {
        path: "/score",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <Score user={user} />
                </div>
      },
      {
        path: "/public",
        element: <div>
                  <Header setUser={setUser} user={user}/>
                  <PublicDecks user={user} />
                </div>
      },
    ]);
  
  return (
    <div className="App">
      {user ? (
        <RouterProvider router={router} />
      ):(
        <Login setUser={setUser}/>
      )}
      
    </div>
  );
}

export default App;
