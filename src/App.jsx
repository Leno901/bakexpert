import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Modules from "./components/modules/Modules";
import ModulePage from "./components/modules/Modulepage";
import Vmission from "./components/vmission/VMission";
import bg from "./assets/image/baking.jpg";

function App() {
  const [quizStarted, setQuizStarted] = useState(false); // State to track quiz status

  const handleResetQuiz = () => {
    setQuizStarted(false); // Reset quiz state
  };

  useEffect(() => {
    if (!quizStarted) {
      // Reset the background image to the default
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${bg})` // Use the imported bg image
      );
    }
  }, [quizStarted]); // Only run when quizStarted changes

  return (
    <Router>
      <div className="App">
        {/* Navigation links */}
        <nav className="nav-landing">
          <ul>
            <li>
              <Link to="/" onClick={handleResetQuiz}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/modules" onClick={handleResetQuiz}>
                Modules
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleResetQuiz}>
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Define the routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/vmission" element={<Vmission />} />
          <Route
            path="/modules/:moduleId"
            element={
              <ModulePage
                quizStarted={quizStarted}
                setQuizStarted={setQuizStarted}
              />
            }
          />{" "}
          {/* Dynamic route for each module */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
