import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { connect } from 'react-redux';

//reducer
import { actionLogout } from '../../redux/auth/axios/action';

const Profile = ({ axiosAuth, actionLogout }) => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    id: '',
    email: '',
    phoneNumber: '',
    age: '',
  });
  const [cookies, removeCookie] = useCookies(['x_auth']);
  useEffect(() => {
    if (!axiosAuth.isAuth) {
      navigate('/login');

      return;
    } else {
      const memberInfo = axiosAuth.memberInfo.data.data;
      console.log(memberInfo);
      setMember({
        id: memberInfo.id,
        email: memberInfo.email,
        phoneNumber: memberInfo.phoneNumber,
        age: memberInfo.age,
      });
    }
  }, [axiosAuth, navigate]);

  const handleLogout = () => {
    removeCookie('x_auth');

    actionLogout();
    // handleAuth(false);
  };

  return (
    <article className='profile'>
      <ul>
        <li className='bono-img'>
          <span>Profile</span> <img src={'/assets/image/bonobono_profile.jpg'} alt='bono' />
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
    axiosAuth: state.axiosAuth,
  };
};

const mapDispatchToProps = {
  actionLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
