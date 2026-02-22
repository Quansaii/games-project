import { useEffect, useState } from "react";
import { getRandomNumber } from "./getRandomId";
import { Link, useNavigate } from "react-router"; 

export function HomePage({ onUpdate }) {
  const navigate = useNavigate();
  const key = import.meta.env.VITE_API_KEY;

  const [randomGames, setRandomGames] = useState([]);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getRandomGames = async () => {
      try {
        const url = "https://api.rawg.io/api/games/";
        
        const gameIds = [getRandomNumber(), getRandomNumber(), getRandomNumber()];
        const promises = gameIds.map(id => fetch(`${url}${id}?key=${key}`));
        
        const responses = await Promise.all(promises);

        const data = await Promise.all(
          responses.map(async (res) => {
            if (!res.ok) return null; 
            return res.json();
          })
        );
        setRandomGames(data.filter(game => game !== null));
      } catch (error) {
        console.error("Fetch error:", error);
        setIsError(true);
      }
    };

    getRandomGames();
  }, [key]); 


  const searchGame = () => {
    if (inputValue.trim()) {
      setQuery(inputValue);
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        const url = `https://api.rawg.io/api/games?search=${query}&key=${key}`;
        const response = await fetch(url);
        const result = await response.json();

        onUpdate(result.results); 
        
        navigate('/detailed', { state: { game: result.results[0] } });
      } catch (error) {
        console.error("Search error:", error);
      }
    };

    fetchData();
  }, [query, key, navigate, onUpdate]);

  return (
    <>
      <header className="container">
        <div className="logo">
          GAME<span>BASE</span>
        </div>

        <form className="search-section" onSubmit={(e) => {
          e.preventDefault();
          searchGame();
        }}>
          <input 
            type="text" 
            placeholder="Enter a game name" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="btn-search">Аштв</button>
        </form>
      </header>

      <main className="container">
        <h2 className="section-title">Random Games</h2>

        {isError && <p>No data found</p>}

        <div className="game-grid">
          {randomGames.map((game, index) => (
            <Link 
              key={game?.id || index}
              to="/detailed"
              state={{ game }}
              className="game-card"
            >
              <img
                src={game?.background_image || 'placeholder.jpg'} 
                alt={game?.name || "Game"}
              />
              <div className="card-content">
                <h3>{game?.name}</h3>
                <p>Rating: {game?.rating || 'N/A'}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}