import { memo, type FC } from "react";
import type { Game } from "../../../../shared/types/responses";
import SkeletonGameList from "../UI/Sleketon/SkeletonGameList/SkeletonGameList";
import classes from "../../styles.module.scss";
import GameCard from "../GameCard/GameCard";

interface GameListProps {
  games: Game[];
  loading: boolean;
  size: number;
}
const GamesList: FC<GameListProps> = memo(({ games, loading }) => {
  console.log("rerender");
  if (loading) {
    return (
      <div className={classes.catalog}>
        <SkeletonGameList count={10} />
      </div>
    );
  }
  return (
    <div className={classes.catalog}>
      {games.map((item) => {
        return <GameCard game={item} key={item.id} />;
      })}
    </div>
  );
});
export default GamesList;
