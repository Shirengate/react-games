import { memo, useRef, useState, type FC } from "react";
import type { Game } from "../../../../shared/types/responses";
import "./GameCard.scss";
import LazyImg from "../UI/LazyImg/LazyImg";
import {
  useHover,
  useIntersectionObserver,
  useWindowSize,
} from "@siberiacancode/reactuse";
import { NavLink } from "react-router";
import ImgsGalery from "./components/ImgsGalery/ImgsGalery";
import { Transition } from "react-transition-group";
interface GameCardProps {
  game: Game;
  hovering: boolean;
}

const GameCard: FC<GameCardProps> = ({ game, hovering }) => {
  const [viewState, setViewState] = useState(true);
  const { height } = useWindowSize();
  const { ref } = useIntersectionObserver<HTMLDivElement>((e) => {
    if (e.isIntersecting) {
      return;
    } else {
      const { top } = e.boundingClientRect;
      const isNearTopEdge = top <= 0 && Math.abs(top) <= 500;
      const isNearBottomEdge = top > 0 && Math.abs(top - height) <= 500;

      if (isNearTopEdge || isNearBottomEdge) {
        return setViewState(true);
      }

      setViewState(false);
    }
  });
  const chartInfo = `#1 Top ${new Date(game.released).getFullYear()}`;
  const cardHover = useRef(null);
  const isCardHover = useHover(cardHover);
  const nodeRef = useRef(null);
  return (
    <div ref={ref} className={`game-card ${hovering ? "opened" : ""} `}>
      <div className="game-card__media" ref={cardHover}>
        <Transition
          nodeRef={nodeRef}
          in={isCardHover}
          timeout={500}
          unmountOnExit
          mountOnEnter
        >
          {(state) => (
            <ImgsGalery
              stateName={state}
              screens={game.short_screenshots.slice(1)}
            />
          )}
        </Transition>
        <LazyImg src={viewState && !isCardHover ? game.background_image : ""} />
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

        <NavLink to={`/gamed/${game.id}`} className="game-card__name">
          {game.name}
        </NavLink>

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

export default memo(GameCard);
