import React, { useEffect } from 'react';

const List = ({ diaryList, deleteList }) => {
  const onClickDelete = (idx) => {
    deleteList(idx);
  };
  return (
    <div className='home'>
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
            <div>
              <button onClick={() => onClickDelete(item.id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

List.defaultProps = {
  diaryList: [],
};
