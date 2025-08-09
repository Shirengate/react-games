import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { GamesApiResponse, Game } from "../../shared/types/responses.ts";
import { useIntersectionObserver } from "@siberiacancode/reactuse";
import { useEffect } from "react";
import { addGames, setTotalGames } from "./reducer/games.ts";
import instance from "../../shared/api/axios";
import classes from "./styles.module.scss";
import Loader from "./components/UI/Loader/Loader.tsx";
import GameCard from "./components/GameCard/GameCard.tsx";

const Games = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.games.games);
  const totalGames = useAppSelector((state) => state.games.totalCount);
  async function fetchData() {
    try {
      const { data } = await instance<GamesApiResponse>({
        method: "get",
        url: "/games",
      });
      dispatch(setTotalGames(data.count));
      dispatch(addGames(data.results));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>All Games</h1>
      <div className={classes["catalog__options"]} style={{ margin: "20px 0" }}>
        <div className={classes["catalog__options-filters"]}>
          filters will be soon
        </div>
        <div className={classes["catalog__options-total"]}>
          total {totalGames} games
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.catalog}>
          {games.map((item) => {
            return <GameCard game={item} key={item.id} />;
          })}
        </div>
        <div className={classes.loaderWrapper}>
          <Loader />
        </div>
      </div>
    </div>
  );
};
export default Games;
