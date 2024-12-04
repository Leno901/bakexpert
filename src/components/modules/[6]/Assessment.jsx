import React, { useState } from 'react';
import './styles.css';

const questions = [
  {
    question: "1. What is the hallmark of a quick bread?",
    options: [
      { answer: 'a) Long fermentation time', isCorrect: false },
      { answer: 'b) Use of a sourdough starter', isCorrect: false },
      { answer: 'c) No yeast', isCorrect: true },
      { answer: 'd) Use of only whole wheat flour', isCorrect: false },
    ],
  },
  {
    question: "2. Quick breads depend on what for rising?",
    options: [
      { answer: 'a) Yeast', isCorrect: false },
      { answer: 'b) Baking powder and/or baking soda', isCorrect: false },
      { answer: 'c) Steam', isCorrect: false },
      { answer: 'd) Both b and c', isCorrect: true },
    ],
  },
  {
    question: "3. What is a common ingredient in many quick breads?",
    options: [
      { answer: 'a) Butter', isCorrect: false },
      { answer: 'b) Eggs', isCorrect: false },
      { answer: 'c) Flour', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "4. Which of these is NOT a typical quick bread?",
    options: [
      { answer: 'a) Muffins', isCorrect: false },
      { answer: 'b) Scones', isCorrect: false },
      { answer: 'c) Baguettes', isCorrect: true },
      { answer: 'd) Cornbread', isCorrect: false },
    ],
  },
  {
    question: "5. What is the function of baking soda in quick bread?",
    options: [
      { answer: 'a) To contribute to the sweetness', isCorrect: false },
      { answer: 'b) To react with an acid to create carbon dioxide', isCorrect: true },
      { answer: 'c) To add color', isCorrect: false },
      { answer: 'd) To make the bread more dense', isCorrect: false },
    ],
  },
  {
    question: "6. What is the function of baking powder in quick bread?",
    options: [
      { answer: 'a) To add sweetness', isCorrect: false },
      { answer: 'b) To provide both acid and base for leavening', isCorrect: true },
      { answer: 'c) To add color', isCorrect: false },
      { answer: 'd) To make the bread more dense', isCorrect: false },
    ],
  },
  {
    question: "7. What is a common acid ingredient that reacts with baking soda in quick breads?",
    options: [
      { answer: 'a) Sugar', isCorrect: false },
      { answer: 'b) Salt', isCorrect: false },
      { answer: 'c) Buttermilk', isCorrect: true },
      { answer: 'd) Both b and c', isCorrect: false },
    ],
  },
  {
    question: "8. Overmixing quick bread dough can result in:",
    options: [
      { answer: 'a) A lighter and airier texture', isCorrect: false },
      { answer: 'b) A tougher texture', isCorrect: true },
      { answer: 'c) A more flavorful texture', isCorrect: false },
      { answer: 'd) No change in texture', isCorrect: false },
    ],
  },
  {
    question: "9. What is one typical technique for incorporating moisture into quick bread?",
    options: [
      { answer: 'a) Using water alone', isCorrect: false },
      { answer: 'b) Using milk or buttermilk', isCorrect: false },
      { answer: 'c) Using oil', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "10. What are often used to add flavor to quick breads?",
    options: [
      { answer: 'a) Extracts', isCorrect: false },
      { answer: 'b) Spices', isCorrect: false },
      { answer: 'c) Fruits', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "11. How is the doneness of a quick bread usually checked?",
    options: [
      { answer: 'a) With the aid of a thermometer', isCorrect: false },
      { answer: 'b) By driving in a toothpick or skewer', isCorrect: true },
      { answer: 'c) By checking the colour', isCorrect: false },
      { answer: 'd) Both b and c', isCorrect: true },
    ],
  },
  {
    question: "12. How can one avoid the quick bread sticking to the pan?",
    options: [
      { answer: 'a) Grease the pan', isCorrect: false },
      { answer: 'b) Parchment paper', isCorrect: false },
      { answer: 'c) Non-stick pan', isCorrect: false },
      { answer: 'd) All of the above', isCorrect: true },
    ],
  },
  {
    question: "13. Quick breads are usually baked at what sort of temperature?",
    options: [
      { answer: 'a) Very low temperature', isCorrect: false },
      { answer: 'b) Moderate temperature', isCorrect: true },
      { answer: 'c) Very high temperature', isCorrect: false },
      { answer: 'd) It varies greatly', isCorrect: false },
    ],
  },
  {
    question: "14. How long do quick breads normally bake?",
    options: [
      { answer: 'a) Several hours', isCorrect: false },
      { answer: 'b) 20-40 minutes', isCorrect: true },
      { answer: 'c) 1-2 hours', isCorrect: false },
      { answer: 'd) It varies greatly', isCorrect: false },
    ],
  },
  {
    question: "15. Are quick breads able to be made ahead of time?",
    options: [
      { answer: 'a) No, they have to be eaten immediately', isCorrect: false },
      { answer: 'b) Yes, they can be stored for several days', isCorrect: true },
      { answer: 'c) Only if frozen', isCorrect: false },
      { answer: 'd) Depends on recipe', isCorrect: false },
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
      <h1>Quick Bread Quiz</h1>
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
