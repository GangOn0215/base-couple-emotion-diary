import axios from 'axios';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//reducer
import { axiosLoginAction } from '../../redux/auth/axios/login/action';
import { isAuthLoginAction, isAuthLogoutAction } from '../../redux/auth/action';

// awesome icon
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import './account.css';

const Login = ({ auth, axiosLogin, axiosLoginAction, isAuthLoginAction }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);

  let getTodoUrl = window.location.origin;

  if (process.env.NODE_ENV === 'development') {
    getTodoUrl = 'http://localhost:3001';
  }

  const [loginID, setLoginID] = useState('');
  const [loginPW, setLoginPW] = useState('');
  const refInputID = useRef();
  const refInputPW = useRef();

  const onChangeID = (e) => {
    setLoginID(e.target.value);
  };

  const onChangePW = (e) => {
    setLoginPW(e.target.value);
  };

  const handleCheckJWT = async () => {
    const config = { headers: { authorization: cookies.x_auth } };
    const result = await axios.post(`${getTodoUrl}/account/checkLogin`, {}, config);
    console.log(result);
  };

  const handleLogin = async () => {
    // validation
    if (loginID.length <= 0) {
      refInputID.current.focus();
      return;
    }
    if (loginPW.length <= 0) {
      refInputPW.current.focus();
      return;
    }

    axiosLoginAction(loginID, loginPW);
  };

  useEffect(() => {
    switch (axiosLogin.status) {
      case 'LOGIN_SUCCESS':
        setCookie('x_auth', axiosLogin.token);
        isAuthLoginAction(axiosLogin.memberId);
        break;
      case 'LOGIN_FAIL':
        switch (axiosLogin.error) {
          case 'ERROR_ID':
            alert('아이디가 존재 하지 않습니다.');
            break;
          case 'ERROR_PW':
            alert('패스워드가 일치하지않습니다.');
            break;
          default:
            break;
        }

        setLoginID('');
        setLoginPW('');

        isAuthLogoutAction();
        break;
      default:
        break;
    }
  }, [axiosLogin, setCookie, removeCookie]);

  useEffect(() => {
    if (auth.isAuth) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  return (
    <>
      {axiosLogin.isLoading ? (
        <>
          <div className='main-site'>
            <div className='main-header pad-top wrapper' id='mainHeader'></div>
            <div className='loader loader-7'></div>
          </div>{' '}
        </>
      ) : (
        <>
          <div className='form-container'>
            <div className='form-box login'>
              <input
                ref={refInputID}
                type='text'
                value={loginID}
                onChange={onChangeID}
                placeholder='ID'
              />
              <input
                ref={refInputPW}
                type='password'
                value={loginPW}
                onChange={onChangePW}
                placeholder='Password'
              />
              <button onClick={handleLogin}>Login</button>
              <div className='icon-sign-up'>
                <Link to='/signup'>
                  <FontAwesomeIcon icon={faUser} />
                  <label>Sign Up</label>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    axiosLogin: state.axiosLogin,
  };
};

const mapDispatchToProps = {
  axiosLoginAction,
  isAuthLoginAction,
  isAuthLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
