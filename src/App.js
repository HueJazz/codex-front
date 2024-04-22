import './App.css';
import Home from './pages/Home';
import HomeLayout from './layouts/HomeLayout';
import GenreLayout from './layouts/GenreLayout';
import GenreOverview from './pages/GenreOverview';
import GenreTop from './pages/GenreTop';
import Library from './components/Library';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux"; 
import { getMe } from "./reducers/authReducer"
import BookInfo from './components/BookInfo';
import BookSearch from './components/BookSearch';
import ListInfo from './components/ListInfo';
import UserProfile from './components/UserProfile';
import UserReviews from './components/UserReviews';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route index element={<Home/>}/>
              <Route path="search/:item" element={<BookSearch/>}/>
              <Route path="/books/:bookId" element={<BookInfo/>}/>
              <Route path="/library" element={<Library/>}/>
              <Route path="/users/:userid" element={<UserProfile />}/>
              <Route path="/lists/:listId" element={<ListInfo/>}/>
              <Route path="/users/:userid/reviews" element={<UserReviews />}/>
              <Route path="/" element={<GenreLayout />}>
                <Route path="genres/:genreName"  element={<GenreOverview/>}/>
                <Route path="genres/:genreName/top" element={<GenreTop/>}/>
              </Route>
            </Route>
            <Route path="/sign-in" element={<Login />}/>
            <Route path="/sign-up" element={<Registration />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
