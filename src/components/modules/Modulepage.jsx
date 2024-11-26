import React from "react";
import { useParams } from "react-router-dom";

// Importing all modules statically for simplicity
import Module1 from "./[1]";
import Module2 from "./[2]";
import Module3 from "./[3]";
import Module4 from "./[4]";
import Module5 from "./[5]";
import Module6 from "./[6]";

export default function ModulePage({ quizStarted, setQuizStarted }) {
  const { moduleId } = useParams(); // Get the moduleId from the URL

  // Define mapping of moduleId to components
  const modules = {
    1: Module1,
    // 2: Module2,
    // 3: Module3,
    // 4: Module4,
    // 5: Module5,
    // 6: Module6,
  };

  // Dynamically select the module component based on the moduleId
  const ModuleComponent =
    modules[moduleId] || (() => <div>Module {moduleId} not found</div>);

  return (
    <div>
      <h1>Module {moduleId}</h1>
      {/* Render the selected component dynamically */}
      <ModuleComponent
        quizStarted={quizStarted}
        setQuizStarted={setQuizStarted}
      />
    </div>
  );
}
