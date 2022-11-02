import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
// import { falImage}

const Editor = ({ handleCreate, handleUpdate, isEdit, diaryList }) => {
  const { dataIdx } = useParams();

  const inputTitle = useRef();
  const textareaContent = useRef();
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: '',
    content: '',
    image: '',
    emotion: 3,
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
    checkValidation();

    alert('성공적으로 데이터 추가 하였습니다.');

    handleCreate(state);

    // 데이터를 성공적으로 추가 했다면 초기화 시켜줍니다.
    setState({
      title: '',
      content: '',
      emotion: 1,
      updateAt: null,
    });

    navigate('/list');
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

      return;
    }

    if (state.content.length < 1) {
      textareaContent.current.focus();

      return;
    }
  };

  useEffect(() => {
    if (isEdit) {
      if (diaryList.length > 0) {
        let tempList = diaryList.find((item) => item.id === parseInt(dataIdx));

        setState({
          title: tempList.title,
          content: tempList.content,
          emotion: tempList.emotion,
          createAt: tempList.createAt,
          updateAt: tempList.updateAt,
        });
      }
    }
  }, []);

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
        {/* <FontAwesomeIcon icon={['fad', 'stroopwafel']} /> */}
      </div>
      <input
        ref={inputTitle}
        type='text'
        name='title'
        placeholder='title'
        value={state.title}
        onChange={handleChangeState}
      />
      <textarea
        ref={textareaContent}
        type='text'
        name='content'
        placeholder='content'
        value={state.content}
        onChange={handleChangeState}
        spellCheck='false'
      />
      <select name='emotion' value={state.emotion ? state.emotion : 3} onChange={handleChangeState}>
        <option value={1}>very bad</option>
        <option value={2}>bad</option>
        <option value={3}>soso</option>
        <option value={4}>good</option>
        <option value={5}>very good</option>
      </select>
      <div className='button-wrap'>
        <button onClick={isEdit ? handleUpdateSubmit : handleCreateSubmit}>Save</button>
        <button ref={buttonClick} onClick={onHandleClick} className='link-button'>
          <Link to='/list'>List</Link>
        </button>
      </div>
    </div>
  );
};

Editor.defaultProps = {
  isEdit: false,
};

export default Editor;
