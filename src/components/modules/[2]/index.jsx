import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const questions = [
  {
    question:
      "What is the term for a small, bite-sized cake or confection often served with tea or as a dessert?",
    answer: "Petit Four",
    options: ["Petit Four", "Macaron", "Biscuit", "Cannelé", "Scone"],
  },
  {
    question:
      "These are glazed mini cakes, often coated in fondant or icing. What are they called?",
    answer: "Petit Four Glacé",
    options: [
      "Petit Four Glacé",
      "Madeleine",
      "Éclair",
      "Financier",
      "Chouquette",
    ],
  },
  {
    question:
      "Name the type of petit four that is made from puff pastry and filled with sweet or savory ingredients.",
    answer: "Petit Four Salé",
    options: [
      "Petit Four Salé",
      "Choux",
      "Pâte Sucrée",
      "Palmiers",
      "Tartlets",
    ],
  },
  {
    question:
      "Which French term translates to 'small oven,' referring to these tiny confections?",
    answer: "Petit Four",
    options: ["Bouchon", "Pâtisserie", "Petit Four", "Tartelette", "Chocolat"],
  },
  {
    question:
      "What category of petit fours includes almond-based treats like macarons?",
    answer: "Petit Four Sec",
    options: [
      "Petit Four Sec",
      "Petit Four Glacé",
      "Petit Four Salé",
      "Madeleine",
      "Chocolatier",
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
  const [showOverview, setShowOverview] = useState(true);
  const [showOverview2, setShowOverview2] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState(""); // New state for user name
  const [quizCompleted, setQuizCompleted] = useState(false);

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
            <VideoTitle>Different Designs of Petit Fours</VideoTitle>
            <iframe
              width="45%"
              height="80%"
              src="https://www.youtube.com/embed/T-AKfxMVo2o?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onEnded={handleVideoEnd}
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>How to Make Petit Fours</VideoTitle>
            <iframe
              width="45%"
              height="80%"
              src="https://www.youtube.com/embed/M5NOHVp2lPE?rel=0"
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
        <h2>Petit four Overview</h2>
        <p>
          Petit fours are small, bite-sized confections that originated in
          France and are traditionally served as part of dessert or with tea.
          The term "petit four" translates to "small oven," referencing the
          traditional baking method used to make these delicate treats.
        </p>
        <p>
          By the end of this Lesson, students will have the practical skills to
          design and create beautiful, flavorful Petit four, enhancing their
          competencies as future pastry chefs or culinary professionals.
        </p>
        <h2>Introduction to Petit Four</h2>
        <p>
          What are Petit Four? Petit fours are delicate little cakes that
          originated in France. Their name translates to “small oven” in English
          as petit fours were baked with the residual heat of brick ovens used
          for bread making in the past. The bakers would use the lower heat to
          make pastries, and thus their name was coined. They are often sweet,
          such as glazed cakes, macarons, or tartlets, but can also be savory,
          like mini quiches or puff pastries. Petit fours are known for their
          elegant presentation and intricate designs, making them popular at
          weddings, tea parties, and special events. Their small size allows
          them to be enjoyed as a light treat or a fancy appetizer.
        </p>
        <ProceedButton onClick={handleProceedToOverview2}>
          Proceed to Types
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview2 && !quizStarted) {
    return (
      <Container>
        <h2>Types of Petit Four:</h2>
        <p>
          <strong>1.Petit Fours Sec (Dry Petit Fours):</strong> These include
          small, crispy baked goods like cookies, biscuits, and tuiles. They are
          often unglazed and less sweet, typically enjoyed with tea or coffee.
        </p>
        <p>
          <strong>2. Petit Fours Glacé (Glazed Petit Fours):</strong> These are
          decorated, bite-sized cakes often covered in fondant or icing and
          sometimes garnished with small decorations. Classic flavors include
          vanilla, almond, chocolate, and lemon.
        </p>
        <p>
          <strong>3. Petit Fours Frais (Fresh Petit Fours):</strong> These
          consist of fresh, perishable items, such as mini cream puffs, éclairs,
          or fruit tarts. Often, they have creamy fillings like custard or
          mousse and are usually refrigerated before serving.
        </p>
        <p>
          <strong>4. Petit Fours Salé (Savory Petit Fours):</strong> While
          traditionally sweets, petit fours can also be savory, including tiny
          quiches, mini sandwiches, and other savory appetizers.
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
          <h1>Specialty Cake Quiz</h1>
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
              disabled={
                selectedAnswer === null ||
                currentQuestion === questions.length - 1
              }
            >
              Next Question
            </Button>
          </NavigationButtons>
        </motion.div>
      </Container>
    );
  }

  return null;
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
