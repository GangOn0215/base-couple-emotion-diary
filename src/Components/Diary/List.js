import React, { useEffect } from 'react';

const List = ({ diaryList }) => {
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
            <p>
              <span>RegDate</span> {new Date(item.createAt).toDateString()}
            </p>
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
