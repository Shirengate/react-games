import { useState, type FC } from "react";
import "./LazyImg.scss";
import { useIntersectionObserver } from "@siberiacancode/reactuse";
import Skeleton from "react-loading-skeleton";

interface LazyImgProps {
  src: string;
}
const skeletonTheme = {
  baseColor: "#2a2a2a",
  highlightColor: "#3a3a3a",
  borderRadius: "8px",
  duration: 1.5,
};
const LazyImg: FC<LazyImgProps> = ({ src }) => {
  return (
    <>
      {src.length === 0 ? (
        <Skeleton className="img" height="300px" {...skeletonTheme} />
      ) : (
        <div className="img" style={{ backgroundImage: `url('${src}')` }}></div>
      )}
    </>
  );
};
export default LazyImg;
