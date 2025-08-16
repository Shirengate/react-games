import { createPortal } from "react-dom";
import SearchBox from "./components/SearchBox/SearchBox";
import style from "./style.module.scss";
import { memo, useEffect, type FC } from "react";
import instance from "../../shared/api/axios";
import type { GamesApiResponse } from "../../shared/types/responses";
import { useAppDispatch } from "../../store/hooks";
import { updateGames } from "./reducer/searchData";

const portal = document.getElementById("portal") as HTMLDivElement;
interface SearchProps {
  search: string;
}
const Search: FC<SearchProps> = memo(({ search }) => {
  const dispatch = useAppDispatch();
  async function fetchData() {
    try {
      const { data } = await instance<GamesApiResponse>({
        url: "/games",
        params: {
          search: search,
        },
      });
      dispatch(
        updateGames({
          total: data.count,
          list: data.results,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (search.length === 0) return;
    fetchData();
    return () => {
      dispatch(
        updateGames({
          total: 0,
          list: [],
        })
      );
    };
  }, [search]);
  return createPortal(
    <div className={`${style.portal} `}>
      <SearchBox />
    </div>,
    portal
  );
});
export default Search;
