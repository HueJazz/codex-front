import './App.css';
import Home from './pages/Home';
import Book from './pages/Book';
import HomeLayout from './layouts/HomeLayout';
import GenreLayout from './layouts/GenreLayout';
import GenreOverview from './pages/GenreOverview';
import GenreTop from './pages/GenreTop';
import Library from './pages/Library';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"; 
import { getMe } from "./reducers/authReducer"

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route index element={<Home/>}/>
              <Route path="top" element={<GenreTop/>}/>
            </Route>
            <Route path="/books/:bookId" element={<Book/>}/>
            <Route path="genres/:genreName" element={<GenreLayout />}>
              <Route index element={<GenreOverview/>}/>
              <Route path="top" element={<GenreTop/>}/>
            </Route>
            <Route path="/library" element={<Library/>}/>
            <Route path="/sign-in" element={<Login />}/>
            <Route path="/sign-up" element={<Registration />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
