import React, {useContext} from "react";
import FirstStep from "../../components/auth/registration/firstStep";
import SecondStep from "../../components/auth/registration/secondStep";
import ThirdStep from "../../components/auth/registration/thirdStep";
import FourthStep from "../../components/auth/registration/fourthStep";
import {Step, StepLabel, Stepper} from "@mui/material";
import {multiStepContext} from "../../components/auth/registration/stepContext";
import {Typography} from "@mui/joy";
import { useSession } from "next-auth/react";


const freelancerSteps = ["Overview", "Skills", "Experiences", "Complete Profile"];
const clientSteps = ["Personal Information", "Company Information", "Skills", "Experiences", "Additional Information"];

export default function Index() {
    const {currentStep} = useContext(multiStepContext);

    const {data: session} = useSession() 

    const steps = (session?.user.userRole === "Freelancer") ? freelancerSteps : clientSteps

    // console.log("session from registre ", session?.user.userRole);
    

    /**
     * todo add  a country selector
     * add a skills array (check the auto complete skills for more details)
     * make the layout unified
     * make the portfolio link optional
     * make the languages as the skills array
     * redirection after submit
     */
    //save steps to localstorage after each step so if the user leaves the pages and back he will find the old data


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
                    {
                    steps.map((label) => (
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
