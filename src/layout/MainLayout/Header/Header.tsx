import React, { useEffect, useRef, useState, useCallback } from "react";
import Search from "../../../modules/Search/Search";
import "./Header.scss";
import { debounce, useElementSize } from "@siberiacancode/reactuse";
import { HeaderContext } from "../../../shared/context/header";
import { Transition } from "react-transition-group";

const defaultStyle = {
  transition: `opacity 500ms`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};
export default function Header() {
  const searchRef = useRef(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const { value } = useElementSize(searchRef);
  const [inputValue, setInputValue] = useState(""); // Для отображения в инпуте
  const [searchQuery, setSearchQuery] = useState(""); // Для поиска (debounced)
  const ref = useRef(null);
  // Создаем debounced функцию один раз при монтировании компонента
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value); // Обновляем только поисковый запрос
      if (value === "") {
        setActiveStatus(false);
      } else {
        setActiveStatus(true);
      }
    }, 700),
    []
  );

  // Обработчик изменения инпута
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Обновляем инпут немедленно
    debouncedSearch(value); // Вызываем debounced функцию для поиска
  };

  return (
    <HeaderContext value={value.width}>
      <header className="header">
        <div className="item header__icon">RAWG</div>
        <div className="item header__search" ref={searchRef}>
          <div className="header__search-box search">
            <div className="search__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11.5" cy="11.5" r="9.5" />
                  <path strokeLinecap="round" d="m20 20l2 2" />
                </g>
              </svg>
            </div>
            <div className="search__input">
              <input
                value={inputValue}
                onChange={handleInputChange}
                type="text"
                placeholder="Find everything"
              />
            </div>
          </div>
          <Transition
            nodeRef={ref}
            in={activeStatus}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={`opened`}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <Search search={searchQuery} />
              </div>
            )}
          </Transition>
        </div>
      </header>
    </HeaderContext>
  );
}
