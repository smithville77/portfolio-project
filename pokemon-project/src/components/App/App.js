import Display from '../Display/Display';
import NavBar from '../NavBar/NavBar';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';
import PokeInfoPage from '../PokeInfoPage/PokeInfoPage.';

function App() {
  return (
    <>
      
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/:id" element={<PokeInfoPage/>} />
        </Routes>
      </BrowserRouter>
      <ScrollToTop />
    </>
   
  );
}

export default App;
