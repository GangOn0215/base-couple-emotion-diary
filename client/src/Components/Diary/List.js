import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const List = ({ diaryList, handleUpdate, handleDelete }) => {
  let getActionUrl = window.location.origin;
  if (process.env.NODE_ENV === 'development') {
    getActionUrl = 'http://localhost:3001';
  }

  const [cookies, removeCookie] = useCookies(['x_auth']);
  const [lists, setLists] = useState([]);

  const onClickDelete = (idx) => {
    handleDelete(idx);
  };

  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  useEffect(() => {
    const config = { headers: { Authorization: cookies.x_auth } };
    axios.post(`${getActionUrl}/diary/lists`, {}, config).then((res) => {
      if (res.data) {
        console.log(res.data);
        setLists(res.data.list);
      }
    });
  }, []);

  return (
    <div className='list'>
      <div className='list-container'>
        {lists.map((item) => (
          <div className='list-item' key={item._id}>
            <Link to={`/detail/row/${item._id}`}>
              <p>
                <span>Title</span> {item.title}
              </p>
            </Link>
            <p className='regdate'>
              <span>RegDate</span>
              {item.createdAt ? new Date(item.createdAt).toDateString() : '0000-00-00 00:00:00'}
            </p>
            <div className='handleButton'>
              <button onClick={() => onClickDelete(item.id)}>delete</button>
              <button>
                <Link to={`/edit/${item.id}`}>update</Link>
              </button>
              <button>
                <Link to={`/detail/${item.id}`}>detail</Link>
              </button>
            </div>
          </div>
        ))}
        <button ref={buttonClick} onClick={onHandleClick} className='link-button create'>
          <Link to='/write'>다이어리 작성하기</Link>
        </button>
      </div>
    </div>
  );
};

export default List;

List.defaultProps = {
  diaryList: [],
};
