import React, { useState, useRef, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { axiosRegisterAction } from '../../redux/auth/axios/register/action';
import { isAuthLoginAction } from '../../redux/auth/action';

// awesome icon
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './account.css';

const Signup = ({ axiosRegisterAction, isAuthLoginAction, axiosRegister }) => {
  const memberRef = useRef([]);
  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);

  const [memberState, setMemberState] = useState({
    id: '',
    pw: '',
    email: '',
    phoneNumber: '',
    age: '30',
  });

  const onChangeMemberState = (e) => {
    setMemberState({
      ...memberState,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSignUp = async () => {
    let validation = true;

    for (let i = 0; i < memberRef.current.length; i++) {
      if (memberState[memberRef.current[i].name].length <= 0) {
        validation = false;
        memberRef.current[i].focus();

        break;
      }
    }

    //validation 통과
    if (validation) {
      axiosRegisterAction(
        memberState.id,
        memberState.pw,
        memberState.email,
        memberState.phoneNumber,
        memberState.age,
      );
    } else {
      return;
    }
  };

  useEffect(() => {
    switch (axiosRegister.status) {
      case 'LOGIN_SUCCESS':
        console.log(axiosRegister);
        setCookie('x_auth', axiosRegister.token);
        isAuthLoginAction();
        break;
      default:
        break;
    }
  }, [axiosRegister, setCookie, removeCookie]);

  return (
    <>
      {axiosRegister.isLoading ? (
        <>
          <div className='main-site'>
            <div className='main-header pad-top wrapper' id='mainHeader'></div>
            <div className='loader loader-7'></div>
          </div>{' '}
        </>
      ) : (
        <div className='form-container'>
          <div className='form-box'>
            <input
              ref={(e) => (memberRef.current[0] = e)}
              type='text'
              name='id'
              value={memberState.id}
              onChange={onChangeMemberState}
              placeholder='ID'
            />
            <input
              ref={(e) => (memberRef.current[1] = e)}
              type='password'
              name='pw'
              value={memberState.pw}
              onChange={onChangeMemberState}
              placeholder='Password'
            />
            <input
              ref={(e) => (memberRef.current[2] = e)}
              type='text'
              name='email'
              value={memberState.email}
              onChange={onChangeMemberState}
              placeholder='Email'
            />
            <input
              ref={(e) => (memberRef.current[3] = e)}
              type='text'
              name='phoneNumber'
              value={memberState.phoneNumber}
              onChange={onChangeMemberState}
              placeholder='Phone Number'
            />
            <button onClick={onHandleSignUp}>Sing Up</button>
            <div className='icon-sign-up'>
              <Link to='/login'>
                <FontAwesomeIcon icon={faGears} />
                <label>Login</label>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth,
    axiosLogin: state.axiosLogin,
    axiosRegister: state.axiosRegister,
  };
};

const mapDispatchToProps = {
  axiosRegisterAction,
  isAuthLoginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
