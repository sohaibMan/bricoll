"use client"
import React, {useContext} from "react";
import FirstStep from "../../components/auth/registration/firstStep";
import SecondStep from "../../components/auth/registration/secondStep";
import ThirdStep from "../../components/auth/registration/thirdStep";
import FourthStep from "../../components/auth/registration/fourthStep";
import {Step, StepLabel, Stepper} from "@mui/material";
import {multiStepContext} from "../../components/auth/registration/stepContext";
import {Typography} from "@mui/joy";
import ProfileTypeStep from "../../components/auth/signup/ProfileTypeStep";
import {UserRole} from "../../types/resolvers";


const freelancerSteps = ["Overview", "Skills", "Experiences", "Complete Profile"];
const clientSteps = ["Personal Information", "Company Information", "Skills", "Complete Profile"];

export default function Page() {
    const {currentStep, userData} = useContext(multiStepContext);
    const userRole = userData.userRole as UserRole;
    const steps = (userRole === UserRole.Freelancer) ? freelancerSteps : clientSteps


    function CurrentStepComponent({step}: { step: number }) {
        switch (step) {
            case 0:
                return <ProfileTypeStep/>;
            case 1:
                return <FirstStep/>;

            case 2:
                return <SecondStep/>;

            case 3:
                return <ThirdStep/>;

            case 4:
                return <FourthStep/>;
            default:
                throw new Error("Unhandled case")
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            {currentStep !== 0 &&
                <>
                    <Typography level="h2" color={"primary"} sx={{marginY: "1rem"}}>
                        Registration steps
                    </Typography>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Stepper
                            activeStep={currentStep - 1}
                            alternativeLabel
                        >
                            {
                                steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                        </Stepper>
                    </div>
                </>
            }
            <CurrentStepComponent step={currentStep}/>
        </div>


    )

}
