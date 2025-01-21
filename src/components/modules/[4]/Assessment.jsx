import React, { useState } from "react";
import "./styles.css";

const questions = [
  {
    question: "1. A Swiss roll is also called:",
    options: [
      { answer: "a) Jelly roll", isCorrect: true },
      { answer: "b) Biscuit roll", isCorrect: false },
      { answer: "c) Sponge roll", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "2. The core component of a Swiss roll is:",
    options: [
      { answer: "a) Choux pastry", isCorrect: false },
      { answer: "b) Puff pastry", isCorrect: false },
      { answer: "c) Thin sponge cake", isCorrect: true },
      { answer: "d) Shortbread crust", isCorrect: false },
    ],
  },
  {
    question: "3. What is the common shape of a Swiss roll?",
    options: [
      { answer: "a) Round", isCorrect: false },
      { answer: "b) Square", isCorrect: false },
      { answer: "c) Rectangular", isCorrect: true },
      { answer: "d) Triangular", isCorrect: false },
    ],
  },
  {
    question: "4. What is commonly used to fill a Swiss roll?",
    options: [
      { answer: "a) Only whipped cream", isCorrect: false },
      { answer: "b) Only jam", isCorrect: false },
      { answer: "c) Whipped cream, jam, or other fillings", isCorrect: true },
      { answer: "d) Only chocolate ganache", isCorrect: false },
    ],
  },
  {
    question:
      "5. The sponge cake for a Swiss roll is typically baked in what type of pan?",
    options: [
      { answer: "a) Bundt pan", isCorrect: false },
      { answer: "b) Springform pan", isCorrect: false },
      { answer: "c) Rectangular baking sheet", isCorrect: true },
      { answer: "d) Muffin tin", isCorrect: false },
    ],
  },
  {
    question: "6. What is the main requirement for an ideal Swiss roll?",
    options: [
      { answer: "a) Using a very high oven temperature", isCorrect: false },
      { answer: "b) A thin, evenly baked sponge", isCorrect: true },
      { answer: "c) Using only one type of filling", isCorrect: false },
      { answer: "d) Baking for a long time", isCorrect: false },
    ],
  },
  {
    question: "7. Why is the Swiss roll immediately rolled up after baking?",
    options: [
      { answer: "a) To prevent it from drying out", isCorrect: false },
      { answer: "b) To make it easier to frost", isCorrect: false },
      { answer: "c) To set the shape and prevent cracking", isCorrect: true },
      { answer: "d) To make it easier to slice", isCorrect: false },
    ],
  },
  {
    question:
      "8. What is often used to prevent the Swiss roll from sticking to the baking sheet?",
    options: [
      { answer: "a) Butter", isCorrect: false },
      { answer: "b) Flour", isCorrect: false },
      { answer: "c) Parchment paper", isCorrect: true },
      { answer: "d) Oil", isCorrect: false },
    ],
  },
  {
    question: "9. Which of these is NOT a common filling for a Swiss roll?",
    options: [
      { answer: "a) Whipped cream", isCorrect: false },
      { answer: "b) Chocolate buttercream", isCorrect: false },
      { answer: "c) Fruit curd", isCorrect: false },
      { answer: "d) Meatloaf", isCorrect: true },
    ],
  },
  {
    question: "10. What is often used to dust the outside of a Swiss roll?",
    options: [
      { answer: "a) Cocoa powder", isCorrect: false },
      { answer: "b) Powdered sugar", isCorrect: false },
      { answer: "c) Cinnamon", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "11. The batter for a Swiss roll is typically:",
    options: [
      { answer: "a) Very thick", isCorrect: false },
      { answer: "b) Very thin", isCorrect: false },
      { answer: "c) Medium consistency", isCorrect: true },
      { answer: "d) It varies greatly", isCorrect: false },
    ],
  },
  {
    question:
      "12. What ingredient helps to create a light and airy sponge in a Swiss roll?",
    options: [
      { answer: "a) Baking soda", isCorrect: false },
      { answer: "b) Baking powder", isCorrect: false },
      { answer: "c) Eggs", isCorrect: true },
      { answer: "d) Both a and b", isCorrect: false },
    ],
  },
  {
    question: "13. Following rolling, a Swiss roll is typically:",
    options: [
      { answer: "a) Kept at room temperature", isCorrect: false },
      { answer: "b) Refrigerated until the filling hardens", isCorrect: true },
      { answer: "c) Put in the deep freeze immediately", isCorrect: false },
      { answer: "d) Baked", isCorrect: false },
    ],
  },
  {
    question: "14. A typical means for flavoring a Swiss roll sponge",
    options: [
      { answer: "a) Salt", isCorrect: false },
      { answer: "b) Vanilla extract", isCorrect: true },
      { answer: "c) Spices", isCorrect: true },
      { answer: "d) Both b and c", isCorrect: true },
    ],
  },
  {
    question: "15. Can Swiss roll be prepared ahead?",
    options: [
      { answer: "a) No, it must be consumed immediately", isCorrect: false },
      {
        answer: "b) Yes, it can be prepared a day or two in advance",
        isCorrect: true,
      },
      { answer: "c) Only if frozen", isCorrect: false },
      { answer: "d) It depends on the filling", isCorrect: false },
    ],
  },
];

const Assessment = ({ userName }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (questionIndex, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return answers[index] ===
        question.options.find((option) => option.isCorrect).answer
        ? score + 1
        : score;
    }, 0);
  };

  const saveResultsToFirestore = async (score) => {
    const result = {
      userName,
      score,
      totalQuestions: questions.length,
      quizName: "Swiss Roll Quiz",
      timestamp: new Date().toISOString(),
    };

    try {
      setIsSaving(true);
      const docRef = await addDoc(collection(db, "quizResults"), result); // Save to Firestore
      console.log("Document written with ID:", docRef.id);
      setSaveSuccess(true);
    } catch (error) {
      console.error("Error saving results:", error);
      setSaveSuccess(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    await saveResultsToFirestore(score);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setSaveSuccess(false);
  };

  return (
    <div>
      <h1>Petit Four Quiz</h1>
      <p>Welcome, {userName}!</p>
      <form className="forms">
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
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSaving || Object.keys(answers).length < questions.length
              }
            >
              {isSaving ? "Saving..." : "Submit"}
            </button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        ) : (
          <div>
            <h2 className="h2s">
              Your Score: {calculateScore()} / {questions.length}
            </h2>
            {saveSuccess ? (
              <p className="success">Results saved successfully!</p>
            ) : (
              <p className="error">
                Failed to save results. Please try again later.
              </p>
            )}
            <button className="buttons" type="button" onClick={handleReset}>
              Try Again
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Assessment;
