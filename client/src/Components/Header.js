import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = ({handleAuth, isAuth}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
  const handleLogout = () => {
    removeCookie('x_auth');

    handleAuth(false);
  }
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>About</Link>
          </li>
          <li>
            <Link to='/list'>Diary</Link>
          </li>
          <li>
          </li>
          <li>
            {isAuth ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
