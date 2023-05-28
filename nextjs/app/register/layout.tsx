"use client";
import React from "react";
import {StepContextProvider} from "../../components/auth/registration/stepContext";
import {SessionProvider} from "next-auth/react";

export default function RegisterLayout({
                                           children, // will be a page or nested layout
                                       }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <SessionProvider>
                <StepContextProvider>
                    {children}
                </StepContextProvider>
            </SessionProvider>
        </section>
    );
}