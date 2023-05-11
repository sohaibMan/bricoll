import React, { Component, useContext, useEffect } from "react";
// import "./styles.css";
import FirstStep from "../components/auth/registration/firstStep";
import SecondStep from "../components/auth/registration/secondStep";
import ThirdtStep from "../components/auth/registration/thirdStep";
// import CheckoutPage from "../components/CheckoutPage";

import { Stepper, StepLabel, Step } from "@mui/material";
import { multiStepContext } from "../components/auth/registration/stepContext";
import FourthStep from "../components/auth/registration/fourthStep";
// import React, { useState, createContext } from "react";

import StepContext from "../components/auth/registration/stepContext";

const steps = ["Overview", "Skills", "Experiences", "Complete Profile"];

export default function Registre() {
  const { currentStep, finalData }: any = useContext(multiStepContext);

  console.log(finalData);

  // useEffect(() => {

  // }, [])

  function showStep(step: any) {
    switch (step) {
      case 1:
        return <FirstStep />;

      case 2:
        return <SecondStep />;

      case 3:
        return <ThirdtStep />;

      case 4:
        return <FourthStep />;
    }
  }
  return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            fontSize: "calc(10px + 2vmin)",
          }}
        >
          <h3 style={{ color: "green", textDecoration: "none" }}>
            Registration steps
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stepper
              style={{ width: "40%" }}
              activeStep={currentStep - 1}
              alternativeLabel
              // orientation="horizontal"
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
              {/* <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step>
            <Step>
              <StepLabel></StepLabel>
            </Step> */}
            </Stepper>
          </div>
          {showStep(currentStep)}
          {/* <FirstStep />
      <SecondStep />
      <ThirdtStep /> */}
        </div>
      </div>
    // </StepContext>
  );
}
