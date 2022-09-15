import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Detail = ({ diaryList }) => {
  const { dataIdx } = useParams();

  const detailData = diaryList.find((item) => item.id === parseInt(dataIdx));

  console.log(detailData);

  return (
    <div className='detail'>
      <div className='info'>
        <p>
          <span>Title</span> {detailData.title}
        </p>
        <p>
          <span>Author</span> {detailData.author}
        </p>
        <p className='date'>
          <span>Emotion</span> {detailData.emotion}
        </p>
        <p className='date'>
          <span>CreateAt</span> {new Date(detailData.createAt).toLocaleDateString()}
        </p>
        <p>
          <span>Content</span> {detailData.content}
        </p>
      </div>
      <button>
        <Link to={`/list`}>List</Link>
      </button>
    </div>
  );
};

export default Detail;
