import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import gif1 from "../../../assets/gif/1.gif";
import gif2 from "../../../assets/gif/2.gif";
import gif3 from "../../../assets/gif/3.gif";
import gif4 from "../../../assets/gif/4.gif";
import fdcake from "../../../assets/image/fondant-cake.jpg";
import frcake from "../../../assets/image/fruit-cake.jpg";
import lyrcake from "../../../assets/image/layer-cake.jpg";
import mscake from "../../../assets/image/mousse-cake.jpg";
import thmcake from "../../../assets/image/theme-cake.jpg";
import CategoryGame from "../../CategoryGame";
import { CATEGORY_DATA } from "../../categories";

const questions = [
  {
    question:
      "What is the term for a cake designed for a specific theme or occasion, often with elaborate decorations?",
    answer: "b) Specialty cake",
    options: [
      "a) Angel food cake",
      "b) Specialty cake",
      "c) Cheesecake",
      "d) Puff pastry",
    ],
  },
  {
    question:
      "This type of cake is often layered with fillings like mousse, ganache, or buttercream. What is it?",
    answer: "a) Layer cake",
    options: ["a) Layer cake", "b) Swiss roll", "c) Doughnut", "d) Pie"],
  },
  {
    question:
      "Name the cake that frequently involves sculpting and is typically made for weddings, birthdays, or anniversaries.",
    answer: "a) Sculpted cake",
    options: [
      "a) Sculpted cake",
      "b) Petit four",
      "c) Mille-feuille",
      "d) Scone",
    ],
  },
  {
    question:
      "What is the edible medium often used to cover specialty cakes for a smooth, polished appearance?",
    answer: "a) Fondant",
    options: ["a) Fondant", "b) Glaze", "c) Marzipan", "d) Cream cheese"],
  },
  {
    question:
      "Which specialty cake is commonly associated with towering tiers and intricate piping designs?",
    answer: "a) Wedding cake",
    options: [
      "a) Wedding cake",
      "b) Swiss roll",
      "c) Banana bread",
      "d) Muffin",
    ],
  },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const Module1 = ({ quizStarted, setQuizStarted }) => {
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
  const categoryName = "Specialty Cake";
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

  if (showVideo && !quizStarted) {
    return (
      <Container>
        <VideoContainer>
          <VideoWrapper>
            <VideoTitle>Differents design of Specialty Cake</VideoTitle>
            <iframe
              width="100%"
              height="100%"
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
              width="100%"
              height="100%"
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
          By the end of this Lesson, students will have the practical skills to
          design and create beautiful, flavorful specialty cakes, enhancing
          their competencies as future pastry chefs or culinary professionals.
        </p>
        <h2>Module Objectives</h2>
        <p>
          By the end of this module, students will be able to:
          <ul>
            <li>
              Define specialty cakes and describe their significance in the
              culinary and baking industries.
            </li>
            <li>
              Identify different types of specialty cakes and their core
              ingredients.
            </li>
            <li>
              Apply advanced techniques for baking, filling, frosting, and
              decorating specialty cakes.
            </li>
            <li>
              Evaluate the quality of specialty cakes based on texture, flavor,
              and aesthetic presentation.
            </li>
            <li>
              Demonstrate skills in cake design by creating a specialty cake
              using industry-standard techniques.
            </li>
          </ul>
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
        <CakeType>
          <img src={lyrcake} alt="Layer Cake" />
          <p>
            <strong>Layer Cakes:</strong> is a stack of multiple layers or
            sheets of cake held together by some form of filling. The filling
            could be anything decadent such as jam, frosting, or cream. The type
            of cakes that are typically used in layer cakes are butter cakes or
            sponge cakes. Popular flavor combinations include the German
            chocolate cake, red velvet cake, Black Forest cake, and carrot cake
            with cream cheese icing. Primarily used in special occasions such as
            Christian weddings, layer cakes add a special touch to memorable
            events.
          </p>
        </CakeType>
        <CakeType>
          <img src={fdcake} alt="Fondant Cake" />
          <p>
            <strong>Fondant Cakes:</strong> Fondant is an edible icing with a
            pliable texture that can be rolled, shaped, and sculpted. It's most
            commonly used to decorate cakes, cupcakes, and cookies. There are
            different types of fondant, including rolled fondant, pour fondant,
            chocolate fondant, sculpting fondant, marshmallow fondant, and
            gumpaste fondant.
          </p>
        </CakeType>
        <CakeType>
          <img src={mscake} alt="Mousse Cake" />
          <p>
            <strong>Mousse Cakes:</strong> Mousse cake is a type of dessert that
            has an airy or fluffy texture. The word 'mousse' itself literally
            translates to “foam” in French due to its really light structure.
            This light texture can be achieved thanks to the folding technique,
            which is the movement of gently folding in an “areator” onto a
            “base.”
          </p>
        </CakeType>
        <CakeType>
          <img src={frcake} alt="Fruit Cake" />
          <p>
            <strong>Fruit Cakes:</strong> Fruitcake or fruit cake is a cake made
            with candied or dried fruit, nuts, and spices, and optionally soaked
            in spirits. In the United Kingdom, certain rich versions may be iced
            and decorated. Also, cakes that use fruits as the main ingredient,
            often used in celebrations and holidays.
          </p>
        </CakeType>
        <CakeType>
          <img src={thmcake} alt="Theme Cake" />
          <p>
            <strong>Theme Cakes:</strong> Custom cakes designed for a specific
            event, such as weddings, birthdays, or holidays.
          </p>
        </CakeType>
        <ProceedButton onClick={handleProceedToOverview3}>
          Proceed to Key Ingredients
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview3 && !quizStarted) {
    return (
      <Container>
        <h2>Key Ingredients and Tools for Specialty Cakes</h2>
        <h2>Core Ingredients:</h2>
        <ul>
          <li>Cake Pans (round, square, or custom shapes)</li>
          <li>Mixing Bowls, Electric Mixers, Spatulas</li>
          <li>Piping Bags and Tips (for decorating)</li>
          <li>Cake Turntable (for even decoration)</li>
          <li>Cooling Racks (for proper cake cooling)</li>
        </ul>
        <h2>Decorating Ingredients</h2>
        <p>
          Buttercream Frosting, Ganache, Fondant, Whipped Cream, and Mousse
          Edible Flowers, Chocolate Decorations, Fondant Figures
        </p>
        <h2>Essential Tools:</h2>
        <ul>
          <li>Flour (cake flour for light, delicate cakes)</li>
          <li>Butter or oil (provides moisture and richness)</li>
          <li>Sugar (granulated sugar for sweetness)</li>
          <li>Eggs (for structure and binding)</li>
          <li>Baking Powder or Baking Soda (leavening agents for rising)</li>
          <li>
            Flavorings such as vanilla extract, cocoa powder, citrus zest, and
            spices
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
        <h2>Techniques for Preparing Specialty Cakes</h2>
        <h2>Baking the Cake Layers:</h2>
        <ul>
          <li>
            <b>Preparation:</b> Grease and line the cake pans properly.
          </li>
          <li>
            <b>Mixing Techniques:</b> Learn the creaming method, which involves
            beating butter and sugar to incorporate air before adding eggs and
            dry ingredients.
          </li>
          <li>
            <b>Baking:</b> Preheat the oven and ensure that cakes are baked at
            the correct temperature and time, checked with a toothpick or skewer
            for doneness.
          </li>
        </ul>
        <h2>Making Fillings and Frostings</h2>
        <ul>
          <li>
            <b>Buttercream Frosting:</b> Whip butter and powdered sugar together
            until fluffy, then add flavoring.
          </li>
          <li>
            <b>Whipped Cream:</b> For a light, airy filling, use chilled cream
            whipped to stiff peaks.
          </li>
          <li>
            <b>Ganache:</b> A rich, smooth chocolate mixture used as a filling
            or glaze.
          </li>
        </ul>
        <h2>Cake Decoration Techniques</h2>
        <ul>
          <li>
            <b>Fondant Decoration:</b> Roll fondant evenly and cover the cake to
            create a smooth, flawless finish. Use cutters and molds to create
            decorative elements such as flowers, ribbons, and figurines.
          </li>
          <li>
            <b>Piping Techniques:</b> Use various piping tips for borders,
            flowers, and other designs. Techniques such as rosettes, shell
            borders, and basket weave can be applied using buttercream or royal
            icing.
          </li>
          <li>
            <b>Creating Themed Cakes:</b> Design cakes that reflect specific
            themes using both 3D and 2D decorations. Examples include wedding
            cakes with sugar flowers, birthday cakes with cartoon characters, or
            holiday cakes with festive designs.
          </li>
        </ul>
        <h2>Evaluating Specialty Cakes</h2>
        <ul>
          <li>
            <b>Texture and Moisture:</b> Evaluate the lightness and fluffiness
            of the cake layers. Ensure the cake does not feel dry or crumbly.
          </li>
          <li>
            <b>Flavor Balance:</b> Check the balance between the sweetness of
            the frosting and the flavor of the cake. For instance, rich cakes
            like chocolate should pair well with lighter fillings like whipped
            cream or mousse.
          </li>
        </ul>
        <ProceedButton onClick={handleProceedToOverview5}>
          Proceed to Evaluating
        </ProceedButton>
      </Container>
    );
  }

  if (showOverview5 && !quizStarted) {
    return (
      <Container>
        <h2>Evaluating Specialty Cakes</h2>
        <ul>
          <li>
            <b>Preparation:</b> Grease and line the cake pans properly.
          </li>
          <li>
            <b>Mixing Techniques:</b> Learn the creaming method, which involves
            beating butter and sugar to incorporate air before adding eggs and
            dry ingredients.
          </li>
          <li>
            <b>Baking:</b> Preheat the oven and ensure that cakes are baked at
            the correct temperature and time, checked with a toothpick or skewer
            for doneness.
          </li>
        </ul>
        <h2>Making Fillings and Frostings</h2>
        <ul>
          <li>
            <b>Buttercream Frosting:</b> Whip butter and powdered sugar together
            until fluffy, then add flavoring.
          </li>
          <li>
            <b>Whipped Cream:</b> For a light, airy filling, use chilled cream
            whipped to stiff peaks.
          </li>
          <li>
            <b>Ganache:</b> A rich, smooth chocolate mixture used as a filling
            or glaze.
          </li>
        </ul>
        <h2>Cake Decoration Techniques</h2>
        <ul>
          <li>
            <b>Fondant Decoration:</b> Roll fondant evenly and cover the cake to
            create a smooth, flawless finish. Use cutters and molds to create
            decorative elements such as flowers, ribbons, and figurines.
          </li>
          <li>
            <b>Piping Techniques:</b> Use various piping tips for borders,
            flowers, and other designs. Techniques such as rosettes, shell
            borders, and basket weave can be applied using buttercream or royal
            icing.
          </li>
          <li>
            <b>Creating Themed Cakes:</b> Design cakes that reflect specific
            themes using both 3D and 2D decorations. Examples include wedding
            cakes with sugar flowers, birthday cakes with cartoon characters, or
            holiday cakes with festive designs.
          </li>
        </ul>
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
            Specialty Cake Quiz
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

export default Module1;

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

const CakeType = styled.div`
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
