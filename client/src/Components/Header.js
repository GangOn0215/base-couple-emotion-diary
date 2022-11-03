import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';

import { isAuthLogoutAction } from '../redux/auth/action';

const Header = ({ auth, isAuthLogoutAction }) => {
  const [cookies, removeCookie] = useCookies(['x_auth']);
  const handleLogout = () => {
    removeCookie('x_auth');

    isAuthLogoutAction();
    // handleAuth(false);
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>About</Link>
          </li>
          <li>
            <Link to='/diary/list'>Diary</Link>
          </li>
          <li></li>
          <li className={auth.isAuth ? 'li-dropdown' : ''}>
            {auth.isAuth ? (
              <>
                <div className='dropdown-hover'>
                  <img src='/assets/image/bonobono_profile.jpg' alt='profile' />
                  <span>{auth.id} </span>
                </div>
                <div className='dropdown-content'>
                  <Link to='/profile'>Profile</Link>
                  <Link to='/update'>Update</Link>
                  <button onClick={handleLogout}>Logout</button>
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

const mapDispatchToProps = {
  isAuthLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
