import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { GamesApiResponse } from "../../shared/types/responses.ts";
import { useEffect, useState, useMemo, useCallback } from "react";
import { addGames, setTotalGames } from "./reducer/games.ts";
import instance from "../../shared/api/axios";
import classes from "./styles.module.scss";
import TotalGames from "./components/TotalGames/TotalGames.tsx";
import GamesFilters from "./components/GamesFilters/GamesFilters.tsx";
import GamesList from "./components/GamesList/GamesList.tsx";
import { shallowEqual } from "react-redux";

const Games = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector((state) => state.games.games, shallowEqual);
  const totalGames = useAppSelector((state) => state.games.totalCount);
  const [state, setState] = useState({
    page: 1,
    loading: false,
    threshold: false,
  });
  type StateUnion = {
    [K in keyof typeof state]: { [P in K]: (typeof state)[P] };
  }[keyof typeof state];
  const updateState = useCallback((newState: StateUnion) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);
  const handleIntersection = useCallback(
    (e: IntersectionObserverEntry) => {
      if (e.isIntersecting && !state.loading && !state.threshold) {
        updateState({ page: state.page + 1 });
      }
    },
    [state, updateState]
  );
  const gamesListProps = useMemo(
    () => ({ games, loading: state.loading, handleIntersection }),
    [games, state.loading, handleIntersection]
  );
  const fetchData = useCallback(
    async (page: number) => {
      updateState({ threshold: true });
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
        updateState({ threshold: false });
      }
    },
    [dispatch, updateState]
  );
  const firstLoad = useCallback(async () => {
    updateState({ loading: true });
    await fetchData(1);
    updateState({ loading: false });
  }, [fetchData, updateState]);

  useEffect(() => {
    if (state.page > 1) {
      fetchData(state.page);
    } else {
      firstLoad();
    }
  }, [state.page, fetchData, firstLoad]);
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
