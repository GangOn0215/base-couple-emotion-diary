import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { connect } from 'react-redux';

//reducer
import { actionLogout } from '../../redux/auth/axios/action';

const Profile = ({ axiosAuth, actionLogout }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['x_auth']);
  useEffect(() => {
    if (!axiosAuth.isAuth) {
      navigate('/login');

      return;
    }
  }, [axiosAuth, navigate]);

  const [member, setMember] = useState({
    id: '',
    email: '',
    phoneNumber: '',
    age: '',
  });

  // useEffect(() => {
  //   // 로그인 유저인지 확인
  //   async function fetchCheckUser() {
  //     const config = { headers: { authorization: cookies.x_auth } };
  //     const result = await axios.post(`${getTodoUrl}/account/row`, {}, config);

  //     if (result.status === 200) {
  //       setIsLoading(false);
  //       if (result.data.isAuth) {
  //         const user = result.data.user;

  //         console.log(result.data.user.id);

  //         setMember({
  //           id: user.id,
  //           email: user.email,
  //           phoneNumber: user.phoneNumber,
  //           age: user.age,
  //         });
  //       } else {
  //         removeCookie('x_auth');

  //         navigate('/login');
  //       }
  //     }
  //   }

  //   fetchCheckUser();
  // }, []);

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
