import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const List = ({ diaryList, handleUpdate, handleDelete }) => {
  const onClickDelete = (idx) => {
    handleDelete(idx);
  };

  return (
    <div className='list'>
      <h2>Diary List</h2>
      <div className='list-container'>
        {diaryList.map((item) => (
          <div className='list-item' key={item.id}>
            <p>
              <span>Author</span> {item.author}
            </p>
            <p>
              <span>Title</span> {item.title}
            </p>
            <p>
              <span>Content</span> {item.content}
            </p>
            <p>
              <span>Emotion</span> {item.emotion}
            </p>
            <p className='regdate'>
              <span>RegDate</span> {new Date(item.createAt).toDateString()}
            </p>
            <div className='handleButton'>
              <button onClick={() => onClickDelete(item.id)}>delete</button>
              <button>
                <Link to={`/edit/${item.id}`}>update</Link>
              </button>
            </div>
          </div>
        ))}
        <button>
          <Link to='/write'>Create Diary</Link>
        </button>
      </div>
    </div>
  );
};

export default List;

List.defaultProps = {
  diaryList: [],
};
