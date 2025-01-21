import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";
import img1 from "../../../assets/image/swiss1.png";
import img2 from "../../../assets/image/swiss2.png";
import img3 from "../../../assets/image/swiss3.png";
import img4 from "../../../assets/image/swiss4.png";
import CategoryGame from "../../CategoryGame";
import { CATEGORY_DATA } from "../../categories";
import Assessment from "./Assessment";

const questions = [
  {
    question:
      "What is the rolled sponge cake filled with cream or jam commonly called?",
    answer: "a) Swiss roll",
    options: [
      "a) Swiss roll",
      "b) Doughnut",
      "c) Puff pastry",
      "d) Mille-feuille",
    ],
  },
  {
    question:
      "What technique is essential to avoid cracking when rolling a Swiss roll?",
    answer: "a) Rolling while the sponge is warm",
    options: [
      "a) Rolling while the sponge is warm",
      "b) Freezing before rolling",
      "c) Using a knife to score the sponge",
      "d) Overbaking the sponge",
    ],
  },
  {
    question:
      "Name the dessert often decorated to resemble a log for Christmas celebrations.",
    answer: "a) Yule log",
    options: [
      "a) Yule log",
      "b) Opera cake",
      "c) Baked Alaska",
      "d) Cheesecake",
    ],
  },
  {
    question:
      "What ingredient helps create the soft and pliable texture of a Swiss roll sponge?",
    answer: "a) Eggs",
    options: ["a) Eggs", "b) Yeast", "c) Butter", "d) Cornmeal"],
  },
  {
    question:
      "Which term refers to the filling of a Swiss roll that can range from whipped cream to fruit spreads?",
    answer: "a) Filling",
    options: ["a) Filling", "b) Crust", "c) Frosting", "d) Glaze"],
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
  const [showAssessment, setShowAssessment] = useState(false);

  const categoryName = "Swiss Roll";
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

  const handleShowAssessment = () => {
    setShowAssessment(true); // Show the assessment
    setQuizStarted(false); // Hide the quiz
    setQuizCompleted(false); // Ensure quiz completion state is reset
    resetAnswerState(); // Reset any answer states if needed
  };

  const question = questions[currentQuestion];

  React.useEffect(() => {
    setShuffledOptions(shuffleArray([...questions[currentQuestion].options]));
  }, [currentQuestion]);

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

  if (showVideo && !quizStarted && !showAssessment) {
    return (
      <Container>
        <VideoContainer>
          <VideoWrapper>
            <VideoTitle>Difference recipe of Swiss Roll</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/lIhrNMEp3oM?rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>Example of Swiss Roll</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/MZEUpCZFlko?rel=0"
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

  if (showOverview && !quizStarted && !showAssessment) {
    return (
      <Container>
        <h2>Swiss Roll Overview</h2>
        <p>
          A Swiss roll is a type of sponge cake that is spread with filling,
          such as jam, cream, or chocolate, and then rolled into a spiral shape.
          Known for its light, airy texture and visually striking swirl, the
          Swiss roll is a versatile dessert enjoyed in many variations across
          the globe. Despite its name, the Swiss roll is believed to have
          originated in Central Europe rather than Switzerland, although its
          exact origins are unclear.
        </p>
        <p>
          By the end of this lesson, students will have the practical skills to
          design and create beautiful, flavorful Swiss rolls, enhancing their
          competencies as future pastry chefs or culinary professionals.
        </p>

        <h2>Module Objectives</h2>
        <ul>
          <li>
            Define Swiss roll and describe their significance in the culinary
            and baking industries.
          </li>
          <li>
            Identify different types of Swiss roll and their core ingredients.
          </li>
          <li>
            Apply advanced techniques for baking, filling, frosting, and
            decorating Swiss rolls.
          </li>
          <li>
            Evaluate the quality of Swiss rolls based on texture, flavor, and
            aesthetic presentation.
          </li>
          <li>
            Demonstrate skills in cake design by creating a Swiss roll using
            industry-standard techniques.
          </li>
        </ul>

        <h2>Introduction to Swiss Roll</h2>
        <p>
          What is a Swiss roll? A Swiss roll is a type of rolled sponge cake
          filled with cream, jam, or other fillings, creating a distinctive
          spiral pattern when sliced. It is made by baking a thin, flexible
          layer of sponge cake, spreading it with filling, and then rolling it
          tightly. Known for its light texture and visual appeal, the Swiss roll
          is a versatile dessert enjoyed in many varieties and flavors around
          the world.
        </p>

        <ProceedButton onClick={handleProceedToOverview2}>
          Proceed to Types
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview2 && !quizStarted && !showAssessment) {
    return (
      <Container>
        <h2>Types of Swiss Roll</h2>

        <SwissType>
          <img src={img1} alt="Classic Jam Roll" />
          <p>
            <strong>Classic Jam Roll:</strong> Filled with fruit jam or
            preserves, often dusted with powdered sugar on the outside.
          </p>
        </SwissType>

        <SwissType>
          <img src={img2} alt="Chocolate Swiss Roll" />
          <p>
            <strong>Chocolate Swiss Roll:</strong> Made with chocolate sponge
            and filled with chocolate ganache or cream.
          </p>
        </SwissType>

        <SwissType>
          <img src={img3} alt="Cream-Filled Roll" />
          <p>
            <strong>Cream-Filled Roll:</strong> Contains whipped cream or
            buttercream, sometimes combined with fresh fruits.
          </p>
        </SwissType>

        <SwissType>
          <img src={img4} alt="Holiday-Themed Rolls" />
          <p>
            <strong>Holiday-Themed Rolls:</strong> In France, a version called{" "}
            <em>bûche de Noël</em> (Yule log) is popular around Christmas,
            decorated to look like a log with chocolate or buttercream “bark.”
          </p>
        </SwissType>

        <ProceedButton onClick={handleProceedToOverview3}>
          Proceed to Key Ingredients
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview3 && !quizStarted && !showAssessment) {
    return (
      <Container>
        <h2>Key Ingredients and Tools for Swiss Roll</h2>

        <h2>Core Ingredients:</h2>
        <ul>
          <li>
            <strong>Sponge Cake Bases:</strong>
            <ul>
              <li>
                Flour: Usually all-purpose flour or cake flour for a light
                texture.
              </li>
              <li>
                Eggs: Provide structure and give the cake its airy quality.
              </li>
              <li>Sugar: Adds sweetness and aids in browning.</li>
              <li>
                Butter or Oil: Some recipes use a small amount of fat to keep
                the cake moist and flexible.
              </li>
            </ul>
          </li>
          <li>
            <strong>Fillings:</strong>
            <ul>
              <li>
                Fruit Preserves or Jams: Strawberry, raspberry, and apricot jams
                are traditional choices, adding sweetness and moisture.
              </li>
              <li>
                Whipped Cream or Buttercream: Adds richness and creaminess.
              </li>
              <li>
                Chocolate Ganache: For a more indulgent flavor, some Swiss rolls
                are filled with chocolate.
              </li>
              <li>
                Fresh Fruits: Some variations include sliced strawberries,
                raspberries, or bananas in the filling for added flavor and
                texture.
              </li>
            </ul>
          </li>
          <li>
            <strong>Flavor Additions:</strong>
            <ul>
              <li>
                Vanilla or Almond Extract: Commonly added for extra flavor.
              </li>
              <li>
                Cocoa Powder: Used to make a chocolate-flavored sponge cake or
                filling.
              </li>
            </ul>
          </li>
        </ul>

        <h2>Decorating Ingredients:</h2>
        <p>
          Buttercream Frosting, Ganache, Fondant, Whipped Cream, and Mousse.
          Edible Flowers, Chocolate Decorations, Fondant Figures.
        </p>

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

  if (showOverview4 && !quizStarted && !showAssessment) {
    return (
      <Container>
        <h2>Cake Decoration Techniques</h2>

        <h3>Baking the Sponge:</h3>
        <p>
          The sponge is usually baked in a shallow sheet pan lined with
          parchment paper, ensuring even baking and easy release.
        </p>

        <h3>Rolling While Warm:</h3>
        <p>
          The cake is rolled up with the parchment paper while still warm to
          "train" the sponge into its rolled shape. This helps prevent cracking
          when it’s later filled and rolled again.
        </p>

        <h3>Adding the Filling and Final Roll:</h3>
        <p>
          Once cooled, the cake is unrolled, spread with filling, and then
          carefully rolled again. Some Swiss rolls are dusted with powdered
          sugar, cocoa powder, or glazed with chocolate for a finished look.
        </p>

        <h2>Evaluating Swiss Roll</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the Swiss Roll. Ensure the
          cake does not feel dry or crumbly.
        </p>

        <h3>Flavor Balance:</h3>
        <p>
          Check the balance between the sweetness of the frosting and the flavor
          of the cake. For instance, rich cakes like chocolate should pair well
          with lighter fillings like whipped cream or mousse.
        </p>

        <ProceedButton onClick={handleProceedToOverview5}>
          Proceed to Evaluating
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview5 && !quizStarted && !showAssessment) {
    return (
      <Container>
        <h2>Evaluating Swiss Roll</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the Swiss Roll. Ensure the
          cake does not feel dry or crumbly.
        </p>

        <h3>Flavor Balance:</h3>
        <p>
          Check the balance between the sweetness of the frosting and the flavor
          of the cake. For instance, rich cakes like chocolate should pair well
          with lighter fillings like whipped cream or mousse.
        </p>
        <ProceedButton onClick={handleShowVideo}>
          Proceed to Video
        </ProceedButton>
      </Container>
    );
  }

  if (showUser && !quizStarted && !showAssessment) {
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

  if (quizStarted && !quizCompleted && !showAssessment) {
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
            Swiss Roll Quiz
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

  if (quizCompleted && !showAssessment) {
    return (
      <Container>
        <h1>Congratulations, {userName}!</h1>
        <p>You have completed the quiz.</p>
        <ScoreDisplay>
          Your final score is {score} out of {questions.length}
        </ScoreDisplay>
        <ProceedButton onClick={handleReset}>Try Again</ProceedButton>
        <ProceedButton onClick={handleShowAssessment}>
          Proceed to Assessment
        </ProceedButton>
      </Container>
    );
  }

  if (showAssessment) {
    return <Assessment userName={userName} />;
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

const SwissType = styled.div`
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
