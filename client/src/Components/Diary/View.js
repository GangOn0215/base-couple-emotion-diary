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
  const [loading, setLoading] = useState(false);
  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  useEffect(() => {
    setLoading(true);
    const config = { headers: { Authorization: cookies.x_auth } };

    axios
      .post(`${common.axiosUrl}/diary/row?id=${searchParams.get('id')}`, {}, config)
      .then((res) => {
        setLoading(false);
        if (res.data.status) {
          setLists(res.data.diary);
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <div className='detail'>
          <div className='info'>
            <p>
              <span>Date</span> {new Date(lists.diaryDate).toLocaleDateString()}
            </p>
            <p>
              <span>Title</span> {lists.title}
            </p>
            <p>
              <span>Content</span> {lists.content}
            </p>
            <p className='date'>
              <span>Emotion</span> {lists.mood}
            </p>
            <p className='date'>
              <span>CreateAt</span> {new Date(lists.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button ref={buttonClick} onClick={onHandleClick} className='link-button'>
            <Link to={`/diary/list`}>List</Link>
          </button>
        </div>
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

export default connect(mapStateToProps)(View);
