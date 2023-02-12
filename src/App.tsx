import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import BookMark from './pages/BookMark';
import DetailItem from './pages/DetailItem';
import Home from './pages/Home';
import Login from './pages/Login';
import MyCart from './pages/MyCart';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Recommend from './pages/Recommend';
import Register from './pages/Register';
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/detail/:id' element={<DetailItem />} />
          <Route path='/search' element={<Search />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='/mycart' element={<MyCart />} />
          <Route path='/bookmark' element={<BookMark />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
