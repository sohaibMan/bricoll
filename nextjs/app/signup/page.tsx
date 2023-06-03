"use client"
import {useEffect, useState} from 'react';
import SignupForm from "../../components/auth/signup/SignupForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {UserRole} from "../../types/resolvers";

const SignupPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {data: session} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session && !session.user.isCompleted) router.push('/register')
        // if the client is logged in and has completed his profile, redirect him to the dashboard page
        if (session && session.user.userRole === UserRole.Client && session.user.isCompleted) router.push('/dashboard')
        // if the freelancer is logged in and has completed his profile, redirect him to the find-work page
        if (session && session.user.userRole === UserRole.Freelancer && session.user.isCompleted) router.push('/find-work')
    }, [session])

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <nav className="container mx-auto p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-primary font-bold text-2xl px-6">BRICOL</p>
                    </div>
                    <div className="md:hidden">
                        <button
                            className="text-gray-500 hover:text-gray-600 focus:outline-none"
                            onClick={toggleNavbar}
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col items-center mt-8">

                <SignupForm />

            </div>
        </>
    );
};

export default SignupPage;


