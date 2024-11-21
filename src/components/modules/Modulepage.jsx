import React from "react";
import { useParams } from "react-router-dom";
import Crossword from "./[2]/crossword";

function ModulePage() {
  const { moduleId } = useParams(); // Get the moduleId from the URL

  let ModuleComponent;
  // Dynamically select the component based on the moduleId
  if (moduleId === "2") {
    ModuleComponent = Crossword; // Render crossword component for module 2
  } else {
    // Handle other modules here (like 1, 3, etc.)
    ModuleComponent = () => <div>Module {moduleId} content goes here</div>;
  }

  return (
    <div>
      <h1>Module {moduleId}</h1>
      <ModuleComponent /> {/* Render the selected component */}
    </div>
  );
}

export default ModulePage;
