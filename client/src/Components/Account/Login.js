import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// awesome icon
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './account.css';

const Login = () => {
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

  const handleLogin = () => {
    if (loginID.length <= 0) {
      refInputID.current.focus();
      return;
    }
    if (loginPW.length <= 0) {
      refInputPW.current.focus();
      return;
    }

    if (loginID === 'admin' && loginPW === '1234') {
      alert(`Welcome ${loginID}`);
    } else {
      alert('ID or PW does not match');
    }
  };

  return (
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
        <div className='icon-sign-up'>
          <Link to='/signup'>
            <FontAwesomeIcon icon={faUser} />
            <label>Sign Up</label>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
