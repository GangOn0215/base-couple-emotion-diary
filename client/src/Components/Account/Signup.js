import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

import { axiosRegisterAction } from '../../redux/auth/axios/register/action';
import { isAuthLoginAction, isAuthLogoutAction } from '../../redux/auth/action';

// awesome icon
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './account.css';

const Signup = ({ auth, axiosRegisterAction, isAuthLoginAction, axiosRegister }) => {
  const navigate = useNavigate();
  const memberRef = useRef({});
  const [setCookie, removeCookie] = useCookies(['x_auth']);

  const [memberState, setMemberState] = useState({
    id: '',
    pw: '',
    pw2: '',
    name: '',
    email: '',
    phoneNumber: '',
    age: 0,
  });

  const onChangeMemberState = (e) => {
    setMemberState({
      ...memberState,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSignUp = async () => {
    // let validation = true;
    const validation = {
      regex: true,
      overlap: true,
      required: true,
    };

    const regName = /^[가-힣]{2,4}$/; // 한글만
    // const regKoen = /^[가-힣a-zA-Z]+$/; // 영문, 한글 가능
    const regId = /^[A-Za-z]{1}[A-Za-z0-9]{2,7}$/; // 영문, 숫자 2~8자리 첫글자 숫자 x
    const regPhone = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/; // 전화번호
    const regEmail =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;

    Object.values(memberRef.current).every((item) => {
      if (memberState[item.ref.name].length <= 0) {
        validation.required = false;
        item.ref.focus();

        return false;
      }

      return true;
    });

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

    // validation 정규식 체크하는 부분은 후에 foreach 또는 loop로 처리할 예정 입니다.

    // validation regex id
    if (!regId.test(memberState.id)) {
      setMemberState({
        ...memberState,
        id: '',
      });

      alert('아이디는 영문, 숫자 2~8자리이며 첫글자 숫자 불가능 합니다');

      return;
    }
    // validation regex email
    if (!regEmail.test(memberState.email)) {
      setMemberState({
        ...memberState,
        email: '',
      });

      alert('이메일 형식을 확인해주세요.');

      return;
    }

    // validation regex phone
    if (!regPhone.test(memberState.phoneNumber)) {
      setMemberState({
        ...memberState,
        phoneNumber: '',
      });

      alert('전화번호를 확인해주세요.');
      memberRef.current.phoneNumber.ref.focus();

      return;
    }

    // validation regex name
    if (!regName.test(memberState.name)) {
      setMemberState({
        ...memberState,
        name: '',
      });

      alert('이름은 한글, 2~4글자만 가능합니다.');
      memberRef.current.name.ref.focus();

      return;
    }

    //validation 통과
    if (validation) {
      axiosRegisterAction(
        memberState.id,
        memberState.pw,
        memberState.email,
        memberState.phoneNumber,
        memberState.age,
        memberState.name,
        memberState.birthday,
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
      case 'REGISTER_FAIL':
        alert(axiosRegister.error);

        removeCookie('x_auth');
        isAuthLogoutAction();
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
          </div>
        </>
      ) : (
        <div className='form-container'>
          <div className='form-box signup'>
            <input
              ref={(e) => (memberRef.current.id = { seq: 1, ref: e })}
              type='text'
              name='id'
              value={memberState.id}
              onChange={onChangeMemberState}
              placeholder='ID'
            />
            <input
              ref={(e) => (memberRef.current.pw = { seq: 2, ref: e })}
              type='password'
              name='pw'
              value={memberState.pw}
              onChange={onChangeMemberState}
              placeholder='Password'
            />
            <input
              ref={(e) => (memberRef.current.pw2 = { seq: 3, ref: e })}
              type='password'
              name='pw2'
              value={memberState.pw2}
              onChange={onChangeMemberState}
              placeholder='Password Confirm'
            />
            <input
              ref={(e) => (memberRef.current.name = { seq: 4, ref: e })}
              type='text'
              name='name'
              value={memberState.name}
              onChange={onChangeMemberState}
              placeholder='Name'
            />
            <input
              ref={(e) => (memberRef.current.email = { seq: 5, ref: e })}
              type='text'
              name='email'
              value={memberState.email}
              onChange={onChangeMemberState}
              placeholder='Email'
            />
            <input
              ref={(e) => (memberRef.current.phoneNumber = { seq: 6, ref: e })}
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
