import React, { useState, useEffect } from "react";
import "./styles.css";

function CategoryGame({ category, data }) {
  const [correctWord, setCorrectWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPlayOn, setIsPlayOn] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const selectWord = () => {
    const words = data.words;
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
        setMessage("Correct Answer!");
        setClassName("bg-green");

        setInputValue("");
        const word = selectWord();
        setCorrectWord(word.toUpperCase());
        setScrambledWord(constructScrambledWord(word));
      } else {
        setMessage("Wrong Answer!");
        setClassName("bg-red");
      }
    } else {
      setMessage("Write a Word!");
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
    setIsPlayOn(true);
    setInputValue("");
    setMessage("");
    const word = selectWord();
    setCorrectWord(word.toUpperCase());
    setScrambledWord(constructScrambledWord(word));
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
          {data.image && (
            <div className="category-image-container">
              <img src={data.image} alt={category} className="category-image" />
            </div>
          )}

          {/* Display Category Name */}
          <h1 className="title">CATEGORY: {category}</h1>

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

export default CategoryGame;
