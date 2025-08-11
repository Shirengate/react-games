import { type FC } from "react";
import type { Game } from "../../../../shared/types/responses";
import "./GameCard.scss";
import LazyImg from "../UI/LazyImg/LazyImg";

interface GameCardProps {
  game: Game;
  hovering: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, hovering }) => {
  const chartInfo = `#1 Top ${new Date(game.released).getFullYear()}`;
  return (
    <div className={`game-card ${hovering ? "opened" : ""} `}>
      <div className="game-card__media">
        <LazyImg src={game.background_image} name={game.name} />
      </div>
      <div className="game-card__data">
        <div className="game-card__top">
          <div className="platform-icons">
            {game.platforms?.slice(0, 3).map((p) => (
              <img
                key={p.platform.id}
                src={p.platform.image_background}
                alt={p.platform.name}
                className="platform-icon"
              />
            ))}
          </div>
          {game.metacritic !== null && (
            <div className="metacritic">{game.metacritic}</div>
          )}
        </div>

        <div className="game-card__name">
          {game.name} <div className="target-icon">🎯</div>
        </div>

        <button className="game-card__added">
          <span className="game-card__added-plus">+</span>
          <span className="game-card__added-text">
            {game.added.toLocaleString()}
          </span>
        </button>
      </div>

      {hovering ? (
        <div className="openedData">
          <div className="openedData__row">
            <span className="openedData__label">Release date:</span>
            <span className="openedData__value">
              {new Date(game.released).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="openedData__row">
            <span className="openedData__label">Genres:</span>
            <span className="openedData__value">
              {game.genres.map((g, i) => (
                <span key={g.id}>
                  {g.name}
                  {i < game.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </div>

          <div className="openedData__row">
            <span className="openedData__label">Chart:</span>
            <span className="openedData__value link">{chartInfo}</span>
          </div>

          <button className="openedData__more">Show more like this</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GameCard;
