import React, { useState } from "react";

const GameApp = ({ games }) => {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentGame = games[currentGameIndex];
  const currentStep = currentGame.steps[currentStepIndex];

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentStepIndex < currentGame.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
      setCurrentStepIndex(0);
      setScore(0);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        // backgroundColor: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {showResult ? (
        <div
          style={{
            textAlign: "center",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1>All Games Completed!</h1>
          <p style={{ fontSize: "1.2rem" }}>
            Total Score: {score} /{" "}
            {games.reduce((total, game) => total + game.steps.length, 0)}
          </p>
        </div>
      ) : (
        <div>
          <h2
            style={{
              color: "#00796b",
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {`Game: ${currentGame.title}`}
          </h2>
          <h3
            style={{
              color: "#0288d1",
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            {`Step ${currentStepIndex + 1}: ${currentStep.step}`}
          </h3>
          <p
            style={{
              color: "#555",
              fontSize: "1.1rem",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            {currentStep.question}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
            }}
          >
            {currentStep.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.isCorrect)}
                style={{
                  color: "#fff",
                  backgroundColor: option.isCorrect ? "#4caf50" : "#ff4081",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "10px",
                  padding: "20px",
                  border: "none",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  width: "45%", // Ensure the buttons are side by side
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                <img
                  src={option.image}
                  alt={`Option ${index + 1}`}
                  style={{
                    width: "20rem", // Set a small width for the image
                    height: "30rem", // Set a small height for the image
                    objectFit: "cover", // Ensure the image doesn't stretch
                    marginBottom: "15px",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <span
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameApp;
