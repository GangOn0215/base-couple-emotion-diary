import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => {
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
          <li className='li-dropdown'>
            {auth.isAuth ? (
              <>
                <div className='dropdown-hover'>
                  <Link to='/profile'>Profile</Link>
                </div>
                <div className='dropdown-content'>
                  <Link to='/profile'>Profile</Link>
                  <Link to='/update'>Update</Link>
                  <Link to='/logout'>Logout</Link>
                </div>
              </>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Header);
