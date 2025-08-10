import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import classes from "../../styles.module.scss";
import "react-loading-skeleton/dist/skeleton.css";
export default function TotalGames({ totalGames }: { totalGames: number }) {
  return (
    <div className={classes["catalog__options-total"]}>
      {totalGames ? (
        <span>total {totalGames} games</span>
      ) : (
        <SkeletonTheme baseColor="#3b3b3b" highlightColor="#888">
          <p>
            <Skeleton width={"10%"} />
          </p>
        </SkeletonTheme>
      )}
    </div>
  );
}
