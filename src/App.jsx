import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Modules from "./components/modules/Modules";
import ModulePage from "./components/modules/ModulePage"; // New page to handle dynamic modules

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation links */}
        <nav className="nav-landing">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/modules">Modules</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId" element={<ModulePage />} />{" "}
          {/* Dynamic route for each module */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
