import axios from 'axios';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import moment from 'moment';

const List = ({ auth, common, handleUpdate, handleDelete }) => {
  const nowTime = moment('2022-11-04T12:45:21.461Z').format('YYYY-MM-DD');
  console.log(nowTime);

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
    const config = { headers: { Authorization: cookies.x_auth } };
    axios.post(`${common.axiosUrl}/diary/deleteAll`, {}, config).then((res) => {
      if (res.data.status) {
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
                    <img src='/assets/image/bonobono_profile.jpg' alt='' />
                    <div className='info'>
                      <Link to={`/detail/row/${item._id}`}>
                        <p>
                          <span>Title</span> {item.title}
                        </p>
                      </Link>
                      <p className='regdate'>
                        <span>RegDate</span>
                        {moment(item.createdAt).format('YYYY-MM-DD HH:mm')}
                      </p>
                    </div>

                    {/* <div className='handleButton'>
                <button onClick={() => onClickDelete(item.id)}>delete</button>
                <button>
                  <Link to={`/edit/${item._id}`}>update</Link>
                </button>
                <button>
                  <Link to={`/detail/${item._id}`}>detail</Link>
                </button>
              </div> */}
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
