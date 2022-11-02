import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const List = ({ diaryList, handleUpdate, handleDelete }) => {
  const onClickDelete = (idx) => {
    handleDelete(idx);
  };

  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  return (
    <div className='list'>
      <div className='list-container'>
        {diaryList.map((item) => (
          <div className='list-item' key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <p>
                <span>Title</span> {item.title}
              </p>
            </Link>
            <p className='regdate'>
              <span>Author</span> {item.author}
            </p>
            <p className='regdate'>
              <span>RegDate</span> {new Date(item.createAt).toDateString()}
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
