import '@fortawesome/fontawesome-free/css/all.min.css';
import Tuiter from "./tuiter";
import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router";
import "./App.css"

function App() {
    return (
        <BrowserRouter>
            <div className="container app-container">
                <Routes>
                    <Route path="/" element={<Navigate to="/tuiter/home" />} />
                    <Route path="/tuiter/*" element={<Tuiter />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
export default App;