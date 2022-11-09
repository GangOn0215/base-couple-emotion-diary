import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';

const View = ({ auth, common }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lists, setLists] = useState([]);
  const [cookies] = useCookies(['x_auth']);

  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  useEffect(() => {
    const config = { headers: { Authorization: cookies.x_auth } };

    axios.post(`${common.axiosUrl}/diary/row`, {}, config).then((res) => {
      if (res.data) {
        console.log(res);
      }
    });
  }, []);

  return (
    <div className='detail'>
      <div className='info'>
        {/* <p>
          <span>Title</span> {detailData.title}
        </p>
        <p>
          <span>Author</span> {detailData.author}
        </p>
        <p>
          <span>Content</span> {detailData.content}
        </p>
        <p className='date'>
          <span>Emotion</span> {detailData.emotion}
        </p>
        <p className='date'>
          <span>CreateAt</span> {new Date(detailData.createAt).toLocaleDateString()}
        </p>
        <p className='date'>
          <span>UpdateAt</span> {new Date(detailData.updateAt).toLocaleDateString()}
        </p> */}
      </div>
      <button ref={buttonClick} onClick={onHandleClick} className='link-button'>
        <Link to={`/list`}>List</Link>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    common: state.common,
  };
};

export default connect(mapStateToProps)(View);
