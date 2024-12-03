import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";
import img1 from "../../../assets/image/gateaux1.png";
import img2 from "../../../assets/image/gateaux2.png";
import img3 from "../../../assets/image/gateaux3.png";
import CategoryGame from "../../CategoryGame";
import { CATEGORY_DATA } from "../../categories";

const questions = [
  {
    question:
      "What is the French term for a rich, multi-layered cake, often filled with cream or fruit?",
    answer: "a) Gâteau",
    options: ["a) Gâteau", "b) Eclair", "c) Tart", "d) Cheesecake"],
  },
  {
    question:
      "Which type of gâteaux typically features a light sponge cake soaked in syrup and layered with cream?",
    answer: "a) Opera cake",
    options: ["a) Opera cake", "b) Pie", "c) Muffin", "d) Croissant"],
  },
  {
    question:
      "Name the famous gâteaux made with layers of puff pastry and cream, known as 'Napoleon' in English.",
    answer: "a) Mille-feuille",
    options: [
      "a) Mille-feuille",
      "b) Gateau",
      "c) Swiss roll",
      "d) Petit four",
    ],
  },
  {
    question:
      "What is the difference between a gâteau and a tart in terms of their crust?",
    answer:
      "a) Gâteaux are soft and multi-layered, tarts have a single firm crust",
    options: [
      "a) Gâteaux are soft and multi-layered, tarts have a single firm crust",
      "b) Gâteaux have a crustless base, tarts have multiple layers",
      "c) Gâteaux are dry, tarts are filled with cream",
      "d) Both are identical in terms of crust",
    ],
  },
  {
    question:
      "Which type of gâteaux is traditionally served during French celebrations, such as Christmas?",
    answer: "a) Bûche de Noël",
    options: [
      "a) Bûche de Noël",
      "b) Tartlet",
      "c) Banana bread",
      "d) Vol-au-vent",
    ],
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Module3 = ({ quizStarted, setQuizStarted }) => {
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
  const categoryName = "Gâteaux";
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
            <VideoTitle>Difference between Cake and Gateau </VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/A1Gm38BXE-Q"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoWrapper>
          <VideoWrapper>
            <VideoTitle>Example of Gateau</VideoTitle>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Mm_dervvQSk"
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
        <h2>Gateaux Overview</h2>
        <p>
          A gâteau (plural: gâteaux) is a rich, elaborate French cake often
          layered and decorated with luxurious ingredients. Unlike simpler
          cakes, gâteaux are typically distinguished by intricate designs,
          refined flavors, and complex techniques, making them a staple in
          French patisserie and a highlight at special occasions.
        </p>
        <p>
          By the end of this lesson, students will have the practical skills to
          design and create beautiful, flavorful gâteaux, enhancing their
          competencies as future pastry chefs or culinary professionals.
        </p>

        <h2>Module Objectives</h2>
        <ul>
          <li>
            Define Gateaux and describe their significance in the culinary and
            baking industries.
          </li>
          <li>
            Identify different types of Gateaux and their core ingredients.
          </li>
          <li>
            Apply advanced techniques for baking, filling, frosting, and
            decorating Gateaux.
          </li>
          <li>
            Evaluate the quality of Gateaux based on texture, flavor, and
            aesthetic presentation.
          </li>
          <li>
            Demonstrate skills in cake design by creating a Gateaux using
            industry-standard techniques.
          </li>
        </ul>

        <h2>Introduction to Gateaux</h2>
        <p>
          What are Gâteaux? Gâteaux are elaborate, often luxurious cakes that
          are a hallmark of French pastry. The word "gâteau" translates to
          "cake" in French, but it typically refers to more refined and
          multi-layered desserts than the everyday cake. These cakes often
          feature sophisticated flavors, rich textures, and intricate designs,
          making them popular choices for celebrations and special occasions.
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
        <h2>Types of Gateaux</h2>

        <GateauxType>
          <img src={img1} alt="Classic French Gâteaux" />
          <p>
            <strong>Classic French Gâteaux:</strong> These include well-known
            types like
            <em> Gâteau Opera</em> (coffee and chocolate layers),
            <em> Gâteau St. Honoré</em> (choux pastry with cream and caramel),
            and
            <em> Gâteau Fraisier</em> (strawberry and cream cake).
          </p>
        </GateauxType>

        <GateauxType>
          <img src={img2} alt="Regional Gâteaux" />
          <p>
            <strong>Regional Gâteaux:</strong> Certain gâteaux are tied to
            specific French regions, like
            <em> Gâteau Basque</em> (with almond cream or cherry filling) and
            <em> Gâteau Breton</em> (a buttery cake from Brittany).
          </p>
        </GateauxType>

        <GateauxType>
          <img src={img3} alt="Modern Gâteaux" />
          <p>
            <strong>Modern Gâteaux:</strong> Contemporary patisseries have
            adapted traditional gâteaux with global flavors, new ingredients, or
            updated presentations.
          </p>
        </GateauxType>

        <ProceedButton onClick={handleProceedToOverview3}>
          Proceed to Key Ingredients
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview3 && !quizStarted) {
    return (
      <Container>
        <h2>Key Ingredients and Tools for Gateaux</h2>

        <h2>Core Ingredients:</h2>
        <ul>
          <li>
            <strong>Sponge Cake Bases:</strong> Many gâteaux use light sponge
            cakes like genoise or joconde as the structural foundation.
          </li>
          <li>
            <strong>Mousses and Creams:</strong> Chocolate, vanilla, or
            fruit-flavored mousses add smoothness and richness.
          </li>
          <li>
            <strong>Ganache and Buttercream:</strong> These are used both for
            layering and decorating.
          </li>
          <li>
            <strong>Fruit and Nuts:</strong> Fresh or preserved fruits like
            strawberries, raspberries, and cherries, along with nuts like
            almonds and hazelnuts, add natural sweetness and texture.
          </li>
          <li>
            <strong>Liqueurs and Extracts:</strong> Liqueurs like Grand Marnier,
            kirsch, or rum are often incorporated for flavor.
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

  if (showOverview4 && !quizStarted) {
    return (
      <Container>
        <h2>Cake Decoration Techniques</h2>

        <h3>Layering and Filling:</h3>
        <p>Requires precision to create even, visually appealing layers.</p>

        <h3>Glazing and Coating:</h3>
        <p>
          Many gâteaux are finished with a smooth layer of ganache, glaze, or
          buttercream.
        </p>

        <h3>Decorating:</h3>
        <p>
          Detailed decoration, such as chocolate piping, edible flowers, and
          glaze designs, is key to achieving the sophisticated appearance
          typical of gâteaux.
        </p>

        <h2>Evaluating Gâteaux</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the gâteaux. Ensure the cake
          does not feel dry or crumbly.
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

  if (showOverview5 && !quizStarted) {
    return (
      <Container>
        <h2>Evaluating Gâteaux</h2>

        <h3>Texture and Moisture:</h3>
        <p>
          Evaluate the lightness and fluffiness of the gâteaux. Ensure the cake
          does not feel dry or crumbly.
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
            Gateaux Quiz
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

export default Module3;

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

const GateauxType = styled.div`
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
