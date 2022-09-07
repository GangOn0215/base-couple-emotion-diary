import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// component
import Header from './Components/Header';
// diary
import DiaryList from './Components/Diary/List';
import DiaryEditor from './Components/Diary/Editor';

const dummyList = [
  {
    id: 1,
    author: 'coxe',
    title: 'new diary 1',
    content: 'hi 1',
    emotion: 1,
    regDate: new Date().getTime(),
  },
  {
    id: 2,
    author: 'monkey',
    title: 'new diary 2',
    content: 'hi 2',
    emotion: 2,
    regDate: new Date().getTime(),
  },
];

function App() {
  const [diaryList, setDiaryList] = useState([]);
  const diaryIdx = useRef(0);
  // localStorage.setItem('diary', JSON.stringify(dummyList));

  useEffect(() => {
    let initDiary = localStorage.getItem('diary');
    if (initDiary == null || initDiary.length === 0) {
      return;
    }

    initDiary = JSON.parse(initDiary);

    setDiaryList(initDiary);

    if (initDiary != null) {
      diaryIdx.current = initDiary[0]['id'];
    }
  }, []);

  useEffect(() => {
    if (diaryList === []) {
      return;
    }
    if (diaryList.length > 0) {
      localStorage.setItem('diary', JSON.stringify(diaryList));
    }
  }, [diaryList]);

  const handleCreateList = (data) => {
    console.log(data);
    diaryIdx.current += 1;
    data.id = diaryIdx.current;

    setDiaryList([data, ...diaryList]);
  };

  const handleDelete = (dataId) => {
    if (dataId <= 0) {
      alert('조회한 정보를 찾을 수 없습니다.');
      return;
    }

    let delList = diaryList.filter((item) => item.id !== dataId);

    setDiaryList(delList);
  };

  return (
    <BrowserRouter basename='/base-couple-emotion-diary/'>
      <div className='App'>
        <Header />
        <article className='diary'>
          <Routes>
            <Route
              path='/'
              element={<DiaryList diaryList={diaryList} deleteList={handleDelete} />}
            />
            <Route path='/write' element={<DiaryEditor writeList={handleCreateList} />} />
          </Routes>
        </article>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
