import {  useEffect, useState, type FC } from "react";
import "./LazyImg.scss";
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
  const [panding, setPanding] = useState(true);
  useEffect(() => {
    if(src.length === 0){
      return setPanding(true)
    }else{
      let img = document.createElement("img");
      img.onload = function(){
        setPanding(false)
      }
      img.src = src
    }
  }, [src])
  return (
    <>
      { panding ? (
        <Skeleton className="img" height="300px" {...skeletonTheme} />
      ) : (
        <div className="img" style={{ backgroundImage: `url('${src}')` }}></div>
      )}
    </>
  );
};
export default LazyImg;
