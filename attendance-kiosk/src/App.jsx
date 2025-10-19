import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScreenSaver from "./pages/screenSaver";
import LandingPage from "./pages/landingPage";
import SystemService from "./pages/systemService";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenSaver />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/systemService" element={<SystemService />} />
      </Routes>
    </Router>
  );
}

export default App;
