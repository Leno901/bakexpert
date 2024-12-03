import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";
import img1 from "../../../assets/image/eb1.png";
import img2 from "../../../assets/image/eb2.png";
import img3 from "../../../assets/image/eb3.png";
import img4 from "../../../assets/image/eb4.png";
import img5 from "../../../assets/image/eb5.png";
import CategoryGame from "../../CategoryGame";
import { CATEGORY_DATA } from "../../categories";

const questions = [
  {
    question:
      "What is the term for bread made with added ingredients like eggs, milk, and sugar for a richer taste?",
    answer: "a) Enriched bread",
    options: [
      "a) Enriched bread",
      "b) Sourdough",
      "c) Quick bread",
      "d) Rye bread",
    ],
  },
  {
    question:
      "Name the popular enriched bread known for its soft texture and braided appearance, often associated with Jewish cuisine.",
    answer: "a) Challah",
    options: ["a) Challah", "b) Brioche", "c) Croissant", "d) Focaccia"],
  },
  {
    question:
      "What enriched bread is traditionally baked in a ring shape and often served during Mardi Gras?",
    answer: "a) King cake",
    options: [
      "a) King cake",
      "b) Banana bread",
      "c) Muffin",
      "d) Danish pastry",
    ],
  },
  {
    question:
      "Which ingredient is commonly used in enriched breads to give them a golden, shiny crust?",
    answer: "a) Egg wash",
    options: ["a) Egg wash", "b) Butter", "c) Sugar syrup", "d) Flour"],
  },
  {
    question:
      "What type of bread, originating from France, uses a high butter content to create its flaky texture?",
    answer: "a) Brioche",
    options: ["a) Brioche", "b) Scone", "c) Biscotti", "d) Baguette"],
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
  const [showPretest, setShowPretest] = useState(true);
  const [showOverview, setShowOverview] = useState(false);
  const [showOverview2, setShowOverview2] = useState(false);
  const [showOverview3, setShowOverview3] = useState(false);
  const [showOverview4, setShowOverview4] = useState(false);
  const [showOverview5, setShowOverview5] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [userName, setUserName] = useState(""); // New state for user name
  const [quizCompleted, setQuizCompleted] = useState(false);
  const categoryName = "Enriched Bread";
  const categoryData = CATEGORY_DATA[categoryName];
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

  useEffect(() => {
    const h1Elements = document.querySelectorAll("h1");
    const pElements = document.querySelectorAll("p");
    const navlanding = document.querySelectorAll("nav");

    if (quizStarted) {
      h1Elements.forEach((el) => {
        el.style.color = "white";
      });
      pElements.forEach((el) => {
        el.style.color = "white";
      });
      navlanding.forEach((el) => {
        el.style.background = "#f39c12";
      });
    } else {
      h1Elements.forEach((el) => {
        el.style.color = ""; // Reset to default
      });
      pElements.forEach((el) => {
        el.style.color = ""; // Reset to default
      });
      navlanding.forEach((el) => {
        el.style.background = ""; // Reset to default
      });
    }

    // Cleanup to avoid side effects if the component unmounts
    return () => {
      h1Elements.forEach((el) => {
        el.style.color = "";
      });
    };
  }, [quizStarted]);

  useEffect(() => {
    const h1Elements = document.querySelectorAll("h1");
    const pElements = document.querySelectorAll("p");
    const navlanding = document.querySelectorAll("nav");

    if (quizStarted) {
      h1Elements.forEach((el) => {
        el.style.color = "white";
      });
      pElements.forEach((el) => {
        el.style.color = "white";
      });
      navlanding.forEach((el) => {
        el.style.background = "#f39c12";
      });
    } else {
      h1Elements.forEach((el) => {
        el.style.color = ""; // Reset to default
      });
      pElements.forEach((el) => {
        el.style.color = ""; // Reset to default
      });
      navlanding.forEach((el) => {
        el.style.background = ""; // Reset to default
      });
    }

    // Cleanup to avoid side effects if the component unmounts
    return () => {
      h1Elements.forEach((el) => {
        el.style.color = "";
      });
    };
  }, [quizStarted]);

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

  const handleShowUser = () => {
    setShowVideo(false);
    setShowUser(true);
  };

  const handleProceedToOverview = () => {
    setShowPretest(false);
    setShowOverview(true);
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
            <VideoTitle>Types of Enriched Bread</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://modernistcuisine.com/"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>How to Make Enriched Bread</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/watch?v=d4Bxs3tJ9fA"
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

  if (showPretest && !quizStarted) {
    return (
      <div>
        <ProceedButton onClick={handleProceedToOverview}>
          Proceed to Discussion
        </ProceedButton>
        <CategoryGame category={categoryName} data={categoryData} />
      </div>
    );
  }

  if (showOverview && !quizStarted) {
    return (
      <Container>
        <h2>Enriched Bread Overview</h2>
        <p>
          Enriched bread is a type of bread that includes added ingredients like
          fats, sugars, eggs, and dairy, which give the bread a tender crumb,
          richer flavor, and softer texture than traditional lean breads (like
          baguettes or sourdough). These added ingredients contribute to the
          bread’s moistness and often make it more indulgent and satisfying,
          making enriched bread popular in pastries, sweet breads, and special
          occasion breads.
        </p>
        <p>
          By the end of this lesson, students will have the practical skills to
          create beautiful Enriched bread, enhancing their competencies as
          future pastry chefs or culinary professionals.
        </p>

        <h2>Module Objectives</h2>
        <ul>
          <li>
            Define Enriched bread and describe their significance in the
            culinary and baking industries.
          </li>
          <li>
            Identify different types of Enriched bread and their core
            ingredients.
          </li>
          <li>Apply advanced techniques for baking Enriched bread.</li>
          <li>
            Evaluate the quality of Enriched bread on texture, flavor, and
            aesthetic presentation.
          </li>
        </ul>

        <h2>Introduction to Enriched Bread</h2>
        <p>
          What is Enriched bread? Enriched bread is bread made with additional
          ingredients like eggs, milk, sugar, oil, or butter in the dough, in
          addition to the basic ingredients of flour, water, yeast, and salt.
          The added fats give enriched breads a softer, more tender texture, and
          a slightly sweet flavor, while also helping them stay fresh longer
          than lean breads.
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
        <h2>Types of Enriched Bread</h2>

        <EBType>
          <img src={img1} alt="Brioche" />
          <p>
            <strong>Brioche:</strong> A rich, buttery bread with a tender crumb,
            often used for pastries or as a base for French toast.
          </p>
        </EBType>

        <EBType>
          <img src={img2} alt="Challah" />
          <p>
            <strong>Challah:</strong> A traditional Jewish bread, slightly
            sweet, made with eggs and often braided.
          </p>
        </EBType>

        <EBType>
          <img src={img3} alt="Panettone" />
          <p>
            <strong>Panettone:</strong> An Italian sweet bread typically enjoyed
            around the holidays, often studded with dried fruits and flavored
            with citrus.
          </p>
        </EBType>

        <EBType>
          <img src={img4} alt="Cinnamon Rolls and Sweet Buns" />
          <p>
            <strong>Cinnamon Rolls and Sweet Buns:</strong> Rolled or shaped
            breads with sugar and spice fillings, often topped with glaze or
            icing.
          </p>
        </EBType>

        <EBType>
          <img src={img5} alt="Milk Bread (Hokkaido)" />
          <p>
            <strong>Milk Bread (Hokkaido):</strong> A Japanese bread with a
            soft, pillowy texture and a slight sweetness, often made using the
            tangzhong (water roux) method for extra softness.
          </p>
        </EBType>

        <ProceedButton onClick={handleProceedToOverview3}>
          Proceed to Key Ingredients
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview3 && !quizStarted) {
    return (
      <Container>
        <h2>Key Ingredients and Tools for Enriched Bread</h2>

        <h2>Core Ingredients:</h2>
        <ul>
          <li>
            <strong>Fat (Butter, Oil, or Shortening):</strong> Adds richness,
            softness, and moisture. It also slows gluten development, leading to
            a more tender crumb.
          </li>
          <li>
            <strong>Dairy (Milk or Cream):</strong> Enhances flavor, adds
            moisture, and contributes to a soft crumb.
          </li>
          <li>
            <strong>Eggs:</strong> Add color, flavor, and structure, making the
            dough more cohesive and improving the bread’s ability to rise.
          </li>
          <li>
            <strong>Sweeteners (Sugar or Honey):</strong> Provide sweetness and
            help with browning. In some recipes, like brioche or challah, sugar
            plays a significant role.
          </li>
          <li>
            <strong>Yeast:</strong> Often included in higher quantities to help
            the heavier dough rise effectively.
          </li>
        </ul>

        <h2>Essential Tools:</h2>
        <ul>
          <li>Cake Pans (round, square, or custom shapes)</li>
          <li>Mixing Bowls, Electric Mixers, Spatulas</li>
          <li>Piping Bags and Tips (for decorating)</li>
          <li>Cake Turntable (for even decoration)</li>
          <li>Cooling Racks (for proper bread cooling)</li>
        </ul>

        <h2>Techniques for Making Enriched Bread</h2>
        <ul>
          <li>
            <strong>Mixing and Kneading:</strong> Enriched doughs often require
            more kneading to develop gluten, especially when high in fat.
          </li>
          <li>
            <strong>Proofing:</strong> Enriched doughs may need longer rising
            times, as the fat and sugar can slow yeast activity.
          </li>
          <li>
            <strong>Shaping:</strong> Many enriched breads, like challah or
            brioche, are braided, rolled, or shaped to add visual appeal.
          </li>
          <li>
            <strong>Baking:</strong> Some recipes call for an egg wash before
            baking to create a glossy, golden finish.
          </li>
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
        <h2>Evaluating Enriched Bread</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the Enriched Bread. Ensure
          the bread does not feel dry or crumbly.
        </p>

        <h3>Flavor Balance:</h3>
        <p>Check the flavor balance of the Enriched Bread.</p>

        <h3>Presentation:</h3>
        <p>Assess the cleanliness and precision of the Enriched Bread.</p>

        <h2>Assessment Activities</h2>

        <h3>Practical Task:</h3>
        <p>
          Students will bake, assemble, and decorate their own Enriched Bread
          using at least three techniques demonstrated during the module. The
          breads will be assessed for quality based on texture, flavor, and
          presentation.
        </p>

        <ProceedButton onClick={handleProceedToOverview5}>
          Proceed to Evaluating
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview5 && !quizStarted) {
    return (
      <Container>
        <h2>Evaluating Enriched Bread</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the Enriched Bread. Ensure
          the bread does not feel dry or crumbly.
        </p>

        <h3>Flavor Balance:</h3>
        <p>Check the flavor balance of the Enriched Bread.</p>

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
          style={{
            color: "white",
          }}
        >
          <h1
            style={{
              color: "white",
            }}
          >
            Enriched Bread Quiz
          </h1>
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

const EBType = styled.div`
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
  margin-bottom: 50px;
  margin-top: 30px;
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
