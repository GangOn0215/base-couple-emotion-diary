import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Profile = ({handleAuth, isAuth}) => {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState({
    id: '',
    email: '',
    phoneNumber: '',
    age: '',
  })

  let getTodoUrl = window.location.origin;

  if (process.env.NODE_ENV === 'development') {
    getTodoUrl = 'http://localhost:3001';
  }

  useEffect(() => {
    // 로그인 유저인지 확인
    async function fetchCheckUser() {
      const config = { headers: { authorization: cookies.x_auth } };
      const result = await axios.post(`${getTodoUrl}/account/row`, {}, config);

      if (result.status === 200) {
        setIsLoading(false);
        if(result.data.isAuth) {
          handleAuth(true);
          const user = result.data.user;
          
          console.log(result.data.user.id);

          setMember({
            id: user.id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            age: user.age
          });

        } else {
          handleAuth(false);
          removeCookie('x_auth');

          navigate('/login');
        }
      }
    }

    fetchCheckUser();
  }, [isAuth]);

  const handleLogout = () => {
    removeCookie('x_auth');

    handleAuth(false);
  }
  
  if(isLoading) {
    return (<></>)
  }

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
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </article>
  );
};

export default Profile;
