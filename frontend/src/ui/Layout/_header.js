import { Link, NavLink } from 'react-router-dom';

const Header = ({ hasCookie, name, image }) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <NavLink to="/" className="nav__el">
          All tours
        </NavLink>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <image xlinkHref="/img/icons.svg">Hii</image>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search tours"
            className="nav__search-input"
          />
        </form>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        <a href="/" className="nav__el">
          My bookings
        </a>
        {hasCookie && (
          <NavLink to="/me" className="nav__el">
            <img
              src={`/img/users/${image}`}
              alt="User"
              className="nav__user-img"
            />
            <span>{name}</span>
          </NavLink>
        )}

        {hasCookie && (
          <NavLink to="/logout" className="nav__el nav__el--cta">
            Log Out
          </NavLink>
        )}
        {!hasCookie && (
          <NavLink to="/login" className="nav__el">
            Log in
          </NavLink>
        )}
        {!hasCookie && (
          <NavLink to="/signup" className="nav__el nav__el--cta">
            Sign up
          </NavLink>
        )}
      </nav>
    </header>
  );
};
export default Header;
