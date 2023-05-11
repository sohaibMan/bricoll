import React, { useState, createContext } from "react";
import Registre from "../../../pages/registre";

export const multiStepContext = createContext();
export default function StepContext() {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);

    // console.log("finalData: ", finalData);

    setUserData("");
  }

  return (
    <div>
      <multiStepContext.Provider
        value={{
          currentStep,
          setStep,
          userData,
          setUserData,
          finalData,
          setFinalData,
          submitData,
        }}
      >
        <Registre />
      </multiStepContext.Provider>
    </div>
  );
}
