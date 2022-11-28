import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  faFaceAngry, // angry
  faFaceGrin, // happy
  faFaceSadTear, // sad
  faFaceMeh, // soso
  faFaceFrown, // 서운
  faFaceGrinBeam, // very happy
} from '@fortawesome/free-solid-svg-icons';

const Editor = ({ auth, common, handleCreate, handleUpdate, isEdit, diaryList }) => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['x_auth']);
  const { dataIdx } = useParams();
  const inputTitle = useRef();
  const textareaContent = useRef();
  const [state, setState] = useState({
    title: '',
    content: '',
    image: '',
    emotion: 3,
    diaryDate: new Date(),
    createAt: new Date().getTime(),
    updateAt: null,
  });

  const [prevImage, setPrevImage] = useState({
    status: false,
    src: '',
  });

  const prevImageRef = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = () => {
    if (!auth.isAuth || !cookies.x_auth) {
      navigate('/login');

      return;
    }

    if (!checkValidation()) {
      alert('유효성 검사 실패');

      return;
    }

    const config = { headers: { Authorization: cookies.x_auth } };
    axios.post(`${common.axiosUrl}/diary/insert`, state, config).then((res) => {
      if (res.data) {
        console.log(res);
      }
    });

    // 데이터를 성공적으로 추가 했다면 초기화 시켜줍니다.
    setState({
      title: '',
      content: '',
      emotion: 1,
      updateAt: null,
    });

    navigate('/diary/list');
  };

  const handleUpdateSubmit = () => {
    checkValidation();

    handleUpdate(dataIdx, state);

    alert('업데이트 하였습니다.');

    navigate(`/edit/${dataIdx}`);
  };

  const checkValidation = () => {
    if (state.title.length < 1) {
      inputTitle.current.focus();

      return false;
    }

    if (state.content.length < 1) {
      textareaContent.current.focus();

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!auth.isAuth || !cookies.x_auth) {
      navigate('/login');

      return;
    }
  }, [auth, cookies.x_auth, navigate]);

  const buttonClick = useRef();

  const onHandleClick = () => {
    buttonClick.current.children[0].click();
  };

  const onChangeImageFile = (e) => {
    const reader = new FileReader();

    reader.onload = ({ target }) => {
      setPrevImage({
        status: true,
        src: target.result,
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (prevImage.status) {
      prevImageRef.current.src = prevImage.src;
      prevImageRef.current.style.display = 'block';
    }
  }, [prevImage]);

  return (
    <div className='editor'>
      <div className='image-container'>
        <label htmlFor='diary-img'>
          {!prevImage.status ? <FontAwesomeIcon icon={faImage} /> : <></>}
          <img id='preview-img' ref={prevImageRef} src='' alt='' />
        </label>
        <input type='file' id='diary-img' accept='image/*' onChange={onChangeImageFile} />
      </div>
      <DatePicker
        selected={state.diaryDate}
        showPopperArrow={false}
        dateFormat='yyyy-MM-dd'
        onChange={(date) => {
          let data = { target: { name: 'diaryDate', value: date } };

          handleChangeState(data);
        }}
      />
      <input    ref={inputTitle}      type='text' name='title'   placeholder='title'   value={state.title}   onChange={handleChangeState} />
      <textarea ref={textareaContent} type='text' name='content' placeholder='content' value={state.content} onChange={handleChangeState} spellCheck='false' />
      <div className="checkbox-wrap">
        <div className="item">
          <input type="checkbox" id="isPrivate" />
          <label htmlFor="isPrivate">비밀</label> 
        </div>
        <div className="item">
          <input type="checkbox" id="isCouple" />
          <label htmlFor="isCouple">애인만 공개</label> 
        </div>
      </div>
      <select name='emotion' value={state.emotion ? state.emotion : 3} onChange={handleChangeState}>
        <option value={1}>very bad <FontAwesomeIcon icon={faFaceAngry}/> </option>
        <option value={2}>bad</option>
        <option value={3}>soso</option>
        <option value={4}>good</option>
        <option value={5}>very good</option>
      </select>
      <div className='button-wrap'>
        <button className='link-button' onClick={isEdit ? handleUpdateSubmit : handleCreateSubmit}>
          Save
        </button>
        <button ref={buttonClick} onClick={onHandleClick} className='link-button'>
          <Link to='/diary/list'>List</Link>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    common: state.common,
  };
};

Editor.defaultProps = {
  isEdit: false,
};

export default connect(mapStateToProps)(Editor);
