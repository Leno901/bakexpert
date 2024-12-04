import React, { useState } from 'react';
import './styles.css';

const questions = [
  {
    question: "1. What makes a bread 'enriched'?",
    options: [
      { answer: 'a) The addition of water', isCorrect: false },
      { answer: 'b) The addition of fat, sugar, and/or eggs', isCorrect: true },
      { answer: 'c) The use of whole wheat flour', isCorrect: false },
      { answer: 'd) The use of sourdough starter', isCorrect: false },
    ],
  },
  {
    question: "2. Enriched breads generally have a:",
    options: [
      { answer: 'a) Dry and crumbly texture', isCorrect: false },
      { answer: 'b) More tender and softer texture', isCorrect: true },
      { answer: 'c) Chewy texture', isCorrect: false },
      { answer: 'd) Dense and heavy texture', isCorrect: false },
    ],
  },
  {
    question: "3. Which of the following is NOT a characteristic of enriched bread?",
    options: [
      { answer: 'a) Increased shelf life', isCorrect: false },
      { answer: 'b) Richer flavor', isCorrect: false },
      { answer: 'c) Increased browning', isCorrect: false },
      { answer: 'd) Very long fermentation time', isCorrect: true },
    ],
  },
  {
    question: "4. What kind of fat is commonly used in enriched bread?",
    options: [
      { answer: 'a) Olive oil', isCorrect: false },
      { answer: 'b) Vegetable shortening', isCorrect: false },
      { answer: 'c) Butter', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "5. What does adding sugar do in enriched bread?",
    options: [
      { answer: 'a) Makes it healthier', isCorrect: false },
      { answer: 'b) Increases browning and flavor', isCorrect: true },
      { answer: 'c) Decreases the rise', isCorrect: false },
      { answer: 'd) Makes the dough harder to handle', isCorrect: false },
    ],
  },
  {
    question: "6. What is the function of eggs in enriched bread?",
    options: [
      { answer: 'a) They add color only', isCorrect: false },
      { answer: 'b) They add richness, flavor, and moisture', isCorrect: true },
      { answer: 'c) They decrease the rise', isCorrect: false },
      { answer: 'd) They make the bread more crumbly', isCorrect: false },
    ],
  },
  {
    question: "7. Which of these is an example of enriched bread?",
    options: [
      { answer: 'a) Baguette', isCorrect: false },
      { answer: 'b) Rye bread', isCorrect: false },
      { answer: 'c) Brioche', isCorrect: true },
      { answer: 'd) Pumpernickel', isCorrect: false },
    ],
  },
  {
    question: "8. Enriched breads often require:",
    options: [
      { answer: 'a) Shorter kneading times', isCorrect: false },
      { answer: 'b) Longer kneading times', isCorrect: true },
      { answer: 'c) No kneading', isCorrect: false },
      { answer: 'd) It depends on the recipe', isCorrect: false },
    ],
  },
  {
    question: "9. Which of the following methods is commonly employed to enhance the flavor of bread made with enriched dough?",
    options: [
      { answer: 'a) Adding salt', isCorrect: false },
      { answer: 'b) Adding milk', isCorrect: false },
      { answer: 'c) Using high-quality ingredients', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "10. How does the addition of fat affect the gluten development in enriched bread?",
    options: [
      { answer: 'a) It strengthens gluten development', isCorrect: false },
      { answer: 'b) It weakens gluten development', isCorrect: true },
      { answer: 'c) It has no effect', isCorrect: false },
      { answer: 'd) It depends on the type of fat', isCorrect: false },
    ],
  },
  {
    question: "11. What is a common method for shaping enriched bread?",
    options: [
      { answer: 'a) Only hand-shaping', isCorrect: false },
      { answer: 'b) Only machine shaping', isCorrect: false },
      { answer: 'c) Hand-shaping or using molds', isCorrect: true },
      { answer: 'd) It doesn\'t matter', isCorrect: false },
    ],
  },
  {
    question: "12. Enriched breads often have a higher:",
    options: [
      { answer: 'a) Protein content', isCorrect: false },
      { answer: 'b) Fat content', isCorrect: true },
      { answer: 'c) Fiber content', isCorrect: false },
      { answer: 'd) Water content', isCorrect: false },
    ],
  },
  {
    question: "13. What is a possible drawback of adding too much fat in enriched bread?",
    options: [
      { answer: 'a) The bread will rise too much', isCorrect: false },
      { answer: 'b) The bread will be too dry', isCorrect: false },
      { answer: 'c) The bread will be too greasy or dense', isCorrect: true },
      { answer: 'd) The bread will not brown', isCorrect: false },
    ],
  },
  {
    question: "14. What is often used to glaze enriched breads?",
    options: [
      { answer: 'a) Only water', isCorrect: false },
      { answer: 'b) Egg wash', isCorrect: false },
      { answer: 'c) Sugar syrup', isCorrect: false },
      { answer: 'd) Both b and c', isCorrect: true },
    ],
  },
  {
    question: "15. How is the shelf life of enriched bread compared to lean bread?",
    options: [
      { answer: 'a) Shorter', isCorrect: false },
      { answer: 'b) Longer', isCorrect: true },
      { answer: 'c) The same', isCorrect: false },
      { answer: 'd) It depends on storage', isCorrect: false },
    ],
  },
];


const Assessment = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (questionIndex, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return answers[index] === question.options.find(option => option.isCorrect).answer
        ? score + 1
        : score;
    }, 0);
  };

  return (
    <div>
      <h1>Enriched Bread Quiz</h1>
      <form className='forms'>
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question.question}</p>
            {question.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option.answer}
                  checked={answers[index] === option.answer}
                  onChange={() => handleChange(index, option.answer)}
                  disabled={submitted}
                />
                {option.answer}
              </label>
            ))}
          </div>
        ))}
        {!submitted ? (
          <div>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        ) : (
          <div>
            <h2 className='h2s'>Your Score: {calculateScore()} / {questions.length}</h2>
            <button className='buttons' type="button" onClick={handleReset}>
              Try Again
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Assessment;
