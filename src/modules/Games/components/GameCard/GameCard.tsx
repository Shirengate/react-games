import { useRef, type FC } from "react";
import type { Game } from "../../../../shared/types/responses";
import { useHover } from "@siberiacancode/reactuse";
import "./GameCard.scss";

interface GameCardProps {
  game: Game;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  const ref = useRef(null);
  const hovering = useHover(ref);

  const chartInfo = `#1 Top ${new Date(game.released).getFullYear()}`;

  return (
    <div
      className={`game-card ${!hovering ? "opened" : ""}`}
      ref={ref}
      style={{ zIndex: hovering ? 100 : "" }}
    >
      <div className="game-card__media">
        <img className="img" src={game.background_image} alt={game.name} />
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
