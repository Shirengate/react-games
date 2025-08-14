import type { FC } from "react";
import "./ImgsGalery.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { TransitionStatus } from "react-transition-group";
interface ImgsGaleryProps {
  screens: {
    id: number;
    image: string;
  }[];
  stateName: TransitionStatus;
}
const ImgsGalery: FC<ImgsGaleryProps> = ({ screens, stateName }) => {
  console.log(screens);
  return (
    <div className={`galery ${stateName}`}>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={50}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        modules={[Pagination]}
      >
        {screens.map((img) => {
          return (
            <SwiperSlide key={img.id}>
              <img
                className="imageSrc"
                src={img.image}
                alt={`image id is = ${img.id}`}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
export default ImgsGalery;
