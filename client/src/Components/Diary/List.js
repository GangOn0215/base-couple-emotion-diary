import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceAngry, // angry
  faFaceGrin, // happy
  faFaceSadTear, // sad
  faFaceMeh, // soso
  faFaceFrown, // 서운
  faFaceGrinBeam, // very happy
} from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
const List = ({ auth, common, handleUpdate, handleDelete }) => {
  const nowTime = moment('2022-11-04T12:45:21.461Z').format('YYYY-MM-DD');

  const mood = [
    { icon: faFaceAngry, color: 'red' },
    { icon: faFaceFrown, color: 'red' },
    { icon: faFaceMeh, color: 'orange' },
    { icon: faFaceGrin, color: 'blue' },
    { icon: faFaceGrinBeam, color: 'blue' },
  ];

  const [cookies, removeCookie] = useCookies(['x_auth']);
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState([]);

  const onClickDelete = (idx) => {
    handleDelete(idx);
  };

  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  const onHandleDeleteAll = () => {
    if (!window.confirm('정말 삭제하시겠습니까? 복구 불가능 합니다.')) {
      return;
    }

    const config = { headers: { Authorization: cookies.x_auth } };
    axios.post(`${common.axiosUrl}/diary/deleteAll`, {}, config).then((res) => {
      if (res.data.status) {
        setLists([]);
        alert('성공');
      } else {
        alert('권한 없음');
      }
    });
  };

  useLayoutEffect(() => {
    if (auth.isAuth && cookies.x_auth) {
      setIsLoading(true);
      const config = { headers: { Authorization: cookies.x_auth } };
      axios.post(`${common.axiosUrl}/diary/lists`, {}, config).then((res) => {
        setIsLoading(false);
        if (res.data) {
          setLists(res.data.list);
        }
      });
    } else {
      setLists([]);
    }
  }, [auth]);

  return (
    <>
      {!isLoading ? (
        <>
          <div className='list'>
            <div className='list-container'>
              {lists ? (
                lists.map((item) => (
                  <div className='list-item' key={item._id}>
                    <div className='info'>
                      <img src='/assets/image/bonobono_profile.jpg' alt='' />
                      <div className='text'>
                        <p className='regdate'>{moment(item.diaryDate).format('YYYY/MM/DD')}</p>
                        <Link to={`/diary/view?id=${item._id}`}>
                          <p>{item.title}</p>
                        </Link>
                      </div>
                    </div>
                    {/* 1 2 : red 3: orange 4 5: blue */}
                    <FontAwesomeIcon
                      icon={mood[parseInt(item.mood) - 1].icon}
                      className={`list-svg ${mood[parseInt(item.mood) - 1].color}`}
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
              <button ref={buttonClick} onClick={onHandleClick} className='link-button create'>
                <Link to='/diary/write'>다이어리 작성하기</Link>
              </button>
              <button onClick={onHandleDeleteAll} className='link-button'>
                전체 삭제
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    common: state.common,
  };
};

List.defaultProps = {
  diaryList: [],
};

export default connect(mapStateToProps)(List);
