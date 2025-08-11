import { useState, type FC } from "react";
import "./LazyImg.scss";
import { useIntersectionObserver } from "@siberiacancode/reactuse";
import Skeleton from "react-loading-skeleton";

interface LazyImgProps {
  src: string;
  name: string;
}
const skeletonTheme = {
  baseColor: "#2a2a2a",
  highlightColor: "#3a3a3a",
  borderRadius: "8px",
  duration: 1.5,
};
const LazyImg: FC<LazyImgProps> = ({ src }) => {
  const [placeholder, setPlaceholder] = useState(false);
  const { ref } = useIntersectionObserver<HTMLImageElement>({
    threshold: 0.1,
    onChange: (e) => {
      if (e.isIntersecting) {
        setPlaceholder(false);
      } else {
        setPlaceholder(true);
      }
    },
  });
  return (
    <>
      {placeholder ? (
        <Skeleton className="img" height="300px" {...skeletonTheme} />
      ) : (
        <div
          className="img"
          ref={ref}
          style={{ backgroundImage: `url('${src}')` }}
        ></div>
      )}
    </>
  );
};
export default LazyImg;
