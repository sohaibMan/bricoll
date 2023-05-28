"use client"
import {createContext, ReactNode, useState} from "react";
import {UserRole} from "../../../types/resolvers";


// type UserData = Record<string, string | string[]>;

interface UserData {
    bio: string;
    country: string;
    city: string;
    phone: string;
    address: string;
    language: string;
    image: string;
    profileTitle: string;
    experienceLevel: string;
    category: string;
    jobTitle: string;
    company: string;
    educationLevel: string;
    portfolio: string;
    skills: string[];
    postalCode: number;
    timeZone: string;
    companyName: string;
    website: string;
    industry: string;
    yearFounded: number;
    ownershipType: string;
    skillsCategories: string;
    specificSkills: string;
    skillsLevel: string;
    birthday: Date;
}

type MultiStepContext = {
    currentStep: number;
    setStep: (step: number) => void;
    userData: UserData;
    userRole: UserRole,
    setUserRole: (arg0: UserRole) => void
};

let userData = {} as UserData

export const multiStepContext = createContext<MultiStepContext>(
    {userData} as MultiStepContext
);

export const StepContextProvider = (props: { children: ReactNode }) => {
    const [currentStep, setStep] = useState(0);


    const [userRole, setUserRole] = useState<UserRole>(null)


    const contextValues: MultiStepContext = {
        currentStep,
        setStep,
        userRole,
        setUserRole,
        userData,
    };

    return (
        <multiStepContext.Provider value={contextValues}>
            {props.children}
        </multiStepContext.Provider>
    );
};
