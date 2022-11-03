import './App.css';
import './Components/Diary/Diary.css';

import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// Component
import Header from './Components/Header';
import About from './Components/About';
// Diary
import DiaryList from './Components/Diary/List';
import DiaryEditor from './Components/Diary/Editor';
import DiaryDetail from './Components/Diary/Detail';
// Account
import Login from './Components/Account/Login';
import Signup from './Components/Account/Signup';
import Profile from './Components/Account/Profile';

function App() {
  const [diaryList, setDiaryList] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [corsURL, setCorsURL] = useState(window.location.origin);
  const diaryIdx = useRef(0);

  // 최초 한번
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setCorsURL('http://localhost:3001');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(diaryList));
  }, [diaryList]);

  const handleAuth = (auth) => {
    setIsAuth(auth);
  };

  return (
    <CookiesProvider>
      <BrowserRouter>
        <div className='App'>
          <Header />
          <article className='diary'>
            <Routes>
              <Route path='/' element={<About />} />
              <Route path='/diary/list' element={<DiaryList />} />
              <Route path='/diary/write' element={<DiaryEditor />} />
              <Route path='/edit/:dataIdx' element={<DiaryEditor />} />
              <Route path='/detail/:dataIdx' element={<DiaryDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </article>
          <footer></footer>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
