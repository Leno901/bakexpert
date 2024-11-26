import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const questions = [
  {
    question:
      "What is the term for a cake designed for a specific theme or occasion, often with elaborate decorations?",
    answer: "Specialty Cake",
    options: [
      "Specialty Cake",
      "Layer Cake",
      "Custom Cake",
      "Fondant",
      "Wedding Cake",
    ],
  },
  {
    question:
      "This type of cake is often layered with fillings like mousse, ganache, or buttercream. What is it?",
    answer: "Layer Cake",
    options: [
      "Specialty Cake",
      "Layer Cake",
      "Custom Cake",
      "Fondant",
      "Wedding Cake",
    ],
  },
  {
    question:
      "Name the cake that frequently involves sculpting and is typically made for weddings, birthdays, or anniversaries.",
    answer: "Custom Cake",
    options: [
      "Specialty Cake",
      "Layer Cake",
      "Custom Cake",
      "Fondant",
      "Wedding Cake",
    ],
  },
  {
    question:
      "What is the edible medium often used to cover specialty cakes for a smooth, polished appearance?",
    answer: "Fondant",
    options: [
      "Specialty Cake",
      "Layer Cake",
      "Custom Cake",
      "Fondant",
      "Wedding Cake",
    ],
  },
  {
    question:
      "Which specialty cake is commonly associated with towering tiers and intricate piping designs?",
    answer: "Wedding Cake",
    options: [
      "Specialty Cake",
      "Layer Cake",
      "Custom Cake",
      "Fondant",
      "Wedding Cake",
    ],
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Module2() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

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
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    resetAnswerState();
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
    resetAnswerState();
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const question = questions[currentQuestion];

  React.useEffect(() => {
    setShuffledOptions(shuffleArray([...questions[currentQuestion].options]));
  }, [currentQuestion]);

  if (!quizStarted) {
    return (
      <Container>
        <ProceedButton onClick={handleStartQuiz}>Proceed to Quiz</ProceedButton>
        {showVideo && (
          <VideoContainer>
            <VideoWrapper>
              <VideoTitle>Differents design of Specialty Cake</VideoTitle>
              <iframe
                width="45%"
                height="80%"
                src="https://www.youtube.com/embed/zSRdHcW8TLw?si=_50M5u-tZXGRwecG"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              />
            </VideoWrapper>
            <VideoWrapper>
              <VideoTitle>Example of Specialty Cake</VideoTitle>
              <iframe
                width="45%"
                height="80%"
                src="https://www.youtube.com/embed/x-H4xifwzc8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onEnded={handleVideoEnd}
              />
            </VideoWrapper>
          </VideoContainer>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <ResetButton onClick={handleReset}>Reset Quiz</ResetButton>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Specialty Cake Quiz</h1>
        <ScoreDisplay>Score: {score}</ScoreDisplay>
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
          {shuffledOptions.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null} // Disable options after answer is selected
              isSelected={selectedAnswer === option}
              isCorrect={isCorrect && selectedAnswer === option}
              isIncorrect={!isCorrect && selectedAnswer === option}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>

        <NavigationButtons>
          <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous Question
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Next Question
          </Button>
        </NavigationButtons>
      </motion.div>
    </Container>
  );
}

export default Module2;

// Styled Components
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

const Question = styled(motion.h2)`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: ${(props) =>
    props.isCorrect ? "#28a745" : props.isIncorrect ? "#dc3545" : "white"};
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const OptionButton = styled.div`
  background: ${(props) =>
    props.isSelected ? (props.isCorrect ? "#28a745" : "#dc3545") : "#f39c12"};
  color: ${(props) => (props.isSelected ? "white" : "#333")};
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) =>
      props.isSelected ? (props.isCorrect ? "#218838" : "#c82333") : "#e2e6ea"};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
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