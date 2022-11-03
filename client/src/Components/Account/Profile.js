import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { connect } from 'react-redux';

//reducer
import { actionLogout } from '../../redux/auth/axios/login/action';
import { isAuthLogoutAction } from '../../redux/auth/action';

const Profile = ({ auth, common, isAuthLogoutAction }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['x_auth']);
  const [member, setMember] = useState({
    id: '',
    email: '',
    phoneNumber: '',
    age: '',
  });

  const handleLogout = () => {
    removeCookie('x_auth');

    isAuthLogoutAction();
  };

  useEffect(() => {
    // 로그인 상태가 아니거나 cookie x_auth가 없다면
    if (!auth.isAuth || !cookies.x_auth) {
      navigate('/login');

      return;
    }

    const config = { headers: { Authorization: cookies.x_auth } };
    // checkLogin
    axios.post(`${common.axiosUrl}/account/row`, {}, config).then((res) => {
      if (res.data.isAuth) {
        const memberInfo = res.data.member;

        setMember({
          id: memberInfo.id,
          email: memberInfo.email,
          phoneNumber: memberInfo.phoneNumber,
          age: memberInfo.age,
        });
      } else {
        handleLogout();
      }
    });
  }, [auth, navigate, cookies]);

  return (
    <article className='profile'>
      <ul>
        <li className='bono-img'>
          <img src={'/assets/image/bonobono_profile.jpg'} alt='bono' />
        </li>
        <li>
          <span>ID</span> {member.id}
        </li>
        <li>
          <span>Email</span> {member.email}
        </li>
        <li>
          <span>Phone</span> {member.phoneNumber}
        </li>
        <li>
          <span>Age</span> {member.age}
        </li>
        <li>
          <button className='btn-logout' onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </article>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    common: state.common,
  };
};

const mapDispatchToProps = {
  actionLogout,
  isAuthLogoutAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
