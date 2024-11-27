import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";

const questions = [
  {
    question: "What makes a bread 'enriched'?",
    answer: "b) The addition of fat, sugar, and/or eggs",
    options: [
      "a) The addition of water",
      "b) The addition of fat, sugar, and/or eggs",
      "c) The use of whole wheat flour",
      "d) The use of sourdough starter",
    ],
  },
  {
    question: "Enriched breads generally have a:",
    answer: "b) More tender and softer texture",
    options: [
      "a) Dry and crumbly texture",
      "b) More tender and softer texture",
      "c) Chewy texture",
      "d) Dense and heavy texture",
    ],
  },
  {
    question: "Which of the following is NOT a characteristic of enriched bread?",
    answer: "d) Very long fermentation time",
    options: [
      "a) Increased shelf life",
      "b) Richer flavor",
      "c) Increased browning",
      "d) Very long fermentation time",
    ],
  },
  {
    question: "What kind of fat is commonly used in enriched bread?",
    answer: "d) All of the above",
    options: [
      "a) Olive oil",
      "b) Vegetable shortening",
      "c) Butter",
      "d) All of the above",
    ],
  },
  {
    question: "What does adding sugar do in enriched bread?",
    answer: "b) Increases browning and flavor",
    options: [
      "a) Makes it healthier",
      "b) Increases browning and flavor",
      "c) Decreases the rise",
      "d) Makes the dough harder to handle",
    ],
  },
];


function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Module5 = ({ quizStarted, setQuizStarted }) => {
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
              <VideoTitle>Types of Enriched Bread</VideoTitle>
              <iframe
                width="45%"
                height="80%"
                src="https://modernistcuisine.com/"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              />
            </VideoWrapper>
            <VideoWrapper>
              <VideoTitle>How to Make Enriched Bread</VideoTitle>
              <iframe
                width="45%"
                height="80%"
                src="https://www.youtube.com/embed/watch?v=d4Bxs3tJ9fA"
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
        <h2>Enriched Bread Overview</h2>
        <p>
        Enriched bread is a type of bread that includes added ingredients like fats, sugars, eggs, and dairy, which give the bread a tender crumb, richer flavor, and softer texture than traditional lean breads (like baguettes or sourdough). These added ingredients contribute to the bread’s moistness and often make it more indulgent and satisfying, making enriched bread popular in pastries, sweet breads, and special occasion breads.        </p>
        <p>
        By the end of this Lesson, students will have the practical skills to create beautiful Enriched bread, enhancing their competencies as future pastry chefs or culinary professionals.
        </p>
        <h2>Introduction to Enriched Bread</h2>
        <p>
        What is Enriched bread? Enriched bread is bread made with additional ingredients like eggs, milk, sugar, oil, or butter in the dough, in addition to the basic ingredients of flour, water, yeast, and salt. The added fats give enriched breads a softer, more tender texture, and a slightly sweet flavor, while also helping them stay fresh longer than lean breads.        </p>
        <ProceedButton onClick={handleProceedToOverview2}>
          Proceed to Types
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview2 && !quizStarted) {
    return (
      <Container>
        <h2>Types of Enriched Bread :</h2>
        <p>
          <strong>1. Brioche:</strong>  A rich, buttery bread with a tender crumb, often used for pastries or as a base for French toast.
        </p>
        <p>
          <strong>2. Challah:</strong>  A traditional Jewish bread, slightly sweet, made with eggs and often braided.
        </p>
        <p>
          <strong>3. Panettone:</strong>  An Italian sweet bread typically enjoyed around the holidays, often studded with dried fruits and flavored with citrus.
        </p>
        <p>
          <strong>4. Cinnamon Rolls and Sweet Buns:</strong> Rolled or shaped breads with sugar and spice fillings, often topped with glaze or icing.
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
          <h1>Enriched Bread Quiz</h1>
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

export default Module5;

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
