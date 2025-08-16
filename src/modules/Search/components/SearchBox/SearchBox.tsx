import style from "./SearchBox.module.scss";
import { HeaderContext } from "../../../../shared/context/header";
import { useContext } from "react";
import { useAppSelector } from "../../../../store/hooks";

export default function SearchBox() {
  const width = useContext(HeaderContext);
  const list = useAppSelector((state) =>
    state.search.collection.games.list.slice(0, 5)
  );
  const total = useAppSelector((state) => state.search.collection.games.total);
  return (
    <div className={style["search-teleport"]} style={{ width: width }}>
      <div className={style["search-header"]}>
        <span className={style["title"]}>Games</span>
        <span className={style["count"]}>{total}</span>
      </div>

      <div className={style["games-list"]}>
        {list.map((game, idx) => (
          <div key={idx} className={style["game-item"]}>
            <div className={style["game-icon"]}>
              {/* иконка */}
              <img src={game.background_image} alt={game.name} />
            </div>
            <div className={style["game-info"]}>
              <div className={style["game-title"]}>{game.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
