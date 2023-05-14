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

import React, {createContext, ReactNode, useState} from "react";
// todo fix the types error
export const multiStepContext = createContext();

export const StepContextProvider = (props: { children: ReactNode }) => {
    const [currentStep, setStep] = useState(1);
    const [userData, setUserData] = useState({});
    const [finalData, setFinalData] = useState([]);

    // todo fix type error
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
            {props.children}
        </multiStepContext.Provider>
    );
};

