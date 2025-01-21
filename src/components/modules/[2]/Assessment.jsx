import React, { useState } from "react";
import "./styles.css";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../../firebase";

const questions = [
  {
    question: "1. Petit fours are typically characterized by their",
    options: [
      { answer: "a) Large size", isCorrect: false },
      { answer: "b) Savory flavor", isCorrect: false },
      { answer: "c) Delicate size and intricate decoration", isCorrect: true },
      { answer: "d) Use of only fruit fillings", isCorrect: false },
    ],
  },
  {
    question: "2. What is the common size of a petit four?",
    options: [
      { answer: "a) Larger than a cupcake", isCorrect: false },
      { answer: "b) About the size of a large cookie", isCorrect: false },
      { answer: "c) About the size of a bite or two", isCorrect: true },
      { answer: "d) As large as a standard layer cake", isCorrect: false },
    ],
  },
  {
    question: "3. Petit fours are often served:",
    options: [
      { answer: "a) For breakfast", isCorrect: false },
      { answer: "b) As a main course", isCorrect: false },
      { answer: "c) As a dessert or after-dinner treat", isCorrect: true },
      { answer: "d) As a savory appetizer", isCorrect: false },
    ],
  },
  {
    question: "4. Which of these is NOT a common type of petit four?",
    options: [
      { answer: "a) Petit fours secs", isCorrect: false },
      { answer: "b) Petit fours glacés", isCorrect: false },
      { answer: "c) Petit fours à la crème", isCorrect: false },
      { answer: "d) Petit fours au fromage (cheese)", isCorrect: true },
    ],
  },
  {
    question: "5. Petit fours secs are typically:",
    options: [
      { answer: "a) Cream filling", isCorrect: false },
      { answer: "b) Icing-coated", isCorrect: false },
      { answer: "c) Dry, small cakes or cookies", isCorrect: true },
      { answer: "d) Fresh fruit", isCorrect: false },
    ],
  },
  {
    question: "6. Petit fours glacés are identified by their:",
    options: [
      { answer: "a) Cream-filled", isCorrect: false },
      { answer: "b) Icing or glaze-coated", isCorrect: true },
      { answer: "c) Fresh berries used", isCorrect: false },
      { answer: "d) Savory flavor profile", isCorrect: false },
    ],
  },
  {
    question: "7. Petit fours à la crème are characterized by their:",
    options: [
      { answer: "a) Cream filling", isCorrect: true },
      { answer: "b) Moist texture", isCorrect: false },
      { answer: "c) Chopped nuts used", isCorrect: false },
      { answer: "d) Low sugar content", isCorrect: false },
    ],
  },
  {
    question:
      "8. What type of dessert often inspires the decoration of petit fours?",
    options: [
      { answer: "a) Pies", isCorrect: false },
      { answer: "b) Cheesecakes", isCorrect: false },
      { answer: "c) Macarons", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "9. Which ingredient is commonly used in petit four doughs?",
    options: [
      { answer: "a) Flour", isCorrect: false },
      { answer: "b) Butter", isCorrect: false },
      { answer: "c) Sugar", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "10. What is one common way of adorning petit fours?",
    options: [
      { answer: "a) Piping", isCorrect: false },
      { answer: "b) Fondant", isCorrect: false },
      { answer: "c) Glaze", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "11. Whence does the term 'petit four' derive?",
    options: [
      { answer: "a) Italian", isCorrect: false },
      { answer: "b) Spanish", isCorrect: false },
      { answer: "c) French", isCorrect: true },
      { answer: "d) English", isCorrect: false },
    ],
  },
  {
    question: "12. Whence does the term 'petit four' literally translate to?",
    options: [
      { answer: "a) Small oven", isCorrect: false },
      { answer: "b) Little oven", isCorrect: true },
      { answer: "c) Small cake", isCorrect: false },
      { answer: "d) Little cake", isCorrect: false },
    ],
  },
  {
    question: "13. What is a classic flavor profile for petit fours?",
    options: [
      { answer: "a) Chocolate", isCorrect: false },
      { answer: "b) Vanilla", isCorrect: false },
      { answer: "c) Fruit", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "14. Are petit fours usually prepared ahead of time?",
    options: [
      { answer: "a) No, they are best made fresh", isCorrect: false },
      {
        answer: "b) Yes, they can be made several days in advance",
        isCorrect: true,
      },
      { answer: "c) It depends on the recipe", isCorrect: false },
      { answer: "d) Only if frozen", isCorrect: false },
    ],
  },
  {
    question: "15. Petit fours are best stored:",
    options: [
      { answer: "a) At room temperature", isCorrect: false },
      { answer: "b) In the refrigerator", isCorrect: false },
      { answer: "c) In the freezer", isCorrect: false },
      { answer: "d) It depends on the type", isCorrect: true },
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
      quizName: "Petit Four Quiz",
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
