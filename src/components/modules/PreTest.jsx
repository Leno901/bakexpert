import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS file
import spcake from "../../assets/image/layer-cake.jpg";
import pfour from "../../assets/image/fourfrais.png";
import gcake from "../../assets/image/gateaux1.png";
import sroll from "../../assets/image/swiss1.png";
import eb from "../../assets/image/eb1.png";
import qb from "../../assets/image/qb1.png";

// New categories with words and their scrambled versions
const WORDS = {
  "Specialty Cake": [
    "CHEESECAKE",
    "BUTTERCREAM",
    "CHARLOTTE",
    "PORTIONING",
    "DECORATION",
  ],
  "Petit Fours": ["PASTILLAGE", "ÉCLAIR", "GATEAUX", "MARZIPAN", "GLACÉE"],
  Gâteaux: ["GANACHE", "CRÈME", "GATEAUX", "SPLIT", "DECORATION"],
  "Swiss Roll": ["SWISS", "ROLL", "BUTTERCREAM", "GLAZING", "ROLLER"],
  "Enriched Bread": ["ENRICHED", "BRIOCHE", "CHALLAH", "NANTERRE", "EGG WASH"],
  "Quick Bread": ["MUFFIN", "SCONES", "BANANA BREAD", "BISCUIT", "SOAKING"],
  "Scramble Words": ["BREAD", "CAKE", "COOKIE", "PIE", "CUPCAKE"], // New default category
};

const CATEGORY_IMAGES = {
  "Specialty Cake": spcake,
  "Petit Fours": pfour,
  Gâteaux: gcake,
  "Swiss Roll": sroll,
  "Enriched Bread": eb,
  "Quick Bread": qb,
  "Scramble Words": spcake,
};

function PreTest() {
  const [correctWord, setCorrectWord] = useState("");
  const [scrambledWord, setScramledWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPlayOn, setIsPlayOn] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Scramble Words"); // Default category

  const selectCategory = () => {
    const categories = Object.keys(WORDS);
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    setSelectedCategory(randomCategory);
    return randomCategory;
  };

  const selectWord = (category) => {
    const words = WORDS[category];
    const radIndex = Math.floor(Math.random() * words.length);
    return words[radIndex];
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value.toUpperCase());
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (inputValue !== "") {
      if (correctWord === inputValue) {
        setMessage("Correct Answer !");
        setClassName("bg-green");

        setInputValue("");
        const word = selectWord(selectedCategory);
        setCorrectWord(word.toUpperCase());
        setScramledWord(constructScrambledWord(word));
      } else {
        setMessage("Wrong Answer !!!");
        setClassName("bg-red");
      }
    } else {
      setMessage("Write a Word !!");
      setClassName("bg-yellow");
    }
  };

  const constructScrambledWord = (word) => {
    const shuffledArray = word.split("");
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const k = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[k]] = [
        shuffledArray[k],
        shuffledArray[i],
      ];
    }
    return shuffledArray.join("");
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    const category = selectCategory();
    setIsPlayOn(true);
    setInputValue("");
    setMessage("");
    const word = selectWord(category);
    setCorrectWord(word.toUpperCase());
    setScramledWord(constructScrambledWord(word));
  };

  useEffect(() => {
    let clearMessage;
    if (message) {
      clearMessage = setTimeout(() => setMessage(""), 800);
    }
    return () => {
      if (clearMessage) {
        clearTimeout(clearMessage);
      }
    };
  }, [message]);

  return (
    <form>
      <div className="word-scramble-container">
        <div className="game-box">
          {/* Display Category Image */}
          {selectedCategory && (
            <div className="category-image-container">
              <img
                src={CATEGORY_IMAGES[selectedCategory]}
                alt={selectedCategory}
                className="category-image"
              />
            </div>
          )}

          {/* Display Category Name */}
          <h1 className="title">CATEGORY: {selectedCategory}</h1>

          {/* Display Game */}
          <div className="content-container">
            {Boolean(message) && (
              <div className="message-container">
                <p className={`message ${className}`}>{message}</p>
              </div>
            )}

            {isPlayOn ? (
              <>
                <div className="word-display">
                  <div className="word-box">
                    {correctWord.split("").map((el, i) => (
                      <span key={`${el}_${i}`} className="letter-box">
                        {inputValue[i]}
                      </span>
                    ))}
                  </div>
                  <p className="scrambled-word">{scrambledWord}</p>
                </div>
                <div className="input-container">
                  <input
                    className="input-field"
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Guess the word"
                    value={inputValue}
                  />
                  <input
                    className="submit-btn"
                    onClick={handleClick}
                    type="submit"
                    value="Enter"
                  />
                </div>
              </>
            ) : (
              <div className="start-game">
                <button className="start-btn" onClick={handleStartGame}>
                  Start Game
                </button>
              </div>
            )}

            {isPlayOn && (
              <div className="new-game">
                <button className="new-game-btn" onClick={handleStartGame}>
                  New Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default PreTest;
