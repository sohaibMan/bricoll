import React, {useContext} from "react";
import FirstStep from "../components/auth/registration/firstStep";
import SecondStep from "../components/auth/registration/secondStep";
import ThirdStep from "../components/auth/registration/thirdStep";
import FourthStep from "../components/auth/registration/fourthStep";

import {Step, StepLabel, Stepper} from "@mui/material";

import {multiStepContext} from "../components/auth/registration/stepContext";
import Typography from "@mui/joy/Typography";


const steps = ["Overview", "Skills", "Experiences", "Complete Profile"];

export default function Register() {
    const {currentStep} = useContext(multiStepContext);


    /**
     * todo add  a country selector
     * add a skills array (check the auto complete skills for more details)
     * make the layout unified
     * add validation in the last step
     * make the portfolio link optional
     * make the langues as the skills array
     * redirection after submit
     */
    // todo preserve the data in the context after refresh and between the steps


    function showStep(step: any) {
        switch (step) {
            case 1:
                return <FirstStep/>;

            case 2:
                return <SecondStep/>;

            case 3:
                return <ThirdStep/>;

            case 4:
                return <FourthStep/>;
        }
    }

    return (
        // <StepContextProvider>
        <div style={{textAlign: "center"}}>
            <Typography level="h2" color={"primary"} sx={{marginY: "1rem"}}>
                Registration steps
            </Typography>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Stepper
                    activeStep={currentStep - 1}
                    alternativeLabel
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            {showStep(currentStep)}
        </div>
        // </StepContextProvider>

    );
}
