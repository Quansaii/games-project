import { Link, useLocation } from "react-router";

export function GetDetailsPage() {
  const location = useLocation();
  const game = location.state?.game;

  if (!game) {
    return (
      <div className="container">
        <h2>No Game Found</h2>
        <Link to="/">Back to Home Page</Link>
      </div>
    );
  }

  const getRatingPercent = (id) => {
    const found = game.ratings?.find((r) => r.id === id);
    return found ? found.percent : 0;
  };

  return (
    <>
      <div className="container">
        <nav>
          <Link to="/" className="btn-back">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path fill="#57606f" d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z" />
            </svg>
          </Link>
        </nav>

        <section className="game-main-info">
          <div className="left-col">
            <div className="poster big-poster">
              <img src={game.background_image} alt={game.name} />
            </div>

            <div className="description-block">
              <h2>Description</h2>
              <div dangerouslySetInnerHTML={{ __html: game.description || "No description available." }} />
            </div>
          </div>

          <div className="right-col">
            <div className="info-header">
              <h1>{game.name_original || game.name}</h1>
            </div>

            <div className="rating-detailed">
              <h3>Player reviews</h3>
              {[5, 4, 3, 2, 1].map((star) => {
                const percent = getRatingPercent(star);
                return (
                  <div className="rating-row" key={star}>
                    <span>{star} ★</span>
                    <div className="bar-bg">
                      <div 
                        className={`bar-fill star-${star}`} 
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span>{percent}%</span>
                  </div>
                );
              })}
            </div>

            <ul className="stats">
              <li>
                <strong>Released:</strong> {game.released}
              </li>
              <li>
                <strong>Platforms:</strong> {game.parent_platforms?.map((pf) => pf.platform.name).join(", ")}
              </li>
              <li>
                <strong>ESRB Rating:</strong> {game.esrb_rating?.name || "Not rated"}
              </li>
            </ul>

            <div className="tags">
              {game.tags?.slice(0, 10).map((tag) => (
                <span key={tag.id} className="tag">{tag.name}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="screenshots-section">
          <h2 className="section-title">Screenshots</h2>
          <div className="slider">
            <div className="slide-track">
              {game.short_screenshots?.map((screenshot) => (
                <div className="slide" key={screenshot.id}>
                  <img src={screenshot.image} alt="Screenshot" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}