import React, { useState } from 'react';
import './styles.css';

const questions = [
  {
    question: "1. What is a gateau?",
    options: [
      { answer: 'a) A type of French bread', isCorrect: false },
      { answer: 'b) A type of French pastry', isCorrect: true },
      { answer: 'c) A type of French cheese', isCorrect: false },
      { answer: 'd) A type of French soup', isCorrect: false },
    ],
  },
  {
    question: "2. Gateaux are generally characterized by:",
    options: [
      { answer: 'a) Their savory flavor', isCorrect: false },
      { answer: 'b) Their small size', isCorrect: false },
      { answer: 'c) Their elaborate decoration and presentation', isCorrect: true },
      { answer: 'd) Their use of only fruit fillings', isCorrect: false },
    ],
  },
  {
    question: "3. Of the following, WHAT IS NOT normally a gateau?",
    options: [
      { answer: 'a) Opera Cake', isCorrect: false },
      { answer: 'b) Croissant', isCorrect: true },
      { answer: 'c) Saint-Honoré Cake', isCorrect: false },
      { answer: 'd) Charlotte Cake', isCorrect: false },
    ],
  },
  {
    question: "4. Most gateaux contain:",
    options: [
      { answer: 'a) Plain, rough textures', isCorrect: false },
      { answer: 'b) Layers of cake and filling', isCorrect: true },
      { answer: 'c) A single flavor profile', isCorrect: false },
      { answer: 'd) Little decoration', isCorrect: false },
    ],
  },
  {
    question: "5. What ingredient do many gateaux have in common?",
    options: [
      { answer: 'a) Potatoes', isCorrect: false },
      { answer: 'b) Butter', isCorrect: true },
      { answer: 'c) Cheese', isCorrect: false },
      { answer: 'd) Bread', isCorrect: false },
    ],
  },
  {
    question: "6. What is a typical filling in most gateaux?",
    options: [
      { answer: 'a) Only fruit fillings', isCorrect: false },
      { answer: 'b) Only chocolate fillings', isCorrect: false },
      { answer: 'c) Various creams, fruits, and mousses', isCorrect: true },
      { answer: 'd) Mainly savory fillings', isCorrect: false },
    ],
  },
  {
    question: "7. What is often used to decorate gateaux?",
    options: [
      { answer: 'a) Only powdered sugar', isCorrect: false },
      { answer: 'b) Fondant, ganache, and fresh fruit', isCorrect: true },
      { answer: 'c) Only chocolate shavings', isCorrect: false },
      { answer: 'd) Only whipped cream', isCorrect: false },
    ],
  },
  {
    question: "8. Are gateaux typically served:",
    options: [
      { answer: 'a) For breakfast', isCorrect: false },
      { answer: 'b) As a main course', isCorrect: false },
      { answer: 'c) As a dessert', isCorrect: true },
      { answer: 'd) As an appetizer', isCorrect: false },
    ],
  },
  {
    question: "9. The term 'gateau' originates from which language?",
    options: [
      { answer: 'a) Italian', isCorrect: false },
      { answer: 'b) Spanish', isCorrect: false },
      { answer: 'c) French', isCorrect: true },
      { answer: 'd) English', isCorrect: false },
    ],
  },
  {
    question: "10. What does the word 'gateau' literally mean?",
    options: [
      { answer: 'a) Small cake', isCorrect: false },
      { answer: 'b) Big cake', isCorrect: false },
      { answer: 'c) Cake', isCorrect: true },
      { answer: 'd) Pastry', isCorrect: false },
    ],
  },
  {
    question: "11. Which of these is a classic example of a French gateau?",
    options: [
      { answer: 'a) Cheesecake', isCorrect: false },
      { answer: 'b) Black Forest Cake', isCorrect: true },
      { answer: 'c) Tiramisu', isCorrect: false },
      { answer: 'd) Crème brûlée', isCorrect: false },
    ],
  },
  {
    question: "12. What is a typical way of making layers in a gateau?",
    options: [
      { answer: 'a) Using only one type of cake', isCorrect: false },
      { answer: 'b) Using multiple layers of different cakes', isCorrect: true },
      { answer: 'c) Baking the entire cake in one pan', isCorrect: false },
      { answer: 'd) Not layering at all', isCorrect: false },
    ],
  },
  {
    question: "13. What is often used to create a smooth finish on a gateau?",
    options: [
      { answer: 'a) Only powdered sugar', isCorrect: false },
      { answer: 'b) Ganache or buttercream frosting', isCorrect: true },
      { answer: 'c) Only chocolate syrup', isCorrect: false },
      { answer: 'd) Only jam', isCorrect: false },
    ],
  },
  {
    question: "14. Gateaux are often associated with:",
    options: [
      { answer: 'a) Desserts for everyday, casual events', isCorrect: false },
      { answer: 'b) Special occasions and celebrations', isCorrect: true },
      { answer: 'c) Quick and easy desserts', isCorrect: false },
      { answer: 'd) Savory meals', isCorrect: false },
    ],
  },
  {
    question: "15. How are gateaux usually kept?",
    options: [
      { answer: 'a) At room temperature', isCorrect: false },
      { answer: 'b) In the refrigerator', isCorrect: false },
      { answer: 'c) Depends on the ingredient and type of gateaux', isCorrect: true },
      { answer: 'd) Frozen for long term storage', isCorrect: false },
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
      <h1>Gateaux  Quiz</h1>
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
