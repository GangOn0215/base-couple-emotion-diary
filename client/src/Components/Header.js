import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ axiosAuth }) => {
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
          <li>
            {axiosAuth.isAuth ? <Link to='/profile'>Profile</Link> : <Link to='/login'>Login</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    axiosAuth: state.axiosAuth,
  };
};

export default connect(mapStateToProps)(Header);
