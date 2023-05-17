import { createContext, ReactNode, useState } from "react";


type UserData = Record<string, string>;

type MultiStepContext = {
  currentStep: number;
  setStep: (step: number) => void;
  userData: UserData;
  setUserData: (data: UserData) => void;
  finalData: UserData[];
  setFinalData: (data: UserData[]) => void;
  submitData: () => void;
};

export const multiStepContext = createContext<MultiStepContext>(
  {} as MultiStepContext
);

export const StepContextProvider = (props: { children: ReactNode }) => {
  const [currentStep, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({});
  const [finalData, setFinalData] = useState<UserData[]>([]);

  function submitData() {
    setFinalData((finalData) => [...finalData, userData]);
    setUserData({});
  }

  const contextValues: MultiStepContext = {
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
