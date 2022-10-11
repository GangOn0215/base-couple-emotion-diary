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
          {/* <li>{isAuth ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}</li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
