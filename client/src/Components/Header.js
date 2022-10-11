import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../App';

const Header = () => {
  const { isAuth } = useContext(MyContext);
  console.log(isAuth);

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
          <li></li>
          <li>{isAuth ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
