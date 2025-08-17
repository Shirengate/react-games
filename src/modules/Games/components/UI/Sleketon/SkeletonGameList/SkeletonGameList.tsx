import type { FC } from "react";
import Skeleton from "react-loading-skeleton";
import classes from "./SkeletonGameList.module.scss";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps {
  count: number;
}

const SkeletonGameList: FC<SkeletonProps> = ({ count }) => {
  const skeletonTheme = {
    baseColor: "#2a2a2a",
    highlightColor: "#3a3a3a",
    borderRadius: "8px",
    duration: 1.5,
  };

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={classes["game-card"]}>
            <div className={classes["game-card__media"]}>
              <Skeleton
                className={classes["img"]}
                height="200px"
                {...skeletonTheme}
              />
            </div>
            <div className={classes["game-card__data"]}>
              <div className={classes["game-card__top"]}>
                <div className={classes["platform-icons"]}>
                  {[1, 2, 3].map((p) => (
                    <Skeleton
                      key={p}
                      width="24px"
                      height="24px"
                      circle
                      {...skeletonTheme}
                    />
                  ))}
                </div>
                <div className={classes["metacritic"]}>
                  <Skeleton width="40px" height="20px" {...skeletonTheme} />
                </div>
              </div>
              <div className={classes["game-card__name"]}>
                <Skeleton width={250} {...skeletonTheme} />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonGameList;
