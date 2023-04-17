import Display from '../Display/Display';
import NavBar from '../NavBar/NavBar';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from 'react';

import './App.css';
import PokeInfoPage from '../PokeInfoPage/PokeInfoPage';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {

  console.log('Rendering App...');
  return (
    <>
      <BrowserRouter>
        <NavBar />
       
        <Routes>
          <Route exact path="/" element={<Display />} />
          <Route exact path="/pokemon/:id" element={<PokeInfoPage/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </BrowserRouter>
      <ScrollToTop />
    </>
  );
}


export default App;
