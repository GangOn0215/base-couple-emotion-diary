import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Editor = ({ handleCreate, handleUpdate, isEdit, diaryList }) => {
  const { dataIdx } = useParams();

  const inputAuthor = useRef();
  const inputTitle = useRef();
  const textareaContent = useRef();
  const navigate = useNavigate();
  const [state, setState] = useState({
    author: '',
    title: '',
    content: '',
    emotion: 1,
    createAt: new Date().getTime(),
    updateAt: null,
  });

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
      author: '',
      title: '',
      content: '',
      emotion: 1,
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
    if (state.author.length < 1) {
      inputAuthor.current.focus();

      return;
    }

    if (state.title.length < 1) {
      inputTitle.current.focus();

      return;
    }

    if (state.content.length < 1) {
      textareaContent.current.focus();

      return;
    }
  }

  useEffect(() => {
    if (isEdit) {
      if (diaryList.length > 0) {
        let tempList = diaryList.find((item) => item.id === parseInt(dataIdx));

        setState({
          author: tempList.author,
          title: tempList.title,
          content: tempList.content,
          emotion: tempList.emotion,
          createAt: tempList.createAt,
        });
      }
    }
  }, []);

  return (
    <div className='editor'>
      <h2>Today Diary</h2>
      <input
        ref={inputAuthor}
        type='text'
        name='author'
        placeholder='author'
        value={state.author}
        onChange={handleChangeState}
      />
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
      />
      <select name='emotion' value={state.emotion} onChange={handleChangeState}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button onClick={isEdit ? handleUpdateSubmit : handleCreateSubmit}>Save Diary</button>
    </div>
  );
};

Editor.defaultProps = {
  isEdit: false,
};

export default Editor;
