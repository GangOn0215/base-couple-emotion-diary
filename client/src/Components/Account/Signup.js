import axios from 'axios';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { axiosRegisterAction } from '../../redux/auth/axios/register/action';
import { isAuthLoginAction } from '../../redux/auth/action';

// awesome icon
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './account.css';

const Signup = ({ auth, axiosRegisterAction, isAuthLoginAction, axiosRegister }) => {
  const navigate = useNavigate();
  const memberRef = useRef([]);
  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);

  const [memberState, setMemberState] = useState({
    id: '',
    pw: '',
    pw2: '',
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
      //required
      if (memberState[memberRef.current[i].name].length <= 0) {
        validation = false;
        memberRef.current[i].focus();

        break;
      }
    }

    // check overlap - member id, member email

    // check regular - member id, email, pw, phone

    // check password
    if (memberState.pw !== memberState.pw2) {
      alert('패스워드가 다릅니다. ');

      setMemberState({
        ...memberState,
        pw: '',
        pw2: '',
      });

      memberRef.current[1].focus();
      validation = false;
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
    if (auth.isAuth) {
      navigate('/profile');

      return;
    }

    switch (axiosRegister.status) {
      case 'REGISTER_SUCCESS':
        alert(`${axiosRegister.memberId}님 반갑습니다.`);

        setCookie('x_auth', axiosRegister.token);
        isAuthLoginAction();
        break;
      default:
        break;
    }
  }, [auth, navigate, axiosRegister, setCookie, removeCookie, isAuthLoginAction]);

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
              type='password'
              name='pw2'
              value={memberState.pw2}
              onChange={onChangeMemberState}
              placeholder='Password Confirm'
            />
            <input
              ref={(e) => (memberRef.current[3] = e)}
              type='text'
              name='email'
              value={memberState.email}
              onChange={onChangeMemberState}
              placeholder='Email'
            />
            <input
              ref={(e) => (memberRef.current[4] = e)}
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
