import './App.css';
import './Components/Diary/Diary.css';

import React, { useState, useEffect, useRef, createContext } from 'react';
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

export const MyContext = createContext(1);

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

    // axios.get(`${corsURL}/todos/list`).then((res) => console.log(res.data));
  }, []);

  useEffect(() => {
    localStorage.setItem('diary', JSON.stringify(diaryList));
  }, [diaryList]);

  const handleCreate = (data) => {
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

  const handleUpdate = (dataIdx, updateData) => {
    if (dataIdx <= 0) {
      alert('조회한 정보를 찾을 수 없습니다.');
      return;
    }

    updateData.updateAt = new Date().getTime();

    let updateList = diaryList.map((item) =>
      parseInt(item.id) === parseInt(dataIdx) ? { ...updateData, id: parseInt(dataIdx) } : item,
    );

    setDiaryList(updateList);
  };

  const handleAuth = (auth) => {
    setIsAuth(auth);
  };

  return (
    <MyContext.Provider value={{isAuth, handleAuth}}>
      <CookiesProvider>
        <BrowserRouter>
          <div className='App'>
            {/* <Header handleAuth={handleAuth} isAuth={isAuth} /> */}
            <Header />
            <article className='diary'>
              <Routes>
                <Route path='/' element={<About />} />
                <Route
                  path='/list'
                  element={<DiaryList diaryList={diaryList} handleDelete={handleDelete} />}
                />
                <Route path='/write' element={<DiaryEditor handleCreate={handleCreate} />} />
                <Route
                  path='/edit/:dataIdx'
                  element={
                    <DiaryEditor isEdit={true} diaryList={diaryList} handleUpdate={handleUpdate} />
                  }
                />
                <Route path='/detail/:dataIdx' element={<DiaryDetail diaryList={diaryList} />} />
                <Route path='/login' element={<Login handleAuth={handleAuth} isAuth={isAuth} />} />
                <Route
                  path='/signup'
                  element={<Signup handleAuth={handleAuth} isAuth={isAuth} />}
                />
                <Route
                  path='/profile'
                  element={<Profile handleAuth={handleAuth} isAuth={isAuth} />}
                />
              </Routes>
            </article>
            <footer></footer>
          </div>
        </BrowserRouter>
      </CookiesProvider>
    </MyContext.Provider>
  );
}

export default App;
