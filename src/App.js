
import './App.css';

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Header from './layout/Header'
import Home from './components/Home'

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>

    </>
  );
}

export default App;
