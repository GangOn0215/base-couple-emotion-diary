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

  // errorState의 info Props가 에러의 유무를 확인해줍니다.
  const [errorState, setErrorState] = useState({
    status: false,
    id: { status: false, msg: '' },
    pw: { status: false, msg: '' },
    pw2: { status: false, msg: '' },
    name: { status: false, msg: '' },
    email: { status: false, msg: '' },
    phoneNumber: { status: false, msg: '' },
  });

  /**
   *
   * 해당 요소요소마다 validation 함수를 따로 만들려 했지만 그렇게 하면 중복 코드가 엉청날것 같아서 통합 할려고 했습니다
   * 구분은 e.target.name으로 합니다.
   * event: focus out
   *
   */
  const onCheckVlidation = (e) => {
    // validation 순서 : required > regex > overlap

    // reg object 형식으로 관리
    const reg = {
      id: /^[A-Za-z]{1}[A-Za-z0-9]{2,7}$/, // 영문, 숫자 2~8자리 첫글자 숫자 x
      name: /^[가-힣]{2,4}$/, // 한글만
      pw: /(?=.*\d)(?=.*[A-Za-z]).{4,}/,
      phoneNumber: /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, // 전화번호
      email:
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i, // Email
      regKoen: /^[가-힣a-zA-Z]+$/, // 영문, 한글 가능
    };

    // view msg object 형식으로 관리
    const msg = {
      id: {
        name: '아이디',
        reg: '아이디는 영문, 숫자 2~8자리만 가능합니다.',
      },
      pw: {
        name: '패스워드',
        reg: '영어, 숫자 포함 4자 이상만 가능합니다.',
      },
      pw2: {
        name: '패스워드 확인',
        reg: '',
      },
      name: {
        name: '이름',
        reg: '이름은 한글, 2~4글자만 가능합니다.',
      },
      email: {
        name: '이메일',
        reg: '이메일 형식을 확인해주세요.',
      },
      phoneNumber: {
        name: '핸드폰 번호',
        reg: '전화번호를 확인해주세요.',
      },
    };

    const checkValue = e.target.value;
    const name = e.target.name;

    // validation required check
    if (!checkValue) {
      onHandleErrorState(name, `${msg[name].name} 필드는 필수 요소 입니다.`);

      return;
    }

    // reg check가 존재하며, 정규식 체크를 하지 못했다면
    if (reg[name] && !reg[name].test(checkValue)) {
      console.log(name);
      onHandleErrorState(name, msg[name].reg);

      return;
    }

    setErrorState((prevState) => ({
      ...prevState,
      [name]: {
        status: false,
        msg: '',
      },
    }));
  };

  const onHandleErrorState = (elementName, errorMsg) => {
    setErrorState((prevState) => ({
      ...prevState,
      [elementName]: {
        status: true,
        msg: errorMsg,
      },
    }));
  };

  const onHandleSignUp = async () => {
    // check password
    if (memberState.pw !== memberState.pw2) {
      alert('패스워드가 다릅니다. ');

      setMemberState({
        ...memberState,
        pw: '',
        pw2: '',
      });

      memberRef.current[1].focus();
    }

    // check overlap

    /* 공사중 */
    alert('업데이트 중 입니다.');
    return;
    //validation 통과
    /*
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
    */
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
            <label className='error'>{errorState.id.status ? errorState.id.msg : ''}</label>
            <input
              type='text'
              name='id'
              className={errorState.id.status ? 'error' : ''}
              value={memberState.id}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
              placeholder='ID'
            />
            <label className='error'>{errorState.pw.status ? errorState.pw.msg : ''}</label>
            <input
              type='password'
              name='pw'
              className={errorState.pw.status ? 'error' : ''}
              value={memberState.pw}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
              placeholder='Password'
            />
            <label className='error'>{errorState.pw2.status ? errorState.pw2.msg : ''}</label>
            <input
              type='password'
              name='pw2'
              className={errorState.pw2.status ? 'error' : ''}
              value={memberState.pw2}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
              placeholder='Password Confirm'
            />
            <label className='error'>{errorState.name.status ? errorState.name.msg : ''}</label>
            <input
              type='text'
              name='name'
              className={errorState.name.status ? 'error' : ''}
              value={memberState.name}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
              placeholder='Name'
            />
            <label className='error'>{errorState.email.status ? errorState.email.msg : ''}</label>
            <input
              type='text'
              name='email'
              className={errorState.email.status ? 'error' : ''}
              value={memberState.email}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
              placeholder='Email'
            />
            <label className='error'>
              {errorState.phoneNumber.status ? errorState.phoneNumber.msg : ''}
            </label>
            <input
              type='text'
              name='phoneNumber'
              className={errorState.phoneNumber.status ? 'error' : ''}
              value={memberState.phoneNumber}
              onChange={onChangeMemberState}
              onBlur={onCheckVlidation}
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
