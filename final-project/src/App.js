import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailsScreen from './details/index.js';
import Navigation from "./nav";
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation/>

      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      
      <Route path="/details" element={<DetailsScreen />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
