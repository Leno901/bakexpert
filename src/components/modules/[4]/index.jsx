import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";

const questions = [
  {
    question: "A Swiss roll is also called:",
    answer: "d) All of the above",
    options: [
      "a) Jelly roll",
      "b) Biscuit roll",
      "c) Sponge roll",
      "d) All of the above",
    ],
  },
  {
    question: "The core component of a Swiss roll is:",
    answer: "c) Thin sponge cake",
    options: [
      "a) Choux pastry",
      "b) Puff pastry",
      "c) Thin sponge cake",
      "d) Shortbread crust",
    ],
  },
  {
    question: "What is the common shape of a Swiss roll?",
    answer: "c) Rectangular",
    options: [
      "a) Round",
      "b) Square",
      "c) Rectangular",
      "d) Triangular",
    ],
  },
  {
    question: "What is commonly used to fill a Swiss roll?",
    answer: "c) Whipped cream, jam, or other fillings",
    options: [
      "a) Only whipped cream",
      "b) Only jam",
      "c) Whipped cream, jam, or other fillings",
      "d) Only chocolate ganache",
    ],
  },
  {
    question: "The sponge cake for a Swiss roll is typically baked in what type of pan?",
    answer: "c) Rectangular baking sheet",
    options: [
      "a) Bundt pan",
      "b) Springform pan",
      "c) Rectangular baking sheet",
      "d) Muffin tin",
    ],
  },
];


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Module4 = ({ quizStarted, setQuizStarted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showOverview, setShowOverview] = useState(true);
  const [showOverview2, setShowOverview2] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState(""); // New state for user name
  const [quizCompleted, setQuizCompleted] = useState(false);

  const gifs = [gif1, gif2, gif3, gif4];

  useEffect(() => {
    if (quizStarted) {
      // Set the initial background image immediately when the quiz starts
      const initialGif = gifs[Math.floor(Math.random() * gifs.length)];
      document.documentElement.style.setProperty(
        "--background-image",
        `url(${initialGif})`
      );

      // Start the interval to change the background image every 3 seconds
      const interval = setInterval(() => {
        const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
        document.documentElement.style.setProperty(
          "--background-image",
          `url(${randomGif})`
        );
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval); // Cleanup on unmount or when quiz is not started
    }
  }, [quizStarted]); // Only run when quizStarted changes

  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };

  const handleAnswer = (choice) => {
    if (selectedAnswer !== null) return; // Prevent answer change
    const correct = choice === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setSelectedAnswer(choice);
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      setQuizCompleted(true); // Mark the quiz as complete
    } else {
      setCurrentQuestion(currentQuestion + 1); // Go to the next question
      resetAnswerState(); // Reset the answer state for the next question
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
    resetAnswerState();
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    resetAnswerState();
  };

  const handleStartQuiz = () => {
    if (userName.trim() === "") {
      alert("Please enter your name before starting the quiz.");
      return;
    }
    setQuizStarted(true);
  };

  const handleProceedToOverview = () => {
    setShowVideo(false);
    setShowOverview(true);
  };

  const handleShowUser = () => {
    setShowVideo(false);
    setShowUser(true);
  };

  const handleProceedToOverview2 = () => {
    setShowOverview(false);
    setShowOverview2(true);
  };

  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleShowVideo = () => {
    setShowVideo(true);
    setShowOverview2(false);
    setShowOverview(false);
  };

  const question = questions[currentQuestion];

  React.useEffect(() => {
    setShuffledOptions(shuffleArray([...questions[currentQuestion].options]));
  }, [currentQuestion]);

  if (showVideo && !quizStarted) {
    return (
      <Container>
        {/* <ProceedButton onClick={handleStartQuiz}>Proceed to Quiz</ProceedButton> */}
        {/* {showVideo && ( */}
        <VideoContainer>
          <VideoWrapper>
            <VideoTitle>Difference recipe of Swiss Roll</VideoTitle>
            <iframe
              width="45%"
              height="80%"
              src="https://www.youtube.com/embed/lIhrNMEp3oM?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onEnded={handleVideoEnd}
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>Example of Swiss Roll</VideoTitle>
            <iframe
              width="45%"
              height="80%"
              src="https://www.youtube.com/embed/MZEUpCZFlko?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onEnded={handleVideoEnd}
            />
          </VideoWrapper>
        </VideoContainer>
        <ProceedButton onClick={handleShowUser}>Proceed to Quiz</ProceedButton>
        {/* )} */}
      </Container>
    );
  }

  if (showOverview && !quizStarted) {
    return (
      <Container>
        <h2>Swiss roll Overview</h2>
        <p>
          A Swiss roll is a type of sponge cake that is spread with filling, such as jam, cream, or chocolate, and then rolled into a spiral shape. Known for its light, airy texture and visually striking swirl, the Swiss roll is a versatile dessert enjoyed in many variations across the globe. Despite its name, the Swiss roll is believed to have originated in Central Europe rather than Switzerland, although its exact origins are unclear.
          By the end of this Lesson, students will have the practical skills to design and create beautiful, flavorful Swiss roll, enhancing their competencies as future pastry chefs or culinary professionals.        </p>
        <p>
        By the end of this Lesson, students will have the practical skills to design and create beautiful, flavorful Gateaux, enhancing their competencies as future pastry chefs or culinary professionals.
        </p>
        <h2>Introduction to Swiss roll</h2>
        <p>
        What is swiss roll? A Swiss roll is a type of rolled sponge cake filled with cream, jam, or other fillings, creating a distinctive spiral pattern when sliced. It is made by baking a thin, flexible layer of sponge cake, spreading it with filling, and then rolling it tightly. Known for its light texture and visual appeal, the Swiss roll is a versatile dessert enjoyed in many varieties and flavors around the world.        </p>
        <ProceedButton onClick={handleProceedToOverview2}>
          Proceed to Types
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview2 && !quizStarted) {
    return (
      <Container>
        <h2>Types of Swiss roll :</h2>
        <p>
          <strong>1. Classic Jam Roll:</strong>  Filled with fruit jam or preserves, often dusted with powdered sugar on the outside.
        </p>
        <p>
          <strong>2. Chocolate Swiss Roll:</strong> Made with chocolate sponge and filled with chocolate ganache or cream.
        </p>
        <p>
          <strong>3. Cream-Filled Roll:</strong> Contains whipped cream or buttercream, sometimes combined with fresh fruits.
        </p>
        <p>
          <strong>4. Holiday-Themed Rolls:</strong> In France, a version called bûche de Noël (Yule log) is popular around Christmas, decorated to look like a log with chocolate or buttercream “bark.”
        </p>
        <ProceedButton onClick={handleShowVideo}>
          Proceed to Video
        </ProceedButton>
      </Container>
    );
  }

  if (showUser && !quizStarted) {
    return (
      <Container>
        <h2>Enter Your Name</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <ProceedButton onClick={handleStartQuiz}>Start Quiz</ProceedButton>
      </Container>
    );
  }

  if (quizStarted && !quizCompleted) {
    return (
      <Container>
        <ResetButton onClick={handleReset}>Reset Quiz</ResetButton>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Swiss roll Quiz</h1>
          <ScoreDisplay>
            {userName}'s Score: {score}
          </ScoreDisplay>
          <p>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <Question
            isCorrect={isCorrect}
            isIncorrect={!isCorrect && selectedAnswer}
          >
            {question.question}
          </Question>
          <OptionsContainer>
            {shuffledOptions.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.answer;
              const isIncorrect = isSelected && !isCorrect; // Incorrect if selected and not correct

              return (
                <OptionButton
                  key={index}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  isIncorrect={isIncorrect}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </OptionButton>
              );
            })}
          </OptionsContainer>
          {selectedAnswer && (
            <Result>{isCorrect ? "Correct!" : "Incorrect!"}</Result>
          )}
          <NavigationButtons>
            <Button onClick={handleNext}>Next</Button>
            {/* {currentQuestion > 0 && (
              <Button onClick={handlePrevious}>Previous</Button>
            )} */}
          </NavigationButtons>
        </motion.div>
      </Container>
    );
  }

  if (quizCompleted) {
    return (
      <Container>
        <h1>Congratulations, {userName}!</h1>
        <p>You have completed the quiz.</p>
        <ScoreDisplay>
          Your final score is {score} out of {questions.length}
        </ScoreDisplay>
        <ProceedButton onClick={handleReset}>Try Again</ProceedButton>
      </Container>
    );
  }
};

export default Module4;

// Styled Components

const Result = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 65vh;
  position: relative;
  padding: 20px;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 80vh;
  margin-bottom: 20px;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
`;

const VideoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: white;
`;

const ProceedButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 10px;
  margin-top: 50px;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: scale(1.05);
  }
`;

const ResetButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: scale(1.05);
  }
`;

const ScoreDisplay = styled.h3`
  font-size: 1.2rem;
  color: #f39c12;
  margin: 10px 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const OptionButton = styled.div`
  background: ${(props) => {
    if (props.isSelected) {
      // If the answer is selected
      if (props.isCorrect) {
        return "#28a745"; // Green for correct
      } else if (props.isIncorrect) {
        return "#dc3545"; // Red for incorrect
      }
    }
    return "#f39c12"; // Default color for unselected options
  }};
  color: ${(props) => (props.isSelected ? "white" : "#333")};
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #e2e6ea;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Question = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${(props) =>
    props.isCorrect ? "#28a745" : props.isIncorrect ? "#dc3545" : "white"};
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
