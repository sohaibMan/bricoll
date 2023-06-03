"use client"
import React, {useContext, useEffect} from "react";
import SecondStep from "../../components/auth/registration/secondStep";
import ThirdStep from "../../components/auth/registration/thirdStep";
import FourthStep from "../../components/auth/registration/fourthStep";
import {multiStepContext} from "../../components/auth/registration/stepContext";
import ProfileTypeStep from "../../components/auth/signup/ProfileTypeStep";
import {UserRole} from "../../types/resolvers";
import FirstStep from "../../components/auth/registration/firstStep";
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import HandymanIcon from '@mui/icons-material/Handyman';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {Step, StepIconProps, StepLabel, Stepper} from "@mui/material";
import {styled} from '@mui/material/styles';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import "../../styles/globals.css";


const freelancerSteps = [{
    label: "Overview", icon: ContactEmergencyIcon
},
    {label: "Skills", icon: HandymanIcon},
    {label: "Experiences", icon: WorkHistoryIcon},
    {
        label: "Complete Profile",
        icon: AccountBoxIcon
    }]

const clientSteps = [{
    label: "Personal Information", icon: ContactEmergencyIcon
},
    {label: "Company Information", icon: HandymanIcon},
    {label: "Skills", icon: WorkHistoryIcon},
    {
        label: "Complete Profile",
        icon: AccountBoxIcon
    }]


export default function Page() {
    let {currentStep, userRole, userData, setStep} = useContext(multiStepContext);
    const steps = (userRole === UserRole.Freelancer) ? freelancerSteps : clientSteps


    // useEffect(() => {
    //     // sync userData with localStorage
    //     const userDataFromLocalStorage = localStorage.getItem("userData")
    //     if (userDataFromLocalStorage) {
    //         userData = JSON.parse(userDataFromLocalStorage)
    //     }
    //     window.onbeforeunload = confirmExit;
    //     window.onunload = confirmExit;
    //
    //     function confirmExit() {
    //         localStorage.setItem("userData", JSON.stringify(userData))
    //         // todo sync it to the state
    //         return "You have attempted to leave this page. Are you sure?";
    //     }
    // }, [])

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

    const ColorlibConnector = styled(StepConnector)(({theme}) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));


    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean };
    }>(({theme, ownerState}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));

    function ColorlibStepIcon(props: StepIconProps) {
        const {active, completed, className} = props;

        const icons: { [index: string]: React.ReactElement } = {
            1: <ContactEmergencyIcon/>,
            2: <HandymanIcon/>,
            3: <WorkHistoryIcon/>,
            4: <AccountBoxIcon/>,
        };

        return (
            <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }


    return (
        <div className={"flex flex-col items-center"}>

            {currentStep !== 0 &&
                <>
                    <div className={"my-4"} style={{display: "flex", justifyContent: "center"}}>


                        <Stepper alternativeLabel activeStep={currentStep - 1} connector={<ColorlibConnector/>}>
                            {steps.map(({label}, i) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
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
