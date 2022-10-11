import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// awesome icon
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './account.css';

const Signup = () => {
  const memberRef = useRef([]);

  const [memberState, setMemberState] = useState({
    id: '',
    pw: '',
    name: '',
    phoneNumber: '',
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

    if (validation) {
    } else {
      return;
    }
  };

  return (
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
          name='name'
          value={memberState.name}
          onChange={onChangeMemberState}
          placeholder='Name'
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
  );
};

export default Signup;
