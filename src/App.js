import './App.css';
import './Components/Diary/Diary.css';

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// component
import Header from './Components/Header';
import About from './Components/About';
// diary
import DiaryList from './Components/Diary/List';
import DiaryEditor from './Components/Diary/Editor';

function App() {
  const [diaryList, setDiaryList] = useState([]);
  const diaryIdx = useRef(0);
  // localStorage.setItem('diary', JSON.stringify(dummyList));

  // 쵀초 한번
  useEffect(() => {
    /**
     * 1. localStorage에 있는 diary 를 조회하여 데이터를 가져옵니다.
     *    if localStorage에 diary 자체가 없다면 null을 반환해줍니다.
     *
     */
    let initDiary = localStorage.getItem('diary');

    // 만약 initDiary 가 null 이거나 '' 빈 문자열 이라면
    if (!initDiary) {
      return;
    }

    initDiary = JSON.parse(initDiary);

    if (initDiary.length === 0) {
      return;
    }

    setDiaryList(initDiary);

    diaryIdx.current = initDiary[0]['id'];
  }, []);

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(diaryList));
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

    console.log(delList);

    setDiaryList(delList);
  };

  return (
    <BrowserRouter basename='/base-couple-emotion-diary/'>
      <div className='App'>
        <Header />
        <article className='diary'>
          <Routes>
            <Route path='/' element={<About />} />
            <Route
              path='/list'
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
