import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="item header__icon">RAWG</div>
      <div className="item header__search">
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
            <input type="text" placeholder="Find everything" />
          </div>
        </div>
      </div>
    </header>
  );
}
