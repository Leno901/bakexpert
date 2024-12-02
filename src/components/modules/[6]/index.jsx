import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";
import img1 from "../../../assets/image/qb1.png";
import img2 from "../../../assets/image/qb2.png";
import img3 from "../../../assets/image/qb3.png";
import img4 from "../../../assets/image/qb4.png";
import img5 from "../../../assets/image/qb5.png";

const questions = [
  {
    question:
      "What is the term for bread made without yeast, relying on baking soda or baking powder for leavening?",
    answer: "Quick Bread",
    options: [
      "Quick Bread",
      "Sourdough",
      "Flatbread",
      "Rye Bread",
      "Whole Grain",
    ],
  },
  {
    question:
      "Name the quick bread that is often flavored with bananas and nuts.",
    answer: "Banana Bread",
    options: [
      "Banana Bread",
      "Zucchini Bread",
      "Pumpkin Bread",
      "Cornbread",
      "Carrot Bread",
    ],
  },
  {
    question:
      "What type of quick bread is commonly baked in a muffin tin and served at breakfast?",
    answer: "Muffins",
    options: ["Muffins", "Scones", "Biscuits", "Pancakes", "Popovers"],
  },
  {
    question:
      "What ingredient in quick bread provides the acid needed to activate baking soda?",
    answer: "Buttermilk",
    options: ["Buttermilk", "Lemon Juice", "Vinegar", "Yogurt", "Honey"],
  },
  {
    question:
      "Name the Irish quick bread that uses baking soda and buttermilk as its primary leavening agents.",
    answer: "Soda Bread",
    options: [
      "Soda Bread",
      "Brown Bread",
      "Potato Bread",
      "Oat Bread",
      "Wheaten Bread",
    ],
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Module6 = ({ quizStarted, setQuizStarted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showOverview, setShowOverview] = useState(true);
  const [showOverview2, setShowOverview2] = useState(false);
  const [showOverview3, setShowOverview3] = useState(false);
  const [showOverview4, setShowOverview4] = useState(false);
  const [showOverview5, setShowOverview5] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState(""); // New state for user name
  const [quizCompleted, setQuizCompleted] = useState(false);

  const gifs = [gif1, gif2, gif3, gif4];

  // useEffect(() => {
  //   if (quizStarted) {
  //     // Set the initial background image immediately when the quiz starts
  //     const initialGif = gifs[Math.floor(Math.random() * gifs.length)];
  //     document.documentElement.style.setProperty(
  //       "--background-image",
  //       `url(${initialGif})`
  //     );

  //     // Start the interval to change the background image every 3 seconds
  //     const interval = setInterval(() => {
  //       const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
  //       document.documentElement.style.setProperty(
  //         "--background-image",
  //         `url(${randomGif})`
  //       );
  //     }, 3000); // Change every 3 seconds

  //     return () => clearInterval(interval); // Cleanup on unmount or when quiz is not started
  //   }
  // }, [quizStarted]); // Only run when quizStarted changes

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

  const handleProceedToOverview3 = () => {
    setShowOverview2(false);
    setShowOverview3(true);
  };

  const handleProceedToOverview4 = () => {
    setShowOverview3(false);
    setShowOverview4(true);
  };

  const handleProceedToOverview5 = () => {
    setShowOverview4(false);
    setShowOverview5(true);
  };

  const resetAnswerState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleShowVideo = () => {
    setShowVideo(true);
    setShowOverview5(false);
    setShowOverview4(false);
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
            <VideoTitle>Introduction to Quick Breads</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Oy6bQWgf1yE?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>How to make Quick Bread (muffin)</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3Ho9ivMWhho?rel=0"
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
        <h2>Quick Bread Overview</h2>
        <p>
          Quick bread is a type of bread that is made without yeast, instead
          relying on leavening agents like baking powder or baking soda to help
          it rise. This makes quick breads much faster to prepare than
          traditional yeast breads, as they do not require time for proofing or
          rising. Quick breads can be sweet or savory and are commonly enjoyed
          as breakfast items, snacks, or desserts.
        </p>
        <p>
          By the end of this lesson, students will have the practical skills to
          create beautiful Quick bread, enhancing their competencies as future
          pastry chefs or culinary professionals.
        </p>

        <h2>Module Objectives</h2>
        <ul>
          <li>
            Define Quick bread and describe their significance in the culinary
            and baking industries.
          </li>
          <li>
            Identify different types of Quick bread and their core ingredients.
          </li>
          <li>Apply advanced techniques for baking Quick bread.</li>
          <li>
            Evaluate the quality of Quick bread on texture, flavor, and
            aesthetic presentation.
          </li>
        </ul>

        <h2>Introduction to Quick Bread</h2>
        <p>
          What is Quick bread? Quick bread is any bread leavened with a chemical
          leavening agent rather than a biological one like yeast or sourdough
          starter. An advantage of quick breads is their ability to be prepared
          quickly and reliably, without requiring the time-consuming skilled
          labor and the climate control needed for traditional yeast breads.
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
        <h2>Popular Types of Quick Bread</h2>

        <QBType>
          <img src={img1} alt="Banana Bread" />
          <p>
            <strong>Banana Bread:</strong> A sweet, moist bread made with mashed
            bananas, often with added nuts or chocolate chips.
          </p>
        </QBType>

        <QBType>
          <img src={img2} alt="Zucchini Bread" />
          <p>
            <strong>Zucchini Bread:</strong> A moist, sweet bread made with
            grated zucchini and often flavored with spices like cinnamon.
          </p>
        </QBType>

        <QBType>
          <img src={img3} alt="Cornbread" />
          <p>
            <strong>Cornbread:</strong> A savory quick bread made with cornmeal,
            often served as a side with soups, chili, or barbecue.
          </p>
        </QBType>

        <QBType>
          <img src={img4} alt="Scones" />
          <p>
            <strong>Scones:</strong> A British-inspired bread, either sweet or
            savory, that’s often served with tea or coffee.
          </p>
        </QBType>

        <QBType>
          <img src={img5} alt="Muffins" />
          <p>
            <strong>Muffins:</strong> Individual quick breads that are similar
            to cupcakes, available in both sweet and savory varieties.
          </p>
        </QBType>

        <ProceedButton onClick={handleProceedToOverview3}>
          Proceed to Key Ingredients
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview3 && !quizStarted) {
    return (
      <Container>
        <h2>Key Ingredients and Tools for Quick Bread</h2>

        <h2>Core Ingredients:</h2>
        <ul>
          <li>
            <strong>Flour:</strong> All-purpose flour is commonly used, but some
            recipes use whole wheat, cornmeal, or gluten-free flours.
          </li>
          <li>
            <strong>Leavening Agents (Baking Soda or Baking Powder):</strong>{" "}
            These ingredients release gas when mixed or baked, causing the bread
            to rise quickly.
          </li>
          <li>
            <strong>Liquid (Milk, Buttermilk, or Yogurt):</strong> Adds moisture
            and helps activate the leavening agents. Buttermilk or yogurt also
            adds acidity, which works well with baking soda.
          </li>
          <li>
            <strong>Fat (Butter, Oil, or Shortening):</strong> Adds richness and
            helps create a tender texture.
          </li>
          <li>
            <strong>Eggs:</strong> Eggs provide structure, add moisture, and
            help with leavening by trapping air in the batter.
          </li>
        </ul>

        <h2>Essential Tools:</h2>
        <ul>
          <li>Cake Pans (round, square, or custom shapes)</li>
          <li>Mixing Bowls, Electric Mixers, Spatulas</li>
          <li>Piping Bags and Tips (for decorating)</li>
          <li>Cake Turntable (for even decoration)</li>
          <li>Cooling Racks (for proper cake cooling)</li>
        </ul>

        <ProceedButton onClick={handleProceedToOverview4}>
          Proceed to Techniques
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview4 && !quizStarted) {
    return (
      <Container>
        <h2>Techniques for Making Quick Bread</h2>

        <h3>Mixing Method:</h3>
        <p>
          Often uses the "muffin method," where dry and wet ingredients are
          mixed separately and then combined just until incorporated to avoid
          overmixing.
        </p>

        <h3>Gentle Stirring:</h3>
        <p>
          Quick bread batters should be mixed gently to avoid developing too
          much gluten, which can make the bread tough.
        </p>

        <h3>Immediate Baking:</h3>
        <p>
          Once mixed, the batter should be baked immediately so the chemical
          leavening agents can act before they lose potency.
        </p>

        <ProceedButton onClick={handleProceedToOverview5}>
          Proceed to Next Section
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview5 && !quizStarted) {
    return (
      <Container>
        <h2>Evaluating Quick Bread</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the Quick Bread. Ensure the
          bread does not feel dry or crumbly.
        </p>

        <h3>Flavor Balance:</h3>
        <p>Check the flavor balance of Quick Bread.</p>

        <h3>Presentation:</h3>
        <p>Assess the cleanliness and precision of the Quick Bread.</p>

        <h2>Assessment Activities</h2>

        <h3>Practical Task:</h3>
        <p>
          Students will bake, assemble, and decorate their own Quick Bread using
          at least three techniques demonstrated during the module. The breads
          will be assessed for quality based on texture, flavor, and
          presentation.
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
          style={{
            width: "50%",
            padding: "10px", // Adjust the padding as needed
          }}
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
          <h1>Quick Bread Quiz</h1>
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

export default Module6;

// Styled Components

const Result = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ showOverview3 }) => (showOverview3 ? "center" : "")};
  justify-content: ${({ showUser }) => (showUser ? "center" : "flex-start")};
  height: 70vh;
  position: relative;
  padding: 20px;
  width: 70%;
  text-align: left;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
  color: black;

  @media (max-width: 1024px) {
    width: 80%;
    padding: 15px;
    height: 75vh;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 75vh;
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }

  /* Scrollbar styles for Webkit browsers */
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  /* For Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const QBType = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  img {
    width: 150px;
    height: auto;
    margin-right: 20px;
    border-radius: 10px;

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 10px;
      width: 50%;
    }
  }

  p {
    flex: 1;

    @media (max-width: 768px) {
      text-align: justify;
      text-justify: inter-word;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    gap: 15px;
  }
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px; /* Optional: Limit max width */
  height: 85vh;
`;

const VideoFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000; /* Optional: Placeholder background for loading */
  border-radius: 10px; /* Optional: Rounded corners */
  overflow: hidden;
  margin-top: 10px; /* Adds spacing between title and video */

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const VideoTitle = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ProceedButton = styled.button`
  background: #000000;
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
    props.isCorrect ? "#28a745" : props.isIncorrect ? "#dc3545" : "black"};
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
