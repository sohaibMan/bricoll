// import React, { useState, createContext } from "react";
// import Registre from "../../../pages/registre";

// export const multiStepContext = createContext();
// export default function StepContext() {
//   const [currentStep, setStep] = useState(1);
//   const [userData, setUserData] = useState([]);
//   const [finalData, setFinalData] = useState([]);

//   function submitData() {
//     setFinalData((finalData) => [...finalData, userData]);

//     // console.log("finalData: ", finalData);

//     setUserData("");
//   }

//   return (
//     <multiStepContext.Provider
//       value={{
//         currentStep,
//         setStep,
//         userData,
//         setUserData,
//         finalData,
//         setFinalData,
//         submitData,
//       }}
//     >
//       <Registre />
//     </multiStepContext.Provider>
//   );
// }

import React, { useState, createContext } from "react";

export const multiStepContext = createContext();

export const StepContextProvider = ({ children }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    setUserData({});
  }

  const contextValues = {
    currentStep,
    setStep,
    userData,
    setUserData,
    finalData,
    setFinalData,
    submitData,
  };

  return (
    <multiStepContext.Provider value={contextValues}>
      {children}
    </multiStepContext.Provider>
  );
};

