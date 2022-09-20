import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
          <li></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
