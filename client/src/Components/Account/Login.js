import axios from 'axios';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

//reducer
import { axiosLogin } from '../../redux/auth/axios/action';

// awesome icon
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//css
import './account.css';

const Login = ({ axiosLogin, axiosAuth }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['x_auth']);

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

    axiosLogin(loginID, loginPW);
  };

  useEffect(() => {
    if (axiosAuth.isAuth) {
      setCookie('x_auth', axiosAuth.memberInfo.data.token);
      navigate('/profile');
    }
  }, [axiosAuth, navigate, setCookie]);

  return (
    <>
      {axiosAuth.isLoading ? (
        <>
          <div className='main-site'>
            <div className='main-header pad-top wrapper' id='mainHeader'></div>
            <div className='loader loader-7'></div>
          </div>{' '}
        </>
      ) : (
        <>
          <div className='form-container'>
            <div className='form-box'>
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
              <button onClick={handleCheckJWT}>checkJWT</button>
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
  console.log(state);
  return {
    auth: state.auth,
    axiosAuth: state.axiosAuth,
  };
};

const mapDispatchToProps = {
  axiosLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
