import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { GamesApiResponse } from "../../shared/types/responses.ts";
import { useEffect, useState, useMemo, useCallback } from "react";
import { addGames, setTotalGames } from "./reducer/games.ts";
import instance from "../../shared/api/axios";
import classes from "./styles.module.scss";
import TotalGames from "./components/TotalGames/TotalGames.tsx";
import GamesFilters from "./components/GamesFilters/GamesFilters.tsx";
import GamesList from "./components/GamesList/GamesList.tsx";

const Games = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.games.games);
  const totalGames = useAppSelector((state) => state.games.totalCount);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [threshold, setThreshold] = useState(false);

  const handleIntersection = useCallback(
    (e: IntersectionObserverEntry) => {
      if (e.isIntersecting && !loading && !threshold) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, threshold]
  );
  const gamesListProps = useMemo(
    () => ({ games, loading, handleIntersection }),
    [games, loading, handleIntersection]
  );
  const fetchData = useCallback(
    async (page: number) => {
      setThreshold(true);
      try {
        const { data } = await instance<GamesApiResponse>({
          method: "get",
          url: "/games",
          params: { page },
        });
        dispatch(setTotalGames(data.count));
        dispatch(addGames(data.results));
      } catch (error) {
        console.error(error);
      } finally {
        setThreshold(false);
      }
    },
    [dispatch]
  );
  const firstLoad = useCallback(
    async (page: number) => {
      setLoading(true);
      await fetchData(page);
      setLoading(false);
    },
    [fetchData]
  );
  useEffect(() => {
    firstLoad(1);
  }, [firstLoad]);
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page, fetchData]);
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>All Games</h1>
      <div className={classes["catalog__options"]} style={{ margin: "20px 0" }}>
        <GamesFilters />
        <TotalGames totalGames={totalGames} />
      </div>

      <div className={classes.content}>
        <GamesList {...gamesListProps} />
      </div>
    </div>
  );
};
export default Games;
