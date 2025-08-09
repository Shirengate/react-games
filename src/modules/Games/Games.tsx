import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { GamesApiResponse, Game } from "../../shared/types/responses.ts";
import { useIntersectionObserver } from "@siberiacancode/reactuse";
import { useEffect } from "react";
import instance from "../../shared/api/axios";
import classes from "./styles.module.scss";

const Games = () => {
  async function fetchData() {
    try {
      const { data } = await instance<GamesApiResponse>({
        method: "get",
        url: "/games",
      });
      console.log(data);
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
      <div style={{ margin: "20px 0" }}>filters will be soon</div>
      <div className={classes["total"]}>total 20 games</div>
      <div className={classes.catalog}></div>
    </div>
  );
};
export default Games;
