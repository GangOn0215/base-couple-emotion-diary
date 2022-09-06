import { useState, useRef } from 'react';

const Editor = ({ writeList }) => {
  const inputAuthor = useRef();
  const inputTitle = useRef();
  const textareaContent = useRef();

  const [state, setState] = useState({
    author: '',
    title: '',
    content: '',
    emotion: 1,
    createAt: new Date().getTime(),
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
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

    writeList(state);
  };

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
      <button onClick={handleSubmit}>Save Diary</button>
    </div>
  );
};

export default Editor;
