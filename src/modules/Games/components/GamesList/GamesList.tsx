import { memo, useCallback, useEffect, useRef, useState, type FC } from "react";
import type { Game } from "../../../../shared/types/responses";
import SkeletonGameList from "../UI/Sleketon/SkeletonGameList/SkeletonGameList";
import classes from "../../styles.module.scss";
import GameCard from "../GameCard/GameCard";
// import useResizeObserver from "../../hooks/useResizeObserver";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  throttle,
  useIntersectionObserver,
  useResizeObserver,
} from "@siberiacancode/reactuse";
import style from "./GamesList.module.scss";
import Loader from "../UI/Loader/Loader";

interface GameListProps {
  games: Game[];
  loading: boolean;
  handleIntersection: (e: IntersectionObserverEntry) => void;
}
const BREAKPOINT = {
  sm: 768,
  md: 1024,
  lg:1680
};
const CARD_SIZE = {
  width: 450,
  height: 450,
};
const GamesList: FC<GameListProps> = memo(
  ({ games, loading, handleIntersection }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(1);
    const [gap, setGap] = useState({
      x: 20,
      y: 20,
    });
    useResizeObserver(parentRef, {
      onChange: (e) => {
        const clientWidth = e[0].target.clientWidth;
        handleResize(clientWidth);
      },
    });
    const rowVirtualizer = useVirtualizer({
      count: Math.ceil(games.length / columns),
      getScrollElement: () => parentRef.current,
      estimateSize: () => CARD_SIZE.height + gap.y,
    });

    const columnVirtualizer = useVirtualizer({
      horizontal: true,
      count: columns,
      getScrollElement: () => parentRef.current,
      estimateSize: () => CARD_SIZE.width + gap.x,
    });

    useEffect(() => {
      rowVirtualizer.measure();
      columnVirtualizer.measure();
    }, [columns, gap]);

    const getItemGap = (width: number) => {
      if (width <= BREAKPOINT.sm) return { x: 0, y: 15 };
      if (width <= BREAKPOINT.lg) return { x: 40, y: 15 };
      return { x: 10, y: 20 };
    };

    const getColumnsCount = (width: number) => {
      if (width <= BREAKPOINT.sm) return 1;
      if (width <= BREAKPOINT.md) return 2;
      if(width <= BREAKPOINT.lg) return 3
      return 4;
    };
    const handleResize = throttle((containerWidth) => {
      const newGap = getItemGap(containerWidth);
      const newColumns = getColumnsCount(containerWidth);

      setGap(newGap);
      setColumns(newColumns);
    }, 200);

    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

    const handleMouseEnter = useCallback((id: number) => {
      setHoveredCardId(id);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setHoveredCardId(null);
    }, []);
    const { ref } = useIntersectionObserver<HTMLDivElement>({
      threshold: 1,
      onChange: handleIntersection,
    });
    if (loading) {
      return (
        <div className={classes.catalog}>
          <SkeletonGameList count={10} />
        </div>
      );
    }

    return (
      <div ref={parentRef} className={style.wrapper}>
        <div
          className={style.virtualWrapper}
          style={{
            width: `${columnVirtualizer.getTotalSize() - gap.x}px`,
            height: `${rowVirtualizer.getTotalSize() - gap.y}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) =>
            columnVirtualizer.getVirtualItems().map((virtualColumn) => {
              const itemIndex =
                virtualRow.index * columns + virtualColumn.index;
              const item = games[itemIndex];
              if (itemIndex >= games.length) return null;

              return (
                <div
                  key={item.id}
                  className={style.itemWrapper}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    width: CARD_SIZE.width,
                    height: CARD_SIZE.height,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                    zIndex: hoveredCardId === item.id ? 100 : 0,
                    padding: `${gap.y / 2}px ${gap.x / 2}px`,
                  }}
                >
                  <GameCard
                    game={item}
                    key={item.id}
                    hovering={hoveredCardId === item.id}
                  />
                </div>
              );
            })
          )}
        </div>
        <div ref={ref}>
          <Loader />
        </div>
      </div>
    );
  }
);

export default GamesList;
