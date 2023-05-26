"use client"
import {createContext, ReactNode, useState} from "react";


type UserData = Record<string, string>;

type MultiStepContext = {
    currentStep: number;
    setStep: (step: number) => void;
    userData: UserData;
    setUserData: (data: UserData) => void;
    resetForm: () => void;
};

export const multiStepContext = createContext<MultiStepContext>(
    {} as MultiStepContext
);

export const StepContextProvider = (props: { children: ReactNode }) => {
    const [currentStep, setStep] = useState(0);
    const [userData, setUserData] = useState<UserData>({} as UserData);


    function resetForm() {
        setUserData({});
    }

    const contextValues: MultiStepContext = {
        currentStep,
        setStep,
        userData,
        setUserData,
        resetForm,
    };

    return (
        <multiStepContext.Provider value={contextValues}>
            {props.children}
        </multiStepContext.Provider>
    );
};
