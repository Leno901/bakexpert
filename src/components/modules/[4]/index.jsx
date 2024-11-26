import React, { useState, useEffect } from "react";
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

  const gifs = [
    "/src/assets/gif/1.gif",
    "/src/assets/gif/2.gif",
    "/src/assets/gif/3.gif",
    "/src/assets/gif/4.gif",
  ];

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
            />
          </VideoWrapper>
        </VideoContainer>
        <ProceedButton onClick={handleShowUser}>Proceed to Quiz</ProceedButton>
      </Container>
    );
  }

  if (showOverview && !quizStarted) {
    return (
      <Container>
        <h2>Specialty Cake Overview</h2>
        <p>
          This lesson covers the essential techniques and skills involved in the
          preparation, assembly, and decoration of specialty cakes, which are
          crucial in the bread and pastry industry. Specialty cakes are
          intricate and highly detailed cakes used for special occasions such as
          weddings, birthdays, and other celebrations. The skills required to
          create these cakes include proper baking techniques, filling,
          frosting, and decoration, all of which will be explored in this
          module.
        </p>
        <p>
          By the end of this lesson, students will have the practical skills to
          design and create beautiful, flavorful specialty cakes, enhancing
          their competencies as future pastry chefs or culinary professionals.
        </p>
        <h2>Introduction to Specialty Cakes</h2>
        <p>
          <strong>What are Specialty Cakes?</strong> Specialty cakes are
          elaborately designed cakes tailored for special occasions, with unique
          decorations and flavors. These cakes stand apart from regular cakes
          because of their custom designs, use of premium ingredients, and
          intricate preparation. A specialty cake is a unique, customized, or
          elaborate cake designed to suit a specific occasion, theme, or dietary
          preference. These cakes often showcase creativity, advanced baking
          techniques, and intricate decorations, making them a centerpiece for
          celebrations such as weddings, birthdays, anniversaries, or special
          events.
        </p>
        <p>
          Specialty cakes come in a wide variety of flavors, shapes, and
          designs, ranging from multi-tiered wedding cakes adorned with fondant
          flowers to themed birthday cakes featuring sculpted designs. They may
          also include innovative techniques such as airbrushing, sugar work, or
          edible printing.
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
        <h2>Types of Specialty Cakes</h2>
        <p>
          <strong>Layer Cakes:</strong> is a stack of multiple layers or sheets
          of cake held together by some form of filling. The filling could be
          anything decadent such as jam, frosting or cream. The type of cakes
          that are typically used in layer cake are butter cakes or sponge
          cakes. Popular flavor combinations include the German chocolate cake,
          red velvet cake, Black Forest cake, and carrot cake with cream cheese
          icing. Primarily used in special occasions such as Christian weddings,
          layer cakes add a special touch to memorable events.  
        </p>
        <p>
          <strong>Fondant Cakes:</strong> Fondant is an edible icing with a
          pliable texture that can be rolled, shaped and sculpted. It's most
          commonly used to decorate cakes, cupcakes and cookies. There are
          different types of fondant, including rolled fondant, pour fondant,
          chocolate fondant, sculpting fondant, marshmallow fondant and gumpaste
          fondant.
        </p>
        <p>
          <strong>Mousse Cakes:</strong> Mousse cake is a type of dessert that
          has an airy or fluffy texture. The word 'mousse' itself literally
          translates to “foam” in French due to its really light structure. This
          light texture can be achieved thanks to the folding technique, which
          is the movement of gently folding in an “areator” onto a “base”.
        </p>
        <p>
          <strong>Fruit Cakes:</strong> Fruitcake or fruit cake is a cake made
          with candied or dried fruit, nuts, and spices, and optionally soaked
          in spirits. In the United Kingdom, certain rich versions may be iced
          and decorated. Also Cakes that use fruits as the main ingredient,
          often used in celebrations and holidays.
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
