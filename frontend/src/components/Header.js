import { Link } from "react-router-dom";

function Header({ link, text, onSignOut, loggedin, email }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__nav">
        {loggedin && (
          <>
            <p className="header__email">{email}</p>
            <Link to={link} onClick={onSignOut} className="header__link">
              sign out
            </Link>
          </>
        )}

        {!loggedin && (
          <Link to={link} className="header__link">
            {text}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
