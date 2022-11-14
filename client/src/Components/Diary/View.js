import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
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

const View = ({ auth, common }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [lists, setLists] = useState([]);
  const [cookies] = useCookies(['x_auth']);
  const [loading, setLoading] = useState(false);
  const [diaryIcon, setDiaryIcon] = useState(false);
  const mood = [
    { icon: faFaceAngry, color: 'red' },
    { icon: faFaceFrown, color: 'red' },
    { icon: faFaceMeh, color: 'orange' },
    { icon: faFaceGrin, color: 'blue' },
    { icon: faFaceGrinBeam, color: 'blue' },
  ];
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
        if (res.data.status) {
          setLists(res.data.diary);
        }
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (lists.length <= 0) {
      return;
    }

    setDiaryIcon(
      <FontAwesomeIcon
        icon={mood[lists.mood - 1].icon}
        className={`list-svg ${mood[lists.mood - 1].color}`}
      />,
    );
  }, [lists]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          {lists ? (
            <div className='detail'>
              <div className='image'>
                <img src='/assets/image/couple_wallpaper.jpg' alt='diaryImage' />
              </div>
              <div className='info'>
                <div className='user'>
                  <div className='left'>
                    <img src='/assets/image/bonobono_profile.jpg' alt='userImage' />
                    <p>admin</p>
                  </div>
                  <div className='right'>{diaryIcon ? diaryIcon : ''}</div>
                </div>
                <div className='text'>
                  <div className='header'>
                    <span className='title'>{lists.title}</span>
                    <span className='date'>{new Date(lists.diaryDate).toLocaleDateString()}</span>
                  </div>
                  <p>{lists.content}</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </>
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
