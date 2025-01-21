import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Modules from "./components/modules/Modules";
import ModulePage from "./components/modules/Modulepage";
import Vmission from "./components/vmission/VMission";
import bg from "./assets/image/abstract-bg.jpg";
import PreTest from "./components/modules/PreTest";
import GameApp from "./components/game/GameApp"; // Import GameApp
import games from "./components/game/game"; // Import games data

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleResetQuiz = () => {
    setQuizStarted(false);

    const navlanding = document.querySelector("nav");
    if (navlanding) navlanding.style.background = ""; // Reset additional custom background styles
  };

  useEffect(() => {
    if (!quizStarted) {
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${bg})`
      );
    }
  }, [quizStarted]);

  const GameWrapper = () => {
    const { slug } = useParams();
    const game = games.find((game) => game.slug === slug);

    if (!game) {
      return <div>Game not found!</div>;
    }

    return <GameApp games={[game]} />;
  };

  return (
    <Router>
      <div
        className="App"
        style={{
          overflowY: "scroll",
          maxHeight: "100vh",
        }}
      >
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
            {/* {games.map((game, index) => (
              <li key={index}>
                <Link to={`/game/${game.slug}`}>{game.title}</Link>
              </li>
            ))} */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/vmission" element={<Vmission />} />
          <Route path="/pretest" element={<PreTest />} />
          <Route
            path="/modules/:moduleId"
            element={
              <ModulePage
                quizStarted={quizStarted}
                setQuizStarted={setQuizStarted}
              />
            }
          />
          <Route path="/game/:slug" element={<GameWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
