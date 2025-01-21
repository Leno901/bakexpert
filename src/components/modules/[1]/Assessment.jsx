import React, { useState } from "react";
import "./styles.css";
import { collection, addDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../../firebase";

const questions = [
  {
    question:
      "1. Which ingredient is NOT usually used in a traditional chiffon cake?",
    options: [
      { answer: "a) Vegetable oil", isCorrect: false },
      { answer: "b) Cake flour", isCorrect: false },
      { answer: "c) Butter", isCorrect: true },
      { answer: "d) Egg whites", isCorrect: false },
    ],
  },
  {
    question:
      "2. Which of the following cakes has a moist crumb and intense chocolate flavor?",
    options: [
      { answer: "a) Angel food cake", isCorrect: false },
      { answer: "b) Pound cake", isCorrect: false },
      { answer: "c) Devil's food cake", isCorrect: true },
      { answer: "d) Sponge cake", isCorrect: false },
    ],
  },
  {
    question: "3. What is defining about a 'drip cake'?",
    options: [
      { answer: "a) Multiple layers", isCorrect: false },
      {
        answer: "b) A ganache or frosting drip down the sides",
        isCorrect: true,
      },
      { answer: "c) A sculpted design", isCorrect: false },
      { answer: "d) A fruit filling", isCorrect: false },
    ],
  },
  {
    question:
      "4. Which type of cake is typically used for celebrations and usually has multiple tiers?",
    options: [
      { answer: "a) Cupcake", isCorrect: false },
      { answer: "b) Layer cake", isCorrect: false },
      { answer: "c) Sheet cake", isCorrect: false },
      { answer: "d) Wedding cake", isCorrect: true },
    ],
  },
  {
    question:
      "5. What is commonly applied to make thin designs and ornamentation on specialty cakes?",
    options: [
      { answer: "a) Food coloring", isCorrect: false },
      { answer: "b) Fondant", isCorrect: false },
      { answer: "c) Piping bag", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "6. What is the purpose of a cake leveler?",
    options: [
      { answer: "a) For frosting the cake uniformly", isCorrect: false },
      {
        answer:
          "b) For achieving a flat surface so that layers could be placed evenly",
        isCorrect: true,
      },
      { answer: "c) To give flavor to the cake", isCorrect: false },
      { answer: "d) To bake the cake uniformly", isCorrect: false },
    ],
  },
  {
    question:
      "7. Which cake is characterized with a light and airy texture, usually achieved by whipping egg whites?",
    options: [
      { answer: "a) Pound cake", isCorrect: false },
      { answer: "b) Red velvet cake", isCorrect: false },
      { answer: "c) Angel food cake", isCorrect: true },
      { answer: "d) Carrot cake", isCorrect: false },
    ],
  },
  {
    question: "8. What is a common filling used in specialty cakes?",
    options: [
      { answer: "a) Buttercream", isCorrect: false },
      { answer: "b) Fruit preserves", isCorrect: false },
      { answer: "c) Ganache", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "9. What is the purpose of using a crumb coat?",
    options: [
      { answer: "a) To add extra flavor", isCorrect: false },
      {
        answer: "b) To seal in crumbs before applying the final frosting",
        isCorrect: true,
      },
      { answer: "c) To decorate the cake", isCorrect: false },
      { answer: "d) To make the cake taller", isCorrect: false },
    ],
  },
  {
    question:
      "10. Which tool is used to create smooth, even layers of frosting?",
    options: [
      { answer: "a) Offset spatula", isCorrect: true },
      { answer: "b) Rolling pin", isCorrect: false },
      { answer: "c) Whisk", isCorrect: false },
      { answer: "d) Pastry brush", isCorrect: false },
    ],
  },
  {
    question: "11. Which of the following cakes is typically red and tart?",
    options: [
      { answer: "a) Chocolate cake", isCorrect: false },
      { answer: "b) Red velvet cake", isCorrect: true },
      { answer: "c) Vanilla cake", isCorrect: false },
      { answer: "d) Spice cake", isCorrect: false },
    ],
  },
  {
    question:
      "12. Which of the following cakes is characterized by a dense texture and often inclusion of nuts and spices?",
    options: [
      { answer: "a) Sponge cake", isCorrect: false },
      { answer: "b) Pound cake", isCorrect: true },
      { answer: "c) Chiffon cake", isCorrect: false },
      { answer: "d) Genoise cake", isCorrect: false },
    ],
  },
  {
    question: "13. What is a common way to add moisture to a cake?",
    options: [
      { answer: "a) Using less flour", isCorrect: false },
      { answer: "b) Adding fruit puree", isCorrect: true },
      { answer: "c) Using less sugar", isCorrect: false },
      { answer: "d) Baking it at a lower temperature", isCorrect: false },
    ],
  },
  {
    question: "14. What is often used to create a shiny finish on a cake?",
    options: [
      { answer: "a) Powdered sugar", isCorrect: false },
      { answer: "b) Ganache", isCorrect: false },
      { answer: "c) Simple syrup", isCorrect: false },
      { answer: "d) All of the above", isCorrect: true },
    ],
  },
  {
    question: "15. Which of these is NOT a common cake decorating technique?",
    options: [
      { answer: "a) Piping", isCorrect: false },
      { answer: "b) Fondant modeling", isCorrect: false },
      { answer: "c) Airbrushing", isCorrect: false },
      { answer: "d) Carving wood", isCorrect: true },
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
      quizName: "Specialty Cake Quiz",
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
      <h1>Specialty Cake Quiz</h1>
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
