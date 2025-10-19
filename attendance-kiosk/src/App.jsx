import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScreenSaver from "./pages/screenSaver";
import LandingPage from "./pages/landingPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScreenSaver />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
